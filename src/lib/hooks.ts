import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  CAT_AIR_DRAG_PER_S,
  CAT_CARRY_FOLLOW_RATE,
  CAT_GRAVITY_PX_PER_S2,
  CAT_LANDING_DURATION_MS,
  CAT_MAX_THROW_SPEED_PX_PER_S,
  CAT_NAPE_X_PX,
  CAT_NAPE_Y_PX,
  CAT_POUNCE_DURATION_MS,
  CAT_POUNCE_MAX_DELAY_MS,
  CAT_POUNCE_MAX_HEIGHT_RATIO,
  CAT_POUNCE_MIN_DELAY_MS,
  CAT_POUNCE_MIN_HEIGHT_PX,
  CAT_POUNCE_REFERENCE_HEIGHT_PX,
  CAT_POUNCE_SPEED_PX_PER_S,
  CAT_SCALE,
  CAT_THROW_TURN_MIN_SPEED_PX_PER_S,
  CAT_TURN_MAX_DELAY_MS,
  CAT_TURN_MIN_DELAY_MS,
  CAT_WIDTH_PX,
  DRAG_THRESHOLD_PX,
  REVEAL_ROOT_MARGIN,
  REVEAL_VISIBLE_RATIO,
} from "./constants";
import type { CatState, GardenCat, Point } from "./types";
import { clamp, randomBetween } from "./utils";

const MAX_FRAME_SECONDS = 0.064;

// Détecte la première apparition d'une section à l'écran. À étaler sur l'élément
// racine de la section : <section {...revealProps}>. Il reçoit alors
// data-revealed, qui déclenche les animations .reveal-item de ses descendants.
// La section n'est révélée qu'une fois : remonter plus tard ne rejoue rien.
export function useRevealOnce<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  // Sans IntersectionObserver, on révèle tout de suite plutôt que de rien afficher
  const [isRevealed, setIsRevealed] = useState(
    () => !("IntersectionObserver" in window),
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || isRevealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsRevealed(true);
      },
      { threshold: REVEAL_VISIBLE_RATIO, rootMargin: REVEAL_ROOT_MARGIN },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [isRevealed]);

  return { ref, "data-revealed": isRevealed ? "" : undefined };
}

// Anime un chat : marche, demi-tours et bonds au hasard. On peut aussi le saisir
// par la nuque à la souris, puis le relâcher (chute, atterrissage, reprise de
// la marche). Les positions sont écrites directement dans le DOM à chaque frame :
// passer par un état React re-rendrait le composant 60 fois par seconde.
export function useCatBehavior(
  catRef: React.RefObject<HTMLDivElement | null>,
  cat: GardenCat,
) {
  // useLayoutEffect : place le chat avant le premier affichage, sans flash à gauche
  useLayoutEffect(() => {
    const element = catRef.current;
    const scene = element?.parentElement;
    if (!element || !scene) return;

    const getMaxX = () => Math.max(0, scene.clientWidth - CAT_WIDTH_PX);
    let x = (cat.startPositionPercent / 100) * getMaxX();
    let y = 0;
    let velocityX = 0;
    let velocityY = 0;
    let direction: 1 | -1 = cat.direction === "right" ? 1 : -1;
    let state: CatState = "walking";
    let stateStartedAt = 0;
    let pounceHeight = 0;
    let pounceDuration = CAT_POUNCE_DURATION_MS;
    let grabTarget: Point = { x, y };
    let lastMove = { clientX: 0, time: 0 };
    let pointerVelocityX = 0;

    const render = () => {
      element.style.transform = `translate(${x}px, ${y}px)`;
    };
    const applyPose = () => {
      element.style.setProperty("--cat-flip", String(direction));
      element.dataset.state = state;
    };
    const setState = (next: CatState, now = performance.now()) => {
      state = next;
      stateStartedAt = now;
      applyPose();
    };

    applyPose();
    render();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // --- Saisie à la souris ---
    const updateGrabTarget = (event: PointerEvent) => {
      const sceneRect = scene.getBoundingClientRect();
      const napeOffsetX = CAT_NAPE_X_PX * CAT_SCALE;
      const napeX = direction === 1 ? napeOffsetX : CAT_WIDTH_PX - napeOffsetX;
      grabTarget = {
        x: clamp(event.clientX - sceneRect.left - napeX, 0, getMaxX()),
        y: Math.min(
          event.clientY -
            sceneRect.top -
            element.offsetTop -
            CAT_NAPE_Y_PX * CAT_SCALE,
          0,
        ),
      };
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (state === "carried") return;
      event.preventDefault();
      element.setPointerCapture(event.pointerId);
      pointerVelocityX = 0;
      lastMove = { clientX: event.clientX, time: event.timeStamp };
      setState("carried");
      updateGrabTarget(event);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (state !== "carried") return;
      const elapsedSeconds = (event.timeStamp - lastMove.time) / 1000;
      if (elapsedSeconds > 0) {
        const instantVelocity =
          (event.clientX - lastMove.clientX) / elapsedSeconds;
        pointerVelocityX = pointerVelocityX * 0.6 + instantVelocity * 0.4;
      }
      lastMove = { clientX: event.clientX, time: event.timeStamp };
      updateGrabTarget(event);
    };

    const handlePointerRelease = (event: PointerEvent) => {
      if (state !== "carried") return;
      if (element.hasPointerCapture(event.pointerId)) {
        element.releasePointerCapture(event.pointerId);
      }
      velocityX = clamp(
        pointerVelocityX,
        -CAT_MAX_THROW_SPEED_PX_PER_S,
        CAT_MAX_THROW_SPEED_PX_PER_S,
      );
      velocityY = 0;
      if (Math.abs(velocityX) > CAT_THROW_TURN_MIN_SPEED_PX_PER_S) {
        direction = velocityX > 0 ? 1 : -1;
      }
      setState("falling");
    };

    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerup", handlePointerRelease);
    element.addEventListener("pointercancel", handlePointerRelease);

    // --- Boucle d'animation ---
    let lastTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsedSeconds = Math.min(
        (now - lastTime) / 1000,
        MAX_FRAME_SECONDS,
      );
      lastTime = now;

      if (state === "carried") {
        const follow = 1 - Math.exp(-CAT_CARRY_FOLLOW_RATE * elapsedSeconds);
        x += (grabTarget.x - x) * follow;
        y += (grabTarget.y - y) * follow;
      } else if (state === "falling") {
        velocityY += CAT_GRAVITY_PX_PER_S2 * elapsedSeconds;
        velocityX *= Math.max(0, 1 - CAT_AIR_DRAG_PER_S * elapsedSeconds);
        y += velocityY * elapsedSeconds;
        x = clamp(x + velocityX * elapsedSeconds, 0, getMaxX());
        if (y >= 0) {
          y = 0;
          setState("landing", now);
        }
      } else if (state === "landing") {
        if (now - stateStartedAt >= CAT_LANDING_DURATION_MS) {
          setState("walking", now);
        }
      } else {
        let speed = cat.speedPxPerSecond;
        if (state === "pouncing") {
          const progress = (now - stateStartedAt) / pounceDuration;
          if (progress >= 1) {
            y = 0;
            setState("walking", now);
          } else {
            speed = CAT_POUNCE_SPEED_PX_PER_S;
            // Parabole : le sommet est exactement à pounceHeight
            y = -4 * pounceHeight * progress * (1 - progress);
          }
        }

        x += direction * speed * elapsedSeconds;

        const maxX = getMaxX();
        if (x < 0) {
          x = 0;
          direction = 1;
          applyPose();
        } else if (x > maxX) {
          x = maxX;
          direction = -1;
          applyPose();
        }
      }

      render();
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    // --- Comportements aléatoires (uniquement pendant la marche) ---
    let turnTimerId = 0;
    const scheduleTurn = () => {
      turnTimerId = window.setTimeout(
        () => {
          if (state === "walking") {
            direction = direction === 1 ? -1 : 1;
            applyPose();
          }
          scheduleTurn();
        },
        randomBetween(CAT_TURN_MIN_DELAY_MS, CAT_TURN_MAX_DELAY_MS),
      );
    };

    // La section (le jardin) fixe le plafond : 3/4 de sa hauteur. Le chat reste
    // ainsi dans la section, qui rogne tout ce qui dépasse.
    const startPounce = () => {
      const sectionHeight = scene.parentElement?.clientHeight ?? 0;
      const maxHeight = Math.max(
        CAT_POUNCE_MIN_HEIGHT_PX,
        sectionHeight * CAT_POUNCE_MAX_HEIGHT_RATIO,
      );
      pounceHeight = randomBetween(CAT_POUNCE_MIN_HEIGHT_PX, maxHeight);
      pounceDuration =
        CAT_POUNCE_DURATION_MS *
        Math.sqrt(pounceHeight / CAT_POUNCE_REFERENCE_HEIGHT_PX);
      setState("pouncing");
    };

    let pounceTimerId = 0;
    const schedulePounce = () => {
      pounceTimerId = window.setTimeout(
        () => {
          if (state === "walking") {
            startPounce();
          }
          schedulePounce();
        },
        randomBetween(CAT_POUNCE_MIN_DELAY_MS, CAT_POUNCE_MAX_DELAY_MS),
      );
    };

    scheduleTurn();
    schedulePounce();

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(turnTimerId);
      window.clearTimeout(pounceTimerId);
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerup", handlePointerRelease);
      element.removeEventListener("pointercancel", handlePointerRelease);
    };
  }, [catRef, cat]);
}

type DragSession = {
  start: Point;
  origin: Point;
  isActive: boolean;
};

// Déplacement d'un canvas au pointeur. Le pointeur n'est capturé qu'une fois le
// seuil dépassé : un simple clic atteint donc normalement l'élément cliqué.
export function useDragPan(initialOffset: Point) {
  const [offset, setOffset] = useState<Point>(initialOffset);
  const [isDragging, setIsDragging] = useState(false);
  const sessionRef = useRef<DragSession | null>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    sessionRef.current = {
      start: { x: event.clientX, y: event.clientY },
      origin: offset,
      isActive: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const session = sessionRef.current;
    if (!session) return;

    const deltaX = event.clientX - session.start.x;
    const deltaY = event.clientY - session.start.y;

    if (!session.isActive) {
      if (Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD_PX) return;
      session.isActive = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }

    setOffset({ x: session.origin.x + deltaX, y: session.origin.y + deltaY });
  };

  const handlePointerEnd = () => {
    sessionRef.current = null;
    setIsDragging(false);
  };

  return {
    offset,
    isDragging,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
}
