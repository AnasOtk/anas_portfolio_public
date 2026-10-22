import { useRef } from "react";
import {
  CAT_SCALE,
  CAT_VIEWBOX_HEIGHT,
  CAT_VIEWBOX_WIDTH,
} from "../../lib/constants";
import { useCatBehavior } from "../../lib/hooks";
import type { GardenCat } from "../../lib/types";
import "./CatCoat.css";
import "./Cat.css";

type CatProps = {
  cat: GardenCat;
};

export default function Cat({ cat }: CatProps) {
  const catRef = useRef<HTMLDivElement>(null);
  useCatBehavior(catRef, cat);
  const hasSpots = cat.coat === "white-spotted";

  return (
    <div ref={catRef} className="cat" aria-hidden="true">
      <svg
        className={`cat__svg cat-coat cat-coat--${cat.coat}`}
        viewBox={`0 0 ${CAT_VIEWBOX_WIDTH} ${CAT_VIEWBOX_HEIGHT}`}
        width={CAT_VIEWBOX_WIDTH * CAT_SCALE}
        height={CAT_VIEWBOX_HEIGHT * CAT_SCALE}
      >
        <g className="cat__swing">
          <g className="cat__pose">
            <path className="cat__tail" d="M16 20 Q2 18 6 4" />
            <rect className="cat__leg cat__leg--a cat__leg--back" x="19" y="28" width="5" height="19" rx="2.5" />
            <rect className="cat__leg cat__leg--b cat__leg--front" x="43" y="28" width="5" height="19" rx="2.5" />
            <g className="cat__body">
              <rect className="cat__torso" x="14" y="14" width="42" height="18" rx="9" />
              {hasSpots && (
                <>
                  <ellipse className="cat__spot" cx="26" cy="22" rx="6" ry="4.5" />
                  <ellipse className="cat__spot" cx="42" cy="20" rx="5" ry="3.5" />
                </>
              )}
              <g className="cat__head">
                <polygon points="52,10 54,0 60,8" />
                <polygon points="61,8 66,0 68,11" />
                <circle cx="59" cy="17" r="10" />
                {hasSpots && (
                  <ellipse className="cat__spot" cx="55" cy="12.5" rx="4" ry="3" />
                )}
                <circle className="cat__eye" cx="62.5" cy="15.5" r="1.6" />
              </g>
            </g>
            <rect className="cat__leg cat__leg--b cat__leg--back" x="27" y="28" width="5" height="19" rx="2.5" />
            <rect className="cat__leg cat__leg--a cat__leg--front" x="51" y="28" width="5" height="19" rx="2.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
