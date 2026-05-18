/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  allowedDevOrigins: [
    '192.168.1.20',
    '192.168.1.20:3000',
    'localhost:3000',
    '0.0.0.0',
    '0.0.0.0:3000'
  ],
};

export default nextConfig;
