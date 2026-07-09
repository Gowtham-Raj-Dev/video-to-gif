import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | GIF Studio",
  description:
    "Read the terms of service for using GIF Studio's free online GIF and video editing tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="July 8, 2026"
      crumbLabel="Terms"
      crumbPath="/terms"
      intro="By using GIF Studio, you agree to these terms. They're intentionally simple — our tools are free to use for personal and commercial projects."
      sections={[
        {
          heading: "Use of the Service",
          body: [
            "GIF Studio provides free, browser-based tools to convert, compress, resize and crop GIFs and videos. You may use the output for personal and commercial purposes.",
            "You are responsible for ensuring you have the rights to any media you process with our tools.",
          ],
        },
        {
          heading: "Acceptable Use",
          body: [
            "You agree not to use GIF Studio to process illegal content or to attempt to disrupt, reverse engineer for malicious purposes, or overload the service.",
          ],
        },
        {
          heading: "No Warranty",
          body: [
            "The tools are provided \"as is\" without warranties of any kind. While we work hard to deliver high-quality results, we do not guarantee that output will meet every specific requirement.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "GIF Studio and its creators are not liable for any loss or damage arising from the use of the service, to the maximum extent permitted by law.",
          ],
        },
        {
          heading: "Changes",
          body: [
            "We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the updated terms.",
          ],
        },
      ]}
    />
  );
}
