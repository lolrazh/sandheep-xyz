/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: './dist',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Handle raw imports for markdown files
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    
    return config;
  },
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  }
}

export default nextConfig