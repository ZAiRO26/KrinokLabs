import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['gsap', 'three', '@react-three/fiber', '@react-three/drei', 'framer-motion'],
  },
};

export default nextConfig;
