import bundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'front.bishalpantha.com.np',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'back.bishalpantha.com.np',
        pathname: '/**',
      },
    ],
  },
};

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

export default withBundleAnalyzer(nextConfig);
