import { ADSENSE_CLIENT } from "@/lib/adsense";

// Rendered once at build time and exported as the plain file /ads.txt.
export const dynamic = "force-static";

export function GET() {
  const body = ADSENSE_CLIENT
    ? `google.com, ${ADSENSE_CLIENT.replace(/^ca-/, "")}, DIRECT, f08c47fec0942fa0\n`
    : "# ads.txt: the Google AdSense publisher ID is not configured yet.\n";

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
