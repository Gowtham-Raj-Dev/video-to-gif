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

/** Page-specific help text shown on the tool page (unique per tool, so the pages are not near-duplicates). */
export interface ToolGuide {
  /** H2 of the how-to section, phrased like the search people type. */
  heading: string;
  intro: string[];
  steps: string[];
  tipsHeading: string;
  tips: string[];
}

export interface Tool {
  slug: string;
  name: string;
  /** Visible H1 on the tool page (the main search phrase). */
  h1: string;
  icon: IconName;
  gradient: string; // tailwind gradient classes for the icon tile
  category: "Convert" | "Resize" | "Crop" | "Compress";
  popular?: boolean;
  isNew?: boolean;
  tagline: string;
  short: string;
  long: string;
  /** Title without the brand; the layout template appends " | GIF Studio". Keep the whole title under 60 characters. */
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
  inputFormats: string[];
  outputFormats: string[];
  features: ToolFeature[];
  benefits: string[];
  guide: ToolGuide;
  faqs: ToolFaq[];
  related: string[];
}

// Every claim below matches lib/toolProcessing.ts (the controls and ffmpeg commands each tool really runs).
export const TOOLS: Tool[] = [
  {
    slug: "video-to-gif",
    name: "Video to GIF",
    h1: "MP4 to GIF converter",
    icon: "videoToGif",
    gradient: "from-cyan-400 to-blue-500",
    category: "Convert",
    popular: true,
    tagline: "Turn any video clip into a looping GIF.",
    short: "Convert MP4, MOV, WEBM and more into animated GIFs.",
    long: "Pick a video, choose where the GIF starts and how long it runs, set the frame rate and width, and get a looping GIF back — made in your browser with no upload, no signup and no watermark.",
    seoTitle: "MP4 to GIF — Convert Video to GIF Free",
    metaDescription:
      "Convert MP4, MOV or WEBM to GIF free in your browser. Set start time, length, frame rate and width. No upload, no signup, no watermark.",
    keywords: ["mp4 to gif", "video to gif", "convert mp4 to gif free", "mov to gif", "make a gif from video", "codelove video to gif"],
    inputFormats: ["MP4", "MOV", "WEBM", "MKV", "AVI"],
    outputFormats: ["GIF"],
    features: [
      { title: "Start time & length", description: "Type the second the GIF should start at and how many seconds it should last." },
      { title: "Frame rate 5–30 fps", description: "15 fps is the default; lower it for a smaller file, raise it for smoother motion." },
      { title: "Width up to 1920 px", description: "480 px wide by default, height follows the video's shape. 0 keeps the original width." },
      { title: "Three quality modes", description: "High builds a custom color palette, Standard is faster, Small limits the GIF to 64 colors." },
    ],
    benefits: ["No watermark", "The video never leaves your device", "Loop forever or play once", "Works in desktop and phone browsers"],
    guide: {
      heading: "How to convert MP4 to GIF",
      intro: [
        "A GIF is the easiest way to share a short moment from a video: it plays by itself, loops, and works in chats, docs and README files where a video player would not. This page turns an MP4 (or a MOV, WEBM, MKV or AVI file) into an animated GIF using ffmpeg compiled to WebAssembly, so the conversion happens on your own computer or phone.",
        "GIFs get big quickly because every frame is stored as a picture with at most 256 colors. The settings below are there so you can keep only the part you need at a size that still looks good.",
      ],
      steps: [
        "Choose the video file. It is read by your browser only; nothing is uploaded.",
        "Set the start time in seconds, and the duration — leave duration at 0 to convert the whole video, which is rarely what you want for a GIF.",
        "Pick a frame rate. 10–15 fps is enough for most clips; 24–30 fps only for fast motion.",
        "Set the width. 480 px suits chats and web pages, 320 px is good for reactions, 0 keeps the original size.",
        "Choose High quality for the cleanest colors, then press Convert & Download.",
      ],
      tipsHeading: "Tips for a small, sharp GIF",
      tips: [
        "Keep it under about 5 seconds — length matters more than anything else for file size.",
        "Halving the width cuts the file to roughly a quarter.",
        "If the GIF is still too big, run it through the GIF Compressor or turn it into an MP4 with GIF to Video.",
        "The first conversion downloads the ffmpeg converter once (about 30 MB); later ones start straight away.",
      ],
    },
    faqs: [
      { question: "How do I make a GIF from only part of a video?", answer: "Enter the start time in seconds and a duration. Only that window is converted, which also keeps the GIF small." },
      { question: "Which video formats can I convert to GIF?", answer: "MP4, MOV, WEBM and most MKV and AVI files. Anything your browser lets you pick as a video and ffmpeg can decode will work." },
      { question: "Why is my GIF so large?", answer: "Length, width and frame rate decide the size. Try 3–5 seconds, 480 px wide and 12–15 fps, or choose the Small quality mode." },
      { question: "Is there a watermark?", answer: "No. The GIF you download is exactly what ffmpeg produced, with nothing added." },
    ],
    related: ["gif-compressor", "gif-to-video", "gif-resize"],
  },
  {
    slug: "gif-to-video",
    name: "GIF to Video",
    h1: "GIF to MP4 converter",
    icon: "gifToVideo",
    gradient: "from-fuchsia-400 to-cyan-400",
    category: "Convert",
    popular: true,
    tagline: "Turn an animated GIF into a small MP4 video.",
    short: "Convert animated GIFs into MP4 videos that are much smaller and play everywhere.",
    long: "Drop in an animated GIF and get an MP4 back — H.264 video with fast-start, the format phones, social apps and websites play natively. It runs in your browser with one click and no settings to learn.",
    seoTitle: "GIF to MP4 Converter — Free, No Watermark",
    metaDescription:
      "Convert an animated GIF to MP4 free in your browser. One click, H.264 video that plays on every phone and app, usually far smaller than the GIF.",
    keywords: ["gif to mp4", "gif to video", "convert gif to mp4 free", "animated gif to video", "gif to mp4 converter online free"],
    inputFormats: ["GIF"],
    outputFormats: ["MP4"],
    features: [
      { title: "One click", description: "No settings: choose the GIF and press Convert & Download." },
      { title: "H.264 MP4", description: "Encoded as standard H.264 with yuv420p color, so it plays on iPhone, Android, WhatsApp and the web." },
      { title: "Fast-start file", description: "The video's index is moved to the front so it starts playing before it has fully downloaded." },
      { title: "Every frame kept", description: "The animation's frames and timing are carried over to the video." },
    ],
    benefits: ["Usually a fraction of the GIF's size", "Plays in apps that freeze or reject GIFs", "No watermark", "Nothing is uploaded"],
    guide: {
      heading: "How to convert a GIF to MP4",
      intro: [
        "Animated GIFs are an old format: every frame is a full image with a 256-color palette, so even a short loop can weigh several megabytes. MP4 video stores only what changes between frames, which is why the same animation as an MP4 is often many times smaller and looks smoother too.",
        "That matters when a platform limits upload size, when a page loads slowly because of a big GIF, or when an app shows GIFs as still images. Converting to MP4 fixes all three.",
      ],
      steps: [
        "Choose the animated GIF you want to convert.",
        "Press Convert & Download. The GIF is turned into an H.264 MP4 in your browser.",
        "Check the new file size shown next to the result, then download the MP4.",
      ],
      tipsHeading: "Good to know",
      tips: [
        "The MP4 has no sound, because GIFs have none.",
        "Odd widths or heights are rounded down by one pixel, because H.264 needs even dimensions.",
        "A video does not loop by itself; on a website add the loop, muted and autoplay attributes to the video tag to make it behave like a GIF.",
        "Need a smaller GIF instead of a video? Use the GIF Compressor.",
      ],
    },
    faqs: [
      { question: "Why convert a GIF to MP4?", answer: "The MP4 is usually much smaller, plays smoothly, and works in apps and sites that limit or pause GIFs." },
      { question: "Will the MP4 loop like the GIF?", answer: "The file plays once like any video. Most players and websites can loop it; on the web use <video autoplay loop muted playsinline>." },
      { question: "Can I convert the MP4 back into a GIF?", answer: "Yes — use the MP4 to GIF converter on this site and pick the part, frame rate and width you want." },
      { question: "Is the GIF uploaded?", answer: "No. ffmpeg runs inside your browser, so the GIF and the MP4 never leave your device." },
    ],
    related: ["video-to-gif", "gif-compressor", "video-compressor"],
  },
  {
    slug: "gif-resize",
    name: "GIF Resize",
    h1: "Resize a GIF online",
    icon: "gifResize",
    gradient: "from-emerald-400 to-cyan-400",
    category: "Resize",
    tagline: "Change a GIF's width and height, keep the animation.",
    short: "Resize animated GIFs to an exact width or height without breaking the loop.",
    long: "Make a GIF fit an avatar slot, an emoji size or a banner: set the new width, the new height, or both, and every frame is scaled the same way so the animation keeps looping.",
    seoTitle: "Resize GIF Online Free — Change GIF Size",
    metaDescription:
      "Resize an animated GIF online free: set width, height or both, keep the aspect ratio and the loop. Runs in your browser, no upload, no watermark.",
    keywords: ["resize gif", "resize animated gif free", "gif resizer online free", "change gif size", "scale gif"],
    inputFormats: ["GIF"],
    outputFormats: ["GIF"],
    features: [
      { title: "Width or height", description: "Set one side and leave the other at 0 to keep the GIF's proportions." },
      { title: "Exact size", description: "Set both to force an exact size, for example 128 × 128 for an emoji." },
      { title: "Lanczos scaling", description: "A sharp resampling filter that keeps edges clean when shrinking." },
      { title: "Loop kept", description: "The resized GIF is saved to loop forever, like most GIFs." },
    ],
    benefits: ["Fit avatar, emoji and banner sizes", "Smaller dimensions also mean a smaller file", "No watermark", "Nothing is uploaded"],
    guide: {
      heading: "How to resize a GIF without breaking it",
      intro: [
        "Many places only accept a GIF at a certain size: Discord and Slack emojis are small squares, forum avatars have fixed dimensions, and email banners have a maximum width. Resizing a GIF in an ordinary image editor often keeps only the first frame. Here every frame is scaled together by ffmpeg, so the animation stays intact.",
      ],
      steps: [
        "Choose the GIF.",
        "Enter the new width in pixels and leave height at 0 — the height is worked out so nothing looks stretched. Or do the opposite and set only the height.",
        "To force an exact size such as 128 × 128, fill in both; a GIF that isn't square will be stretched, so crop it to a square first with GIF Crop.",
        "Press Resize & Download to save the new GIF.",
      ],
      tipsHeading: "Common GIF sizes",
      tips: [
        "Emoji and reactions: 64–128 px.",
        "Profile pictures and avatars: 200–400 px.",
        "Chat and web pages: about 480 px wide.",
        "Making a GIF bigger cannot add detail; it only makes the file larger.",
      ],
    },
    faqs: [
      { question: "How do I keep the aspect ratio?", answer: "Fill in only the width or only the height and leave the other at 0. The missing side is calculated from the original shape." },
      { question: "Does resizing make the GIF smaller in MB?", answer: "Shrinking the dimensions usually reduces the file size a lot. For an even smaller file, also use the GIF Compressor." },
      { question: "Can I crop and resize in one go?", answer: "Crop first with GIF Crop, then resize the result here." },
      { question: "Is my GIF uploaded?", answer: "No, it is resized inside your browser." },
    ],
    related: ["gif-crop", "gif-compressor", "video-resize"],
  },
  {
    slug: "gif-crop",
    name: "GIF Crop",
    h1: "Crop a GIF online",
    icon: "gifCrop",
    gradient: "from-amber-400 to-pink-500",
    category: "Crop",
    tagline: "Cut away borders and empty space from a GIF.",
    short: "Crop animated GIFs with a drag-to-select box and ratio presets.",
    long: "Drag a box over the part of the GIF you want to keep, or snap it to 1:1, 9:16, 4:5 or 16:9. The same crop is applied to every frame, so the loop stays smooth.",
    seoTitle: "Crop GIF Online Free — Keep the Animation",
    metaDescription:
      "Crop an animated GIF online free. Drag a box or use 1:1, 9:16, 4:5 and 16:9 presets; every frame is cropped the same way. No upload, no watermark.",
    keywords: ["crop gif", "crop animated gif free", "gif cropper online", "cut gif edges", "square gif"],
    inputFormats: ["GIF"],
    outputFormats: ["GIF"],
    features: [
      { title: "Drag to select", description: "Move and resize the crop box on top of the GIF." },
      { title: "Ratio presets", description: "1:1, 9:16, 4:5, 16:9 or Free for any shape." },
      { title: "Same crop on every frame", description: "The animation is cropped consistently, so nothing jumps." },
      { title: "Centered default", description: "Skip the box and a centered crop at the chosen ratio is used." },
    ],
    benefits: ["Remove black bars and borders", "Make square GIFs for avatars", "No watermark", "Nothing is uploaded"],
    guide: {
      heading: "How to crop a GIF",
      intro: [
        "Screen recordings and memes often come with black bars, toolbars or empty space around the part that matters. Cropping removes it, makes the subject bigger in the frame and usually makes the file smaller too.",
      ],
      steps: [
        "Choose the GIF. The crop window opens with the first frame.",
        "Pick a ratio — 1:1 for avatars and emoji, 9:16 for stories, 4:5 for feeds, 16:9 for wide, or Free.",
        "Drag the box over the part you want to keep and save the crop.",
        "Press Crop & Download to save the GIF.",
      ],
      tipsHeading: "Tips",
      tips: [
        "Check that the subject stays inside the box for the whole animation, not just in the first frame.",
        "After cropping, use GIF Resize to bring it to an exact size like 128 × 128.",
        "To crop a video instead, use Video Crop.",
      ],
    },
    faqs: [
      { question: "Does cropping break the animation?", answer: "No. The same rectangle is cut from every frame, so the GIF keeps playing exactly as before." },
      { question: "How do I make a square GIF?", answer: "Choose the 1:1 preset, place the box and save." },
      { question: "Can I crop to an exact pixel size?", answer: "Crop to the shape you want here, then set the exact size with GIF Resize." },
      { question: "Is it free?", answer: "Yes, with no signup and no watermark." },
    ],
    related: ["gif-resize", "video-crop", "gif-compressor"],
  },
  {
    slug: "video-crop",
    name: "Video Crop",
    h1: "Crop a video online",
    icon: "videoCrop",
    gradient: "from-indigo-400 to-cyan-400",
    category: "Crop",
    popular: true,
    tagline: "Reframe a video to 9:16, 1:1, 4:5 or any shape.",
    short: "Crop videos for Reels, Shorts, TikTok and feeds with ratio presets or a free box.",
    long: "Turn a wide video into a vertical 9:16 clip, a square 1:1 post or a 4:5 feed video. Drag the crop box to keep the subject in frame and export an MP4 that every phone plays.",
    seoTitle: "Crop Video Online Free — 9:16, 1:1, 4:5",
    metaDescription:
      "Crop a video online free to 9:16 for Reels and Shorts, 1:1 or 4:5 for feeds, or any shape. Drag to frame it, export MP4. No upload, no watermark.",
    keywords: ["crop video online free", "crop video 9:16", "crop video 1 1", "crop video for instagram", "crop video for youtube shorts"],
    inputFormats: ["MP4", "MOV", "WEBM", "MKV", "AVI"],
    outputFormats: ["MP4"],
    features: [
      { title: "Social ratios", description: "9:16, 1:1, 4:5 and 16:9 presets, or Free." },
      { title: "Drag to frame", description: "Place the crop box over the subject on a preview frame." },
      { title: "MP4 output", description: "H.264 MP4 with even dimensions, ready for upload." },
      { title: "Sound kept", description: "Only the picture is cropped; the audio track goes along." },
    ],
    benefits: ["Vertical clips from landscape footage", "Square posts in seconds", "No watermark", "Nothing is uploaded"],
    guide: {
      heading: "How to crop a video for Reels, Shorts and TikTok",
      intro: [
        "Phones show vertical video full-screen, so a landscape clip posted as-is ends up small with big bars. Cropping to 9:16 keeps the important part and fills the screen. For feed posts, 1:1 and 4:5 take up more space than 16:9.",
      ],
      steps: [
        "Choose the video. A crop window opens on a frame of it.",
        "Pick 9:16 for Reels, Shorts and TikTok, 1:1 or 4:5 for feed posts, or Free.",
        "Drag the box over the subject and save.",
        "Press Crop & Download and wait for the MP4.",
      ],
      tipsHeading: "Tips",
      tips: [
        "Cropping a 1080p landscape video to 9:16 leaves about 608 × 1080 pixels; it will still look fine on phones.",
        "Long videos take a while: the converter runs on your device's CPU.",
        "To turn a long video into many vertical Shorts automatically, try Video Cut (videocut.codelove.in).",
      ],
    },
    faqs: [
      { question: "Which ratio should I use for Instagram Reels and YouTube Shorts?", answer: "9:16. Use 4:5 or 1:1 for regular feed posts." },
      { question: "Does it keep the sound?", answer: "Yes, the audio is kept; only the picture is cropped." },
      { question: "Will cropping lower the quality?", answer: "The kept area is re-encoded as H.264, which keeps it looking close to the original, but it has fewer pixels than the full frame." },
      { question: "Is the video uploaded?", answer: "No, cropping runs in your browser." },
    ],
    related: ["video-resize", "video-compressor", "gif-crop"],
  },
  {
    slug: "video-resize",
    name: "Video Resize",
    h1: "Resize a video online",
    icon: "videoResize",
    gradient: "from-sky-400 to-emerald-400",
    category: "Resize",
    tagline: "Change a video to 1080p, 720p, 480p or 360p.",
    short: "Lower a video's resolution to 1080p, 720p, 480p or 360p, keeping its shape.",
    long: "Bring a 4K or 1080p video down to the resolution you actually need. The height is set to the preset you pick and the width follows automatically, so the picture is never stretched.",
    seoTitle: "Resize Video Online — 1080p, 720p, 480p, 360p",
    metaDescription:
      "Resize a video online free: change it to 1080p, 720p, 480p or 360p without stretching. Smaller files for email, chat and upload limits. No upload needed.",
    keywords: ["resize video online free", "change video resolution", "video to 720p", "video to 480p", "reduce video resolution"],
    inputFormats: ["MP4", "MOV", "WEBM", "MKV", "AVI"],
    outputFormats: ["MP4"],
    features: [
      { title: "Four presets", description: "1080p, 720p (default), 480p and 360p." },
      { title: "No stretching", description: "The width is calculated from the height so proportions stay the same." },
      { title: "MP4 output", description: "H.264 MP4 that plays everywhere." },
      { title: "Sound kept", description: "The audio track is carried over." },
    ],
    benefits: ["Much smaller files at lower resolutions", "Fits email and chat limits", "No watermark", "Nothing is uploaded"],
    guide: {
      heading: "How to change a video's resolution",
      intro: [
        "Phones record in 1080p or 4K, which is far more than a chat message, a slide or a support ticket needs. Dropping the resolution is the most effective way to make a video smaller, because the encoder has fewer pixels to store in every frame.",
      ],
      steps: [
        "Choose the video.",
        "Pick a resolution: 720p for most sharing, 480p for small files, 360p for the smallest, 1080p to bring 4K down to Full HD.",
        "Press Resize & Download to save the MP4.",
      ],
      tipsHeading: "Which resolution to pick",
      tips: [
        "720p still looks sharp on a phone screen.",
        "480p is usually enough for chat apps and previews.",
        "For the smallest file, resize first and then run the result through the Video Compressor.",
        "Resizing up (for example 480p to 1080p) makes the file bigger without adding detail.",
      ],
    },
    faqs: [
      { question: "Will the video look stretched?", answer: "No. Only the height is set; the width is calculated from the original shape and rounded to an even number." },
      { question: "Can I enter a custom size?", answer: "Not at the moment — choose one of the four presets. To change the shape, use Video Crop first." },
      { question: "Does it keep the audio?", answer: "Yes." },
      { question: "Is my video private?", answer: "Yes, it is processed in your browser and never uploaded." },
    ],
    related: ["video-compressor", "video-crop", "gif-resize"],
  },
  {
    slug: "gif-compressor",
    name: "GIF Compressor",
    h1: "Compress GIF online free",
    icon: "gifCompress",
    gradient: "from-rose-400 to-amber-400",
    category: "Compress",
    tagline: "Make a GIF smaller in MB.",
    short: "Reduce a GIF's file size by lowering its frame rate and dimensions.",
    long: "Big GIFs hit upload limits and slow pages down. Pick Light, Balanced or Strong and the GIF is rebuilt with fewer frames per second and smaller dimensions — the two changes that cut GIF size the most.",
    seoTitle: "Compress GIF Online Free — Make a GIF Smaller",
    metaDescription:
      "Compress a GIF online free: Light, Balanced or Strong lowers frame rate and size to cut megabytes and keeps the loop. No upload, no watermark.",
    keywords: ["compress gif online free", "gif compressor", "reduce gif size", "make gif smaller", "shrink gif file size"],
    inputFormats: ["GIF"],
    outputFormats: ["GIF"],
    features: [
      { title: "Light", description: "15 fps at 90% of the original size — the gentlest change." },
      { title: "Balanced", description: "12 fps at 75% size — the default, a good mix of size and looks." },
      { title: "Strong", description: "10 fps at 60% size — the smallest file." },
      { title: "Size shown", description: "The result shows its new file size so you can check it before downloading." },
    ],
    benefits: ["Fit Discord, Slack and forum upload limits", "Faster loading pages", "No watermark", "Nothing is uploaded"],
    guide: {
      heading: "How to compress a GIF",
      intro: [
        "A GIF's size depends on three things: how many frames it has, how many pixels each frame has, and how many colors it uses. This compressor works on the first two. Fewer frames per second means fewer pictures to store, and smaller dimensions shrink every one of them, so the savings add up quickly — while the animation still loops the same way.",
      ],
      steps: [
        "Choose the GIF you want to make smaller.",
        "Pick a level: Light keeps it closest to the original, Balanced is a good default, Strong gives the smallest file.",
        "Press Compress and compare the new size shown on the result with the original.",
        "Download it, or try a stronger level if it is still too big.",
      ],
      tipsHeading: "When compressing is not enough",
      tips: [
        "Cut the length: a shorter loop is the biggest saving. Recreate it from the video with MP4 to GIF and a shorter duration.",
        "Crop away borders with GIF Crop before compressing.",
        "If the place you're posting accepts video, GIF to MP4 usually gives a far smaller file than any GIF.",
        "Already-optimized GIFs may shrink less, because their frames are already small.",
      ],
    },
    faqs: [
      { question: "How does the GIF compressor make the file smaller?", answer: "It lowers the frame rate (to 15, 12 or 10 fps) and scales the frames down (to 90%, 75% or 60%). Both reduce how much data the GIF stores." },
      { question: "Will my GIF still animate?", answer: "Yes. It keeps its frames' order and loops forever." },
      { question: "How much smaller will it get?", answer: "It depends on the GIF: long, large GIFs shrink the most and Strong saves the most. Check the size shown on the result." },
      { question: "Is my GIF uploaded?", answer: "No, it is compressed inside your browser." },
    ],
    related: ["gif-to-video", "gif-resize", "video-to-gif"],
  },
  {
    slug: "video-compressor",
    name: "Video Compressor",
    h1: "Video compressor online",
    icon: "videoCompress",
    gradient: "from-cyan-400 to-emerald-400",
    category: "Compress",
    popular: true,
    tagline: "Shrink big videos for WhatsApp, email and uploads.",
    short: "Compress MP4, MOV and WEBM videos to a smaller H.264 MP4.",
    long: "Re-encode a large video as an efficient H.264 MP4. Choose High quality, Balanced or Small size and get a file that is much lighter to send — compressed in your browser, so the video stays on your device.",
    seoTitle: "Video Compressor Online — Compress for WhatsApp",
    metaDescription:
      "Free video compressor online: shrink MP4, MOV or WEBM to a small H.264 MP4 for WhatsApp, email or uploads. Three quality levels, no upload, no watermark.",
    keywords: ["video compressor online", "compress video for whatsapp", "online video compressor", "reduce video size online free", "compress mp4"],
    inputFormats: ["MP4", "MOV", "WEBM", "MKV", "AVI"],
    outputFormats: ["MP4"],
    features: [
      { title: "Three levels", description: "High quality, Balanced (default) or Small size, set through the H.264 quality factor (CRF 23, 28 or 32)." },
      { title: "Plays everywhere", description: "H.264 video with AAC audio in an MP4 — the format WhatsApp, iPhone and Android expect." },
      { title: "Fast-start", description: "The file can start playing before it has fully loaded." },
      { title: "Size shown", description: "The result shows the new file size before you download." },
    ],
    benefits: ["Send videos that were too big to share", "Save phone and cloud storage", "No watermark", "Nothing is uploaded"],
    guide: {
      heading: "How to compress a video for WhatsApp",
      intro: [
        "Phone videos are recorded at a high bitrate, so a one-minute clip can take hundreds of megabytes. Messaging apps either refuse files that are too big or squeeze them hard on their own. Compressing first lets you decide the quality and keep it predictable.",
        "This compressor re-encodes the video with H.264 at a quality level you choose, keeping the resolution and sound. Higher CRF numbers mean a smaller file with a little less detail.",
      ],
      steps: [
        "Choose the video from your phone or computer.",
        "Pick Balanced for most videos, Small size when the file has to be as light as possible, or High quality when detail matters.",
        "Press Compress. Long videos take a while because the work happens on your own device.",
        "Check the new size on the result, download the MP4 and send it on WhatsApp or by email.",
      ],
      tipsHeading: "To get even smaller",
      tips: [
        "Lower the resolution first with Video Resize (720p or 480p), then compress — that is the biggest saving of all.",
        "A shorter video is a smaller file: cut out what you don't need first, for example with Video Cut (videocut.codelove.in).",
        "There is no target-size setting; if the file is still too big, use Small size or a lower resolution.",
        "The first run downloads the ffmpeg converter once (about 30 MB).",
      ],
    },
    faqs: [
      { question: "How do I compress a video for WhatsApp?", answer: "Choose the video, pick Balanced or Small size, press Compress and send the MP4. For an even smaller file, resize it to 720p or 480p first." },
      { question: "Can I choose an exact file size?", answer: "No. Pick one of the three quality levels and check the size shown on the result." },
      { question: "Does it keep the sound?", answer: "Yes, the audio is re-encoded as AAC and kept in the MP4." },
      { question: "Is my video uploaded to a server?", answer: "No. Compression runs in your browser with ffmpeg.wasm, so the video never leaves your device." },
    ],
    related: ["video-resize", "video-crop", "gif-to-video"],
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
