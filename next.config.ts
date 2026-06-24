const nextConfig = {
  transpilePackages: ['react-notion-x'],
  async rewrites() {
    return [
      {
        source: '/:id([0-9a-f]{32})',
        destination: '/projects/:id',
      },
    ];
  },
};

export default nextConfig;