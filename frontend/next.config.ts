import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  eslint: {
    ignoreDuringBuilds: true,
  },
  
  async headers() {
    return [
        {
            source: '/:path*', // Match all routes
            headers: [
                { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
                { key: 'Pragma', value: 'no-cache' },
                { key: 'Expires', value: '0' },
            ],
        },
    ];
},
};

export default nextConfig;
