import { cn } from "../../lib/utils";
import "./Pill.css";

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Pill({ children, className }: PillProps) {
  return <span className={cn("pill", className)}>{children}</span>;
}
