import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',        // ✅ generate static HTML for all pages
  trailingSlash: true,     // optional, helps with static routing
};

export default nextConfig;
