import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export สำหรับ Cloudflare Pages
  output: "export",
  distDir: "out",
  
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
