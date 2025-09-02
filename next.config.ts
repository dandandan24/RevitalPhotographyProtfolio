import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const BASE_PATH = isProd ? '/RevitalPhotographyProtfolio' : '';

const nextConfig: NextConfig = {
  output: isProd ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: isProd,
  },
  basePath: BASE_PATH,
  assetPrefix: isProd ? `${BASE_PATH}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
};

export default nextConfig;
