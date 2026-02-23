import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.25.36.24"],
  serverExternalPackages: ["tesseract.js"],
};

export default nextConfig;
