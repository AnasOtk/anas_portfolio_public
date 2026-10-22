export type Point = { x: number; y: number };

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  tag: string;
  period: string;
  highlights: string[];
};

export type Project = {
  id: string;
  title: string;
  tag: string;
  summary: string;
  details: string[];
  stack: string[];
  position: Point;
};

export type FaqLink ={ label: string; href: string };

export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  links?: FaqLink[];
};

export type FlowerKind = "tulip" | "pompom" | "clover" | "daisy";

export type FlowerColor = "yellow" | "green" | "white" | "blue" | "pink";

export type CatCoat = "orange" | "gray" | "white-spotted" | "black";

export type GardenCat = {
  id: number;
  coat: CatCoat;
  direction: "left" | "right";
  speedPxPerSecond: number;
  startPositionPercent: number;
};

export type GardenSleepingCat = {
  coat: CatCoat;
  positionPercent: number;
};

export type CatState = "walking" | "pouncing" | "carried" | "falling" | "landing";

export type GardenFlower = {
  id: number;
  kind: FlowerKind;
  color: FlowerColor;
  height: number;
};
