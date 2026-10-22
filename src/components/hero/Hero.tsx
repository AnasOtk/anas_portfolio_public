import isometricHeader from "../../assets/Isometric_header.png";
import { HERO_BADGE, HERO_FACTS, HERO_LINES } from "../../lib/constants";
import { useRevealOnce } from "../../lib/hooks";
import Pill from "../ui/Pill";
import "./Hero.css";

export default function Hero() {
  const revealProps = useRevealOnce<HTMLElement>();

  return (
    <section
      {...revealProps}
      className="hero container"
      aria-labelledby="hero-title"
    >
      <div className="hero__content">
        <Pill className="hero__badge reveal-item">{HERO_BADGE}</Pill>
        <h1 id="hero-title" className="hero__title reveal-item">
          {HERO_LINES.map(([strong, light]) => (
            <span key={strong} className="hero__line">
              <strong>{strong}</strong> {light}
            </span>
          ))}
        </h1>
        <ul className="hero__facts reveal-item">
          {HERO_FACTS.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </div>
      <img
        className="hero__illustration reveal-item"
        src={isometricHeader}
        alt="Illustration isométrique en voxels : un développeur devant un terminal Kali Linux, un chat endormi à ses pieds"
      />
    </section>
  );
}
