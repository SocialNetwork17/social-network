import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "staging-it-incubator.s3.eu-central-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "inctagram.work",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
