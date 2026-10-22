import {
  CAT_SCALE,
  CAT_VIEWBOX_WIDTH,
  SLEEPING_CAT_VIEWBOX_HEIGHT,
} from "../../lib/constants";
import type { GardenSleepingCat } from "../../lib/types";
import "./CatCoat.css";
import "./SleepingCat.css";

type SleepingCatProps = {
  cat: GardenSleepingCat;
};

export default function SleepingCat({ cat }: SleepingCatProps) {
  return (
    <div
      className="sleeping-cat"
      style={{ left: `${cat.positionPercent}%` }}
      aria-hidden="true"
    >
      <svg
        className={`sleeping-cat__svg cat-coat cat-coat--${cat.coat}`}
        viewBox={`0 0 ${CAT_VIEWBOX_WIDTH} ${SLEEPING_CAT_VIEWBOX_HEIGHT}`}
        width={CAT_VIEWBOX_WIDTH * CAT_SCALE}
        height={SLEEPING_CAT_VIEWBOX_HEIGHT * CAT_SCALE}
      >
        <path className="sleeping-cat__tail" d="M64 34 Q78 32 74 20" />
        <g className="sleeping-cat__body">
          <ellipse cx="40" cy="28" rx="28" ry="11" />
          <polygon points="7,23 9,12 15,19" />
          <polygon points="16,19 21,12 23,24" />
          <circle cx="15" cy="28" r="10" />
          {cat.coat === "white-spotted" && (
            <>
              <ellipse className="sleeping-cat__spot" cx="48" cy="25" rx="7" ry="4.5" />
              <ellipse className="sleeping-cat__spot" cx="60" cy="31" rx="4.5" ry="3.5" />
              <ellipse className="sleeping-cat__spot" cx="18" cy="23" rx="4" ry="3" />
            </>
          )}
          <path className="sleeping-cat__eye" d="M9 28 Q12 31 15 28" />
        </g>
        <text className="sleeping-cat__z sleeping-cat__z--1" x="26" y="12">z</text>
        <text className="sleeping-cat__z sleeping-cat__z--2" x="33" y="8">z</text>
        <text className="sleeping-cat__z sleeping-cat__z--3" x="41" y="4">z</text>
      </svg>
    </div>
  );
}
