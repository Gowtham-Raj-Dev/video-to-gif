import { Hero } from "@/components/home/Hero";
import { TrustedMarquee } from "@/components/home/TrustedMarquee";
import { ToolsSection } from "@/components/home/ToolsSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { FeatureShowcase } from "@/components/home/FeatureShowcase";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Formats } from "@/components/home/Formats";
import { Stats } from "@/components/home/Stats";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/CtaBanner";
import { JsonLd } from "@/components/JsonLd";
import { softwareApplicationSchema, faqSchema } from "@/lib/seo";
import { HOME_FAQS } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema(), faqSchema(HOME_FAQS)]} />
      <Hero />
      <TrustedMarquee />
      <ToolsSection />
      <WhyChoose />
      <FeatureShowcase />
      <HowItWorks />
      <Formats />
      <Stats />
      <Testimonials />
      <FaqSection />
      <CtaBanner />
    </>
  );
}
