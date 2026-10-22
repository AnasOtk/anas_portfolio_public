import { EXPERIENCES } from "../../lib/constants";
import { useRevealOnce } from "../../lib/hooks";
import SectionHeading from "../ui/SectionHeading";
import ExperienceItem from "./ExperienceItem";
import "./Experience.css";

export default function Experience() {
  const revealProps = useRevealOnce<HTMLElement>();

  return (
    <section
      {...revealProps}
      className="experience"
      aria-labelledby="experience-title"
    >
      <div className="container">
        <SectionHeading
          id="experience-title"
          icon="💼"
          className="experience__heading reveal-item"
        >
          Mon <strong>expérience</strong>
        </SectionHeading>
      </div>
      <ol className="experience__list">
        {EXPERIENCES.map((entry, index) => (
          <ExperienceItem key={entry.id} entry={entry} index={index + 1} />
        ))}
      </ol>
    </section>
  );
}
