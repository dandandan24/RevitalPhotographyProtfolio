import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGhPages = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'gh-pages';
const BASE_PATH = isGhPages ? '/RevitalPhotographyProtfolio' : '';

const nextConfig: NextConfig = {
  // Only export for GitHub Pages; use server mode on Vercel/local
  output: isGhPages ? 'export' : undefined,
  trailingSlash: true,
  images: {
    // Disable optimizer only on GitHub Pages static export
    unoptimized: isGhPages,
  },
  // Prefix paths only on GitHub Pages
  basePath: isGhPages ? BASE_PATH : undefined,
  assetPrefix: isGhPages ? `${BASE_PATH}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
