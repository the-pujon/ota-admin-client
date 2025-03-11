// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ['res.cloudinary.com'],
//     },
//   };
  
//   export default nextConfig;
  /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || {};
      config.externals['window'] = 'window';
    }
    return config;
  },
  
};

export default nextConfig;
