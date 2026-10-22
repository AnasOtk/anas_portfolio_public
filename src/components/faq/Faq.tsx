import { useState } from "react";
import { FAQ_INITIALLY_OPEN_IDS, FAQ_ITEMS } from "../../lib/constants";
import { useRevealOnce } from "../../lib/hooks";
import SectionHeading from "../ui/SectionHeading";
import FaqItem from "./FaqItem";
import "./Faq.css";

export default function Faq() {
  const revealProps = useRevealOnce<HTMLElement>();
  const [openIds, setOpenIds] = useState<string[]>(FAQ_INITIALLY_OPEN_IDS);

  const handleToggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id],
    );
  };

  return (
    <section
      {...revealProps}
      className="faq container"
      aria-labelledby="faq-title"
    >
      <SectionHeading id="faq-title" icon="❓" className="reveal-item">
        À savoir <strong>avant de me contacter</strong>
      </SectionHeading>
      <ul className="faq__list">
        {FAQ_ITEMS.map((item, index) => (
          <FaqItem
            key={item.id}
            item={item}
            index={index + 1}
            isOpen={openIds.includes(item.id)}
            onToggle={handleToggleItem}
          />
        ))}
      </ul>
    </section>
  );
}
