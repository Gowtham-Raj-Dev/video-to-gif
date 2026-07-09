/** @type {import('next').NextConfig} */

// Using a custom domain (videotogif.codelove.in) so basePath is root
const isProd = process.env.NODE_ENV === "production";
const basePath = "";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: isProd
      ? "https://videotogif.codelove.in"
      : "http://localhost:3000",
  },
};

export default nextConfig;
