import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | GIF Studio",
  description:
    "GIF Studio processes your files locally in your browser. Learn how we handle data, cookies and privacy across all of our GIF and video tools.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="July 8, 2026"
      crumbLabel="Privacy Policy"
      crumbPath="/privacy"
      intro="Your privacy matters. GIF Studio is designed to process your media directly in your browser, which means your files typically never leave your device. This policy explains what we do and don't collect."
      sections={[
        {
          heading: "File Processing",
          body: [
            "All conversion, compression, resizing and cropping happens locally in your browser using modern web technologies. Your videos and GIFs are not uploaded to our servers as part of normal tool usage.",
            "Because processing is local, we do not store your files, and they are cleared from memory when you close or refresh the tab.",
          ],
        },
        {
          heading: "Information We Collect",
          body: [
            "We do not require an account, email or signup to use any tool. We may collect anonymous, aggregated usage analytics (such as which tools are opened) to improve the product. This data cannot be used to identify you or your files.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use minimal local storage to remember your theme preference (light or dark). We do not use advertising cookies or sell any data.",
          ],
        },
        {
          heading: "Third-Party Services",
          body: [
            "If we use analytics or hosting providers, they may process limited technical information such as your browser type and general region, in line with their own privacy policies.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any privacy questions, reach out through our Contact page. We're happy to help.",
          ],
        },
      ]}
    />
  );
}
