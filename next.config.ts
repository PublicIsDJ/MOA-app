import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'http://localhost:3000',
  ],

  // API 프록시 설정 (CORS 우회)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://49.50.131.100:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
