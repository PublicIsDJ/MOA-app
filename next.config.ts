import type { NextConfig } from "next";

// API 서버 URL 
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
  ],

  // API 프록시 설정 (CORS 우회)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
