import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/Faq";
import { HOME_FAQS } from "@/lib/content";

export function FaqSection() {
  return (
    <section id="faq" className="container-px scroll-mt-24 py-[50px]">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions, answered"
        description="Everything you need to know about using GIF Studio. Can't find an answer? Reach out any time."
      />
      <FaqAccordion items={HOME_FAQS} />
    </section>
  );
}
