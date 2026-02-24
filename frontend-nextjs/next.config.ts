import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.25.36.24"],
  // Tesseract.js must stay in the Node.js bundle (not be inlined by webpack)
  serverExternalPackages: ["tesseract.js"],
};

export default nextConfig;
