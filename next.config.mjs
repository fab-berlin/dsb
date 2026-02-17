/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'light.dsbcontrol.de',
      },
    ],
    minimumCacheTTL: 86400, // Sekunden - Standard ist 60
  },
};

export default nextConfig;
