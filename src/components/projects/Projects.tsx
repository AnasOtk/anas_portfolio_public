import { useState } from "react";
import { PROJECTS, PROJECTS_SUBTITLE } from "../../lib/constants";
import { useRevealOnce } from "../../lib/hooks";
import SectionHeading from "../ui/SectionHeading";
import ProjectDialog from "./ProjectDialog";
import ProjectsCanvas from "./ProjectsCanvas";
import "./Projects.css";

export default function Projects() {
  const revealProps = useRevealOnce<HTMLElement>();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null,
  );
  const selectedProject = PROJECTS.find(
    (project) => project.id === selectedProjectId,
  );

  const handleSelectProject = (projectId: string) =>
    setSelectedProjectId(projectId);
  const handleCloseProject = () => setSelectedProjectId(null);

  return (
    <section
      {...revealProps}
      className="projects container"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        id="projects-title"
        icon="💡"
        subtitle={PROJECTS_SUBTITLE}
        className="reveal-item"
      >
        Mes <strong>projets</strong>
      </SectionHeading>
      <ProjectsCanvas projects={PROJECTS} onSelectProject={handleSelectProject} />
      <ProjectDialog project={selectedProject} onClose={handleCloseProject} />
    </section>
  );
}
