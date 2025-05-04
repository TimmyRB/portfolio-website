import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net", // Contentful Images
        protocol: "https",
        pathname: `/${process.env.CONTENTFUL_SPACE_ID}/**`,
      },
      {
        hostname: "api.microlink.io", // Microlink URL Preview
        protocol: "https",
      }
    ],
    formats: ["image/avif", "image/webp"]
  },
};

export default nextConfig;
