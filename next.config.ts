import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**", // Allow all paths under flagcdn.com
      },
    ],
  },
};

export default nextConfig;
