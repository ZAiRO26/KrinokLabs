import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Static export for Netlify
  output: 'export',

  // Image optimization (unoptimized for static export)
  images: {
    unoptimized: true,
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

