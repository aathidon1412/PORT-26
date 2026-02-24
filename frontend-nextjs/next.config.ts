import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.25.36.24"],
  // Tesseract.js must stay in the Node.js bundle (not be inlined by webpack)
  serverExternalPackages: ["tesseract.js"],
  // Bundle eng.traineddata into the verify-payment serverless function so it
  // is available on Vercel's read-only filesystem via process.cwd().
  experimental: {
    outputFileTracingIncludes: {
      '/api/verify-payment': ['./eng.traineddata'],
    },
  },
};

export default nextConfig;
