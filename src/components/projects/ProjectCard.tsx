import type { Project } from "../../lib/types";
import { revealIndex } from "../../lib/utils";
import Pill from "../ui/Pill";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
  index: number;
  onSelect: (projectId: string) => void;
};

export default function ProjectCard({
  project,
  index,
  onSelect,
}: ProjectCardProps) {
  const { id, title, tag, summary, stack, position } = project;

  return (
    <button
      type="button"
      className="project-card"
      style={{ left: position.x, top: position.y, ...revealIndex(index) }}
      onClick={() => onSelect(id)}
    >
      <Pill>{tag}</Pill>
      <span className="project-card__title">{title}</span>
      <span className="project-card__summary">{summary}</span>
      <span className="project-card__stack">{stack.join(" · ")}</span>
    </button>
  );
}
