export type IconName =
  | "videoToGif"
  | "gifToVideo"
  | "gifResize"
  | "gifCrop"
  | "videoCrop"
  | "videoResize"
  | "gifCompress"
  | "videoCompress";

export interface ToolFeature {
  title: string;
  description: string;
}

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface Tool {
  slug: string;
  name: string;
  icon: IconName;
  gradient: string; // tailwind gradient classes for the icon tile
  category: "Convert" | "Resize" | "Crop" | "Compress";
  popular?: boolean;
  isNew?: boolean;
  tagline: string;
  short: string;
  long: string;
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  inputFormats: string[];
  outputFormats: string[];
  features: ToolFeature[];
  benefits: string[];
  faqs: ToolFaq[];
  related: string[];
}

export const TOOLS: Tool[] = [
  {
    slug: "video-to-gif",
    name: "Video to GIF",
    icon: "videoToGif",
    gradient: "from-cyan-400 to-blue-500",
    category: "Convert",
    popular: true,
    tagline: "Turn any video clip into a shareable GIF.",
    short:
      "Convert MP4, MOV, AVI and more into high-quality GIF animations.",
    long: "Convert any video into a smooth, high-quality animated GIF right in your browser. Trim the exact moment, control frame rate and dimensions, and export a crisp loop in seconds — no software, no signup, and no watermark.",
    seoTitle: "Free Video to GIF Converter Online | GIF Studio",
    metaDescription:
      "Convert MP4, MOV, AVI & WEBM to high-quality GIF online free. Fast, private, browser-based video to GIF converter with no watermark and no signup.",
    keywords: [
      "video to gif free",
      "video to gif converter free",
      "convert mp4 to gif free",
      "mp4to gif free",
      "online gif converter free",
      "free gif converter",
      "gif maker free",
      "mov to gif free",
      "make a gif from video free",
      "codelove",
    ],
    inputFormats: ["MP4", "MOV", "AVI", "MKV", "WEBM", "MPEG"],
    outputFormats: ["GIF"],
    features: [
      { title: "Precise Trimming", description: "Pick the exact start and end of your clip before converting." },
      { title: "Frame Rate Control", description: "Balance smoothness and file size with adjustable FPS." },
      { title: "Custom Dimensions", description: "Resize on export for the perfect size on any platform." },
      { title: "High-Quality Output", description: "Optimized color palettes keep your GIF crisp and vibrant." },
    ],
    benefits: [
      "No watermark on any export",
      "Files never leave your device",
      "Unlimited conversions, free forever",
      "Works on desktop and mobile",
    ],
    faqs: [
      { question: "How do I convert a video to a GIF?", answer: "Upload your video, trim to the moment you want, adjust the frame rate and size, then click convert. Your GIF downloads instantly." },
      { question: "Which video formats can I convert?", answer: "MP4, MOV, AVI, MKV, WEBM and MPEG are all supported for conversion to GIF." },
      { question: "Is there a watermark on the GIF?", answer: "No. GIF Studio never adds a watermark to your exports." },
      { question: "Is my video uploaded to a server?", answer: "No. Conversion happens locally in your browser, so your files stay private on your device." },
    ],
    related: ["gif-to-video", "gif-resize", "gif-compressor"],
  },
  {
    slug: "gif-to-video",
    name: "GIF to Video",
    icon: "gifToVideo",
    gradient: "from-fuchsia-400 to-cyan-400",
    category: "Convert",
    popular: true,
    tagline: "Convert animated GIFs into lightweight MP4 videos.",
    short:
      "Transform animated GIFs into MP4 videos for better sharing and smaller file sizes.",
    long: "Animated GIFs are huge and awkward to share. Convert them to MP4 to shrink file size dramatically while keeping the animation perfectly smooth — ideal for social platforms, messaging apps, and websites that prefer video.",
    seoTitle: "Convert GIF to MP4 Online Free | GIF Studio",
    metaDescription:
      "Convert animated GIF to MP4 video online free. Shrink file size, keep smooth playback, no watermark and no signup. Fast browser-based GIF to video tool.",
    keywords: [
      "gif to mp4 free",
      "gif to video free",
      "convert gif to mp4 free",
      "animated gif to video free",
      "gif to mp4 converter online free",
      "video to gif free",
      "mp4to gif free",
      "codelove",
    ],
    inputFormats: ["GIF"],
    outputFormats: ["MP4", "WEBM"],
    features: [
      { title: "Massive Size Savings", description: "MP4 files can be a fraction of the original GIF size." },
      { title: "Smooth Playback", description: "Preserve every frame with clean, judder-free motion." },
      { title: "Platform Ready", description: "Export video that plays natively on social and messaging apps." },
      { title: "One-Click Export", description: "Drop your GIF and download an MP4 in a couple of seconds." },
    ],
    benefits: [
      "Dramatically smaller files than GIF",
      "Better compatibility across apps",
      "No quality-destroying re-compression",
      "Completely free with no limits",
    ],
    faqs: [
      { question: "Why convert a GIF to MP4?", answer: "MP4 files are far smaller than GIFs at the same quality and are supported natively by almost every app and platform." },
      { question: "Will the animation stay smooth?", answer: "Yes. Every frame is preserved and encoded into smooth, native video playback." },
      { question: "Does it work on mobile?", answer: "Yes, the converter runs in any modern mobile browser." },
      { question: "Is it really free?", answer: "Yes, GIF to video conversion is free with no limits and no watermark." },
    ],
    related: ["video-to-gif", "video-compressor", "gif-compressor"],
  },
  {
    slug: "gif-resize",
    name: "GIF Resize",
    icon: "gifResize",
    gradient: "from-emerald-400 to-cyan-400",
    category: "Resize",
    tagline: "Resize animated GIFs without breaking the loop.",
    short:
      "Resize GIF dimensions while maintaining smooth animation quality.",
    long: "Scale animated GIFs up or down to the exact dimensions you need while keeping the animation buttery smooth. Lock the aspect ratio or set custom width and height — every frame is resized together for a flawless loop.",
    seoTitle: "Resize Animated GIF Online Free | GIF Studio",
    metaDescription:
      "Resize animated GIF online free while keeping smooth animation. Set custom dimensions or lock aspect ratio. No watermark, no signup, private in-browser tool.",
    keywords: [
      "resize gif free",
      "resize animated gif free",
      "gif resizer online free",
      "change gif size free",
      "scale gif free",
      "codelove",
    ],
    inputFormats: ["GIF"],
    outputFormats: ["GIF"],
    features: [
      { title: "Aspect Ratio Lock", description: "Keep proportions perfect while you scale." },
      { title: "Custom Width & Height", description: "Enter exact pixel dimensions for any use case." },
      { title: "Frame-Perfect Scaling", description: "Every frame resizes together for a smooth loop." },
      { title: "Instant Preview", description: "See the result before you download." },
    ],
    benefits: [
      "Maintain smooth animation at any size",
      "No quality loss from re-uploading",
      "Great for avatars, banners and emotes",
      "Free with unlimited resizes",
    ],
    faqs: [
      { question: "Can I resize a GIF without losing animation?", answer: "Yes. Every frame is scaled together so the animation stays smooth at the new size." },
      { question: "Can I keep the aspect ratio?", answer: "Yes, enable the aspect ratio lock and only set one dimension — the other adjusts automatically." },
      { question: "Is there a size limit?", answer: "There are no imposed upload limits; processing happens on your own device." },
      { question: "Does resizing add a watermark?", answer: "No, exports are always watermark-free." },
    ],
    related: ["gif-crop", "gif-compressor", "video-resize"],
  },
  {
    slug: "gif-crop",
    name: "GIF Crop",
    icon: "gifCrop",
    gradient: "from-amber-400 to-pink-500",
    category: "Crop",
    tagline: "Crop away the parts you don't need.",
    short: "Crop unwanted areas from animated GIFs with precision.",
    long: "Frame your GIF exactly the way you want. Drag to select the crop region, use preset ratios, and trim away borders or dead space — the animation is cropped consistently across every frame for a clean, professional result.",
    seoTitle: "Crop GIF Online Without Losing Animation | GIF Studio",
    metaDescription:
      "Crop animated GIF online free without losing the animation. Precise drag-to-crop with preset ratios, no watermark, no signup, private browser-based tool.",
    keywords: [
      "crop gif free",
      "crop animated gif free",
      "gif cropper online free",
      "trim gif edges free",
      "cut gif free",
      "codelove",
    ],
    inputFormats: ["GIF"],
    outputFormats: ["GIF"],
    features: [
      { title: "Drag-to-Crop", description: "Select the exact region with an interactive handle." },
      { title: "Preset Ratios", description: "Square, portrait, landscape and custom crops." },
      { title: "Consistent Frames", description: "The crop applies identically across every frame." },
      { title: "Pixel-Precise", description: "Fine-tune with exact coordinate inputs." },
    ],
    benefits: [
      "Remove borders and dead space",
      "Keep the animation perfectly intact",
      "Ideal for reactions and memes",
      "Free and unlimited",
    ],
    faqs: [
      { question: "Does cropping break the animation?", answer: "No. The same crop region is applied to every frame so the loop stays intact." },
      { question: "Can I crop to a square?", answer: "Yes, use the square preset or enter a custom aspect ratio." },
      { question: "Is my GIF uploaded anywhere?", answer: "No, all cropping happens locally in your browser." },
      { question: "Is it free?", answer: "Yes, GIF cropping is completely free with no watermark." },
    ],
    related: ["gif-resize", "video-crop", "gif-compressor"],
  },
  {
    slug: "video-crop",
    name: "Video Crop",
    icon: "videoCrop",
    gradient: "from-indigo-400 to-cyan-400",
    category: "Crop",
    popular: true,
    tagline: "Crop video to any social ratio in seconds.",
    short:
      "Crop videos to Instagram, TikTok, YouTube Shorts, or custom ratios.",
    long: "Reframe your footage for any platform. Crop to 1:1, 9:16, 4:5 or a custom region with an interactive selector — perfect for Instagram, TikTok, Reels, YouTube Shorts and stories, all without re-encoding quality away.",
    seoTitle: "Crop Video Online Free | GIF Studio",
    metaDescription:
      "Crop video online free for Instagram, TikTok, Reels & YouTube Shorts. Preset and custom ratios, no watermark, no signup. Fast private in-browser video cropper.",
    keywords: [
      "crop video free",
      "crop video online free",
      "video cropper free",
      "crop video for instagram free",
      "crop video for tiktok free",
      "codelove",
    ],
    inputFormats: ["MP4", "MOV", "AVI", "MKV", "WEBM"],
    outputFormats: ["MP4", "WEBM"],
    features: [
      { title: "Social Presets", description: "1:1, 9:16, 4:5 and 16:9 ready to go." },
      { title: "Interactive Selector", description: "Drag to reframe exactly what matters." },
      { title: "Custom Ratios", description: "Enter any aspect ratio you need." },
      { title: "Quality Preserving", description: "Crop without heavy re-compression." },
    ],
    benefits: [
      "Perfect framing for every platform",
      "No watermark on exports",
      "Runs privately in your browser",
      "Free with no limits",
    ],
    faqs: [
      { question: "Can I crop video for TikTok or Reels?", answer: "Yes, use the 9:16 preset for TikTok, Reels and YouTube Shorts, or set any custom ratio." },
      { question: "Will cropping reduce quality?", answer: "Cropping preserves as much quality as possible with minimal re-compression." },
      { question: "Is the video uploaded?", answer: "No, cropping runs locally in your browser for full privacy." },
      { question: "Is it free?", answer: "Yes, video cropping is free with no signup and no watermark." },
    ],
    related: ["video-resize", "video-compressor", "gif-crop"],
  },
  {
    slug: "video-resize",
    name: "Video Resize",
    icon: "videoResize",
    gradient: "from-sky-400 to-emerald-400",
    category: "Resize",
    tagline: "Resize video for any platform, keep the quality.",
    short: "Resize videos for any platform while preserving quality.",
    long: "Change your video's resolution to fit any destination — from 4K down to 720p or a custom size. Lock the aspect ratio to avoid distortion and export a clean, correctly-sized file ready for upload anywhere.",
    seoTitle: "Resize Video Online | GIF Studio",
    metaDescription:
      "Resize video online free while preserving quality. Change resolution with aspect-ratio lock, custom dimensions, no watermark and no signup. Private in-browser tool.",
    keywords: [
      "resize video free",
      "resize video online free",
      "change video resolution free",
      "video resizer free",
      "scale video free",
      "codelove",
    ],
    inputFormats: ["MP4", "MOV", "AVI", "MKV", "WEBM"],
    outputFormats: ["MP4", "WEBM"],
    features: [
      { title: "Resolution Presets", description: "1080p, 720p, 480p and more in one click." },
      { title: "Aspect Ratio Lock", description: "Resize without stretching or distortion." },
      { title: "Custom Dimensions", description: "Enter exact width and height in pixels." },
      { title: "Quality Preserving", description: "Smart scaling keeps footage sharp." },
    ],
    benefits: [
      "Fit upload limits on any platform",
      "Reduce dimensions to save bandwidth",
      "No watermark, ever",
      "Free with unlimited resizes",
    ],
    faqs: [
      { question: "Can I resize video without distortion?", answer: "Yes, keep the aspect ratio lock enabled and only one dimension needs to be set." },
      { question: "What resolutions are supported?", answer: "Common presets like 1080p, 720p and 480p plus any custom dimensions you enter." },
      { question: "Is my video private?", answer: "Yes, resizing happens locally in your browser." },
      { question: "Is it free?", answer: "Yes, video resizing is completely free." },
    ],
    related: ["video-crop", "video-compressor", "gif-resize"],
  },
  {
    slug: "gif-compressor",
    name: "GIF Compressor",
    icon: "gifCompress",
    gradient: "from-rose-400 to-amber-400",
    category: "Compress",
    tagline: "Shrink GIF file size, keep the quality.",
    short: "Reduce GIF file size without noticeable quality loss.",
    long: "Big GIFs load slowly and hit upload limits. Compress yours with smart color and frame optimization to cut file size dramatically while keeping the animation looking great — perfect for faster pages and easy sharing.",
    seoTitle: "Compress GIF Online Without Losing Quality | GIF Studio",
    metaDescription:
      "Compress GIF online free without losing quality. Smart optimization shrinks file size for faster loading. No watermark, no signup, private in-browser GIF compressor.",
    keywords: [
      "compress gif online free",
      "gif compressor free",
      "reduce gif size free",
      "optimize gif free",
      "shrink gif file free",
      "codelove",
    ],
    inputFormats: ["GIF"],
    outputFormats: ["GIF"],
    features: [
      { title: "Smart Optimization", description: "Color and frame tuning for the smallest size." },
      { title: "Quality Slider", description: "Choose the exact balance you want." },
      { title: "Instant Preview", description: "Compare before and after side by side." },
      { title: "Big Savings", description: "Often cut file size by more than half." },
    ],
    benefits: [
      "Faster page loads and sharing",
      "Meet strict upload size limits",
      "No visible quality loss",
      "Free and unlimited",
    ],
    faqs: [
      { question: "How much smaller will my GIF be?", answer: "It depends on the source, but savings of 50% or more are common with little visible quality loss." },
      { question: "Will the GIF still animate?", answer: "Yes, compression keeps the full animation intact." },
      { question: "Is my GIF uploaded?", answer: "No, compression happens on your device in the browser." },
      { question: "Is it free?", answer: "Yes, GIF compression is free with no watermark." },
    ],
    related: ["gif-resize", "gif-to-video", "video-compressor"],
  },
  {
    slug: "video-compressor",
    name: "Video Compressor",
    icon: "videoCompress",
    gradient: "from-cyan-400 to-emerald-400",
    category: "Compress",
    popular: true,
    tagline: "Compress large videos fast, keep them looking sharp.",
    short: "Compress large videos quickly with optimized quality.",
    long: "Make large video files small enough to share or upload anywhere. Choose your target quality and let smart encoding do the rest — you get a dramatically smaller file that still looks great, ready in moments.",
    seoTitle: "Compress Video Online Free | GIF Studio",
    metaDescription:
      "Compress video online free without heavy quality loss. Shrink large MP4 & MOV files fast to meet upload limits. No watermark, no signup, private in-browser tool.",
    keywords: [
      "compress video online free",
      "video compressor free",
      "reduce video size free",
      "shrink video file free",
      "compress mp4 free",
      "codelove",
    ],
    inputFormats: ["MP4", "MOV", "AVI", "MKV", "WEBM"],
    outputFormats: ["MP4", "WEBM"],
    features: [
      { title: "Target Quality", description: "Dial in the exact size-to-quality balance." },
      { title: "Fast Encoding", description: "Optimized pipeline compresses in moments." },
      { title: "Large File Ready", description: "Handles big videos without breaking a sweat." },
      { title: "Great Output", description: "Smart bitrate keeps footage looking sharp." },
    ],
    benefits: [
      "Meet email and upload size limits",
      "Save storage and bandwidth",
      "No watermark on exports",
      "Free with no limits",
    ],
    faqs: [
      { question: "How much can I compress a video?", answer: "Large videos can often be reduced by 60–80% depending on the source and your chosen quality." },
      { question: "Will the video still look good?", answer: "Yes, smart bitrate control keeps quality high while cutting file size." },
      { question: "Is my video uploaded to a server?", answer: "No, compression runs locally in your browser." },
      { question: "Is it free?", answer: "Yes, video compression is completely free with no watermark." },
    ],
    related: ["video-resize", "gif-compressor", "gif-to-video"],
  },
];

export const CATEGORIES = ["All", "Convert", "Resize", "Crop", "Compress"] as const;

export function getTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tool.related
    .map((slug) => getTool(slug))
    .filter((t): t is Tool => Boolean(t));
}
