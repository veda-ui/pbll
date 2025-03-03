/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        bodySizeLimit: "10mb", // Increase body size limit
      },
    },
  };
  
  module.exports = nextConfig;
  