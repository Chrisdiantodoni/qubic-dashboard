import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  removeConsole: process.env.NODE_ENV === "production" ? false : true,
};

export default nextConfig;
