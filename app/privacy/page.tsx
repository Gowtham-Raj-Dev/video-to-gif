import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "GIF Studio processes your files locally in your browser. Learn how we handle data, cookies and privacy across all of our GIF and video tools.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 10, 2026"
      crumbLabel="Privacy Policy"
      crumbPath="/privacy"
      intro="Your privacy matters. GIF Studio is designed to process your media directly in your browser, which means your files typically never leave your device. This policy explains what we do and don't collect."
      sections={[
        {
          heading: "File Processing",
          body: [
            "All conversion, compression, resizing and cropping happens locally in your browser using WebAssembly. Your videos and GIFs are never uploaded to our servers. The processing engine (ffmpeg.wasm) is downloaded from the unpkg content delivery network when you first use a tool, but your files are not sent anywhere.",
            "Because processing is local, we do not store your files, and they are cleared from memory when you close or refresh the tab.",
          ],
        },
        {
          heading: "Information We Collect",
          body: [
            "We do not require an account, email or signup to use any tool. We use Google Analytics to collect aggregated usage data such as pages viewed, approximate region, device and browser type. This data does not include your files or their contents.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use minimal local storage to remember your theme preference (light or dark). Google Analytics sets cookies to tell visitors apart and measure traffic, and advertising partners may set cookies as described in the Advertising section below. We do not sell your personal data.",
          ],
        },
        {
          heading: "Third-Party Services",
          body: [
            "Google Analytics, our hosting provider (GitHub Pages) and the unpkg content delivery network may process limited technical information such as your IP address, browser type and general region, in line with their own privacy policies.",
          ],
        },
        {
          heading: "Advertising",
          body: [
            "We use or may use Google AdSense to show ads on this site. Google and third-party vendors use cookies to serve ads based on a user's prior visits to this and other websites.",
            "You can opt out of personalised advertising at https://adssettings.google.com or at https://www.aboutads.info. To learn how Google uses data from sites that use its services, see https://policies.google.com/technologies/partner-sites.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "For any privacy questions, reach out through our Contact page or email support@codelove.in. We're happy to help.",
          ],
        },
      ]}
    />
  );
}
