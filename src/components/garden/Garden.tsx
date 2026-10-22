import {
  GARDEN_CATS,
  GARDEN_FLOWERS,
  GARDEN_SLEEPING_CAT,
  GARDEN_TITLE_AFTER,
  GARDEN_TITLE_BEFORE,
  GARDEN_TITLE_HIGHLIGHT,
} from "../../lib/constants";
import { useRevealOnce } from "../../lib/hooks";
import Cat from "./Cat";
import Flower from "./Flower";
import SleepingCat from "./SleepingCat";
import "./Garden.css";

export default function Garden() {
  const revealProps = useRevealOnce<HTMLElement>();

  return (
    <footer {...revealProps} className="garden">
      <p className="garden__title reveal-item">
        {GARDEN_TITLE_BEFORE}{" "}
        <span className="garden__highlight">{GARDEN_TITLE_HIGHLIGHT}</span>
        {GARDEN_TITLE_AFTER}
      </p>
      <div className="garden__scene">
        <div className="garden__flowers">
          {GARDEN_FLOWERS.map((flower, index) => (
            <Flower key={flower.id} flower={flower} index={index} />
          ))}
        </div>
        <SleepingCat cat={GARDEN_SLEEPING_CAT} />
        {GARDEN_CATS.map((cat) => (
          <Cat key={cat.id} cat={cat} />
        ))}
        <div className="garden__soil" />
      </div>
    </footer>
  );
}
