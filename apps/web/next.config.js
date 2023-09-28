/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["libsql"],
  },
  transpilePackages: ["@paperknife/database"],
};

module.exports = nextConfig
