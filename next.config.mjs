import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: []
  },
  webpack(config) {
    // 'import.meta.url'을 사용하여 경로를 처리
    const dirPath = new URL('.', import.meta.url).pathname;
    config.resolve.alias['@'] = path.join(dirPath, 'src');
    return config;
  },
};

export default nextConfig;
