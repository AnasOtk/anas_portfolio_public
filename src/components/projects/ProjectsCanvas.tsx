import { CANVAS_INITIAL_OFFSET } from "../../lib/constants";
import { useDragPan } from "../../lib/hooks";
import type { Project } from "../../lib/types";
import { cn } from "../../lib/utils";
import ProjectCard from "./ProjectCard";
import "./ProjectsCanvas.css";

type ProjectsCanvasProps = {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
};

export default function ProjectsCanvas({
  projects,
  onSelectProject,
}: ProjectsCanvasProps) {
  const { offset, isDragging, handlers } = useDragPan(CANVAS_INITIAL_OFFSET);

  return (
    <div
      className={cn("canvas reveal-item", isDragging && "canvas--dragging")}
      style={{
        backgroundPosition: `${offset.x}px ${offset.y}px`,
      }}
      {...handlers}
    >
      <div
        className="canvas__world"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelect={onSelectProject}
          />
        ))}
      </div>
      <p className="canvas__hint">Glisser pour explorer · cliquer pour ouvrir</p>
    </div>
  );
}
