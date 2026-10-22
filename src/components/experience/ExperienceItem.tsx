import type { ExperienceEntry } from "../../lib/types";
import { revealIndex } from "../../lib/utils";
import Pill from "../ui/Pill";
import "./ExperienceItem.css";

type ExperienceItemProps = {
  entry: ExperienceEntry;
  index: number;
};

export default function ExperienceItem({ entry, index }: ExperienceItemProps) {
  const { role, company, tag, period, highlights } = entry;

  return (
    <li className="experience-item reveal-item" style={revealIndex(index)}>
      <details>
        <summary className="experience-item__summary container">
          <span className="experience-item__logo" aria-hidden="true">
            {company.charAt(0)}
          </span>
          <span className="experience-item__main">
            <span className="experience-item__role">{role}</span>
            <span className="experience-item__company">
              {company} <Pill>{tag}</Pill>
            </span>
          </span>
          <span className="experience-item__period">{period}</span>
        </summary>
        <ul className="experience-item__highlights container">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </details>
    </li>
  );
}
