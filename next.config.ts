import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ✅ disables the optimization API
  },
};

export default nextConfig;
