import type { FaqEntry } from "../../lib/types";
import { revealIndex } from "../../lib/utils";
import "./FaqItem.css";

type FaqItemProps = {
  item: FaqEntry;
  index: number;
  isOpen: boolean;
  onToggle: (id: string) => void;
};

export default function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: FaqItemProps) {
  const { id, question, answer, links } = item;
  const panelId = `faq-panel-${id}`;

  return (
    <li className="faq-item reveal-item" style={revealIndex(index)}>
      <h3>
        <button
          type="button"
          className="faq-item__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(id)}
        >
          {question}
          <span className="faq-item__icon" aria-hidden="true">
            <svg viewBox="0 0 12 12" width="12" height="12">
              <path d="M6 1.5v9M1.5 6h9" />
            </svg>
          </span>
        </button>
      </h3>
      <div id={panelId} className="faq-item__panel" hidden={!isOpen}>
        <p>{answer}</p>
        {links && (
          <ul className="faq-item__links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
