/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["libsql"],
  },
  transpilePackages: ["ui"],
};

module.exports = nextConfig
