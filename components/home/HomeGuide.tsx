import Link from "next/link";

/**
 * Home-page text for the phrases people search. Each block answers one question in a few sentences and links to the
 * tool that does the job, so the home page has its own text instead of repeating the tool pages.
 */
const BLOCKS = [
  {
    heading: "Video to GIF converter free: how it works",
    body: "Open the MP4 to GIF tool, choose a video, then pick where the GIF starts, how many seconds it lasts, the frame rate and the width. The converter runs ffmpeg inside your browser tab, so the clip is never uploaded and the finished GIF has no watermark.",
    href: "/video-to-gif/",
    link: "Convert MP4 to GIF",
  },
  {
    heading: "A GIF maker free of signups and watermarks",
    body: "GIF Studio is a GIF maker free to use as often as you like. Trim the best few seconds of a screen recording or phone clip, keep the width near 480 px for a light file, and download a looping GIF you can paste into chats, docs and READMEs.",
    href: "/tools/",
    link: "See all GIF and video tools",
  },
  {
    heading: "Compress GIF online free",
    body: "Large GIFs fail on upload limits and slow pages down. Choose Light, Balanced or Strong and the GIF is rebuilt with fewer frames per second and smaller dimensions, which are the two changes that shrink a GIF the most. The new file size is shown before you download.",
    href: "/gif-compressor/",
    link: "Compress a GIF online free",
  },
  {
    heading: "Video compressor online, including WhatsApp-size files",
    body: "A video compressor online should not need an account. Re-encode any MP4 or MOV as H.264 with High quality, Balanced or Small size. To compress video for WhatsApp, start with Small size, which usually brings a phone clip well under the app's file limit.",
    href: "/video-compressor/",
    link: "Compress a video for WhatsApp",
  },
  {
    heading: "GIF to MP4: smaller and smoother",
    body: "A GIF to MP4 conversion often cuts the file to a fraction of its size, because video stores motion far more efficiently than a stack of GIF frames. The result is an H.264 MP4 that plays on iPhone, Android and the web.",
    href: "/gif-to-video/",
    link: "Convert GIF to MP4",
  },
];

export function HomeGuide() {
  return (
    <section id="guide" className="container-px scroll-mt-24 py-[50px]">
      <div className="mx-auto max-w-3xl">
        <span className="section-eyebrow">Guide</span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          Convert, compress and edit GIFs and videos online
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Most online converters make you upload your file, wait, and then download a result with a logo on it. GIF
          Studio does the work on your own device instead, so it is private, has no queue and adds nothing to your
          file. Here is what people use it for most.
        </p>
        <div className="mt-8 space-y-8">
          {BLOCKS.map((b) => (
            <div key={b.heading}>
              <h3 className="font-display text-xl font-bold">{b.heading}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{b.body}</p>
              <Link href={b.href} className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
                {b.link} <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
