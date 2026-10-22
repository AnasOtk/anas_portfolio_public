import { useEffect, useRef } from "react";
import type { Project } from "../../lib/types";
import Pill from "../ui/Pill";
import "./ProjectDialog.css";

type ProjectDialogProps = {
  project: Project | undefined;
  onClose: () => void;
};

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = project !== undefined;

  // Synchronise l'état React avec l'API native <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={handleBackdropClick}
    >
      {project && (
        <article className="project-dialog__content">
          <header className="project-dialog__header">
            <div className="project-dialog__heading">
              <Pill>{project.tag}</Pill>
              <h3 id="project-dialog-title">{project.title}</h3>
            </div>
            <button
              type="button"
              className="project-dialog__close"
              aria-label="Fermer"
              onClick={onClose}
            >
              ×
            </button>
          </header>
          <p>{project.summary}</p>
          <ul className="project-dialog__details">
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <ul className="project-dialog__stack">
            {project.stack.map((item) => (
              <li key={item}>
                <Pill>{item}</Pill>
              </li>
            ))}
          </ul>
        </article>
      )}
    </dialog>
  );
}
