/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', '@headlessui/react'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: false,
  compress: true,
  generateEtags: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  distDir: '.next',
  cleanDistDir: true,
  images: {
    disableStaticImages: true,
  },
  optimizeFonts: false,
  productionBrowserSourceMaps: false
}

module.exports = nextConfig
