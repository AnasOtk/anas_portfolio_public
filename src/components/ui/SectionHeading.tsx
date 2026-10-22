import { cn } from "../../lib/utils";
import "./SectionHeading.css";

type SectionHeadingProps = {
  id: string;
  icon: string;
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({
  id,
  icon,
  children,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("section-heading", className)}>
      <h2 id={id} className="section-heading__title">
        <span aria-hidden="true">{icon}</span>
        <span>{children}</span>
      </h2>
      {subtitle && <p className="section-heading__subtitle">{subtitle}</p>}
    </header>
  );
}
