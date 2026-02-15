import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eyeamworld.com",
        pathname: "/cdn/shop/**",
      },
    ],
  },
};

export default nextConfig;
