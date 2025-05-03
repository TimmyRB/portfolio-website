import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.ctfassets.net", // Contentful Images
      },
      {
        hostname: "api.microlink.io", // Microlink URL Preview
      }
    ],
  },
};

export default nextConfig;
