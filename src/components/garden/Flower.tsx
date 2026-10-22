import {
  FLOWER_HEAD_HEIGHT,
  FLOWER_VIEWBOX_WIDTH,
} from "../../lib/constants";
import type { GardenFlower } from "../../lib/types";
import { revealIndex } from "../../lib/utils";
import "./Flower.css";

type FlowerProps = {
  flower: GardenFlower;
  index: number;
};

const CENTER_X = FLOWER_VIEWBOX_WIDTH / 2;
const HEAD_CENTER_Y = FLOWER_HEAD_HEIGHT / 2;
const DAISY_PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const POMPOM_DOTS = [
  [-6, -6],
  [5, -8],
  [-9, 3],
  [3, 2],
  [9, -2],
  [-2, 10],
];

function FlowerHead({ kind }: { kind: GardenFlower["kind"] }) {
  switch (kind) {
    case "tulip":
      return (
        <path
          d={`M${CENTER_X - 13} 28 L${CENTER_X - 13} 6 L${CENTER_X - 6} 16 L${CENTER_X} 2 L${CENTER_X + 6} 16 L${CENTER_X + 13} 6 L${CENTER_X + 13} 28 Q${CENTER_X + 13} 42 ${CENTER_X} 42 Q${CENTER_X - 13} 42 ${CENTER_X - 13} 28Z`}
        />
      );
    case "pompom":
      return (
        <>
          <circle cx={CENTER_X} cy={HEAD_CENTER_Y} r="17" />
          {POMPOM_DOTS.map(([dx, dy]) => (
            <circle
              key={`${dx}${dy}`}
              className="flower__dot"
              cx={CENTER_X + dx}
              cy={HEAD_CENTER_Y + dy}
              r="1.8"
            />
          ))}
        </>
      );
    case "clover":
      return (
        <>
          <circle cx={CENTER_X - 8} cy={HEAD_CENTER_Y} r="10" />
          <circle cx={CENTER_X + 8} cy={HEAD_CENTER_Y} r="10" />
          <circle cx={CENTER_X} cy={HEAD_CENTER_Y - 8} r="10" />
          <circle cx={CENTER_X} cy={HEAD_CENTER_Y + 8} r="10" />
          <circle className="flower__core" cx={CENTER_X} cy={HEAD_CENTER_Y} r="5" />
        </>
      );
    case "daisy":
      return (
        <>
          {DAISY_PETAL_ANGLES.map((angle) => (
            <ellipse
              key={angle}
              cx={CENTER_X}
              cy={HEAD_CENTER_Y - 10}
              rx="5"
              ry="10"
              transform={`rotate(${angle} ${CENTER_X} ${HEAD_CENTER_Y})`}
            />
          ))}
          <circle className="flower__core" cx={CENTER_X} cy={HEAD_CENTER_Y} r="5" />
        </>
      );
  }
}

export default function Flower({ flower, index }: FlowerProps) {
  const { kind, color, height } = flower;
  const leafY = height - 36;

  return (
    <svg
      className={`flower flower--${color}`}
      style={revealIndex(index)}
      viewBox={`0 0 ${FLOWER_VIEWBOX_WIDTH} ${height}`}
      height={height}
      aria-hidden="true"
    >
      <path
        className="flower__stem"
        d={`M${CENTER_X} ${FLOWER_HEAD_HEIGHT - 4} L${CENTER_X} ${height}`}
      />
      <ellipse
        className="flower__leaf"
        cx={CENTER_X - 11}
        cy={leafY}
        rx="11"
        ry="4"
        transform={`rotate(-28 ${CENTER_X - 11} ${leafY})`}
      />
      <ellipse
        className="flower__leaf"
        cx={CENTER_X + 11}
        cy={leafY - 14}
        rx="11"
        ry="4"
        transform={`rotate(24 ${CENTER_X + 11} ${leafY - 14})`}
      />
      <g className="flower__head">
        <FlowerHead kind={kind} />
      </g>
    </svg>
  );
}
