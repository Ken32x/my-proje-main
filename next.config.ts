import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",           // /api/* gelen istekleri
        destination: "http://localhost:3001/api/:path*", // backend'e yönlendir
      },
      {
        source: "/uploads/:path*",       // /uploads/* görselleri de yönlendir
        destination: "http://localhost:3001/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
