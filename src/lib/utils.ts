// Pas de Tailwind dans ce projet : un simple assembleur de classes suffit
// (clsx + tailwind-merge n'apporteraient rien ici).
// Rang d'un élément dans une liste animée : le CSS en déduit son délai (stagger)
export function revealIndex(index: number) {
  return { "--reveal-index": index } as React.CSSProperties;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}
