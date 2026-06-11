/** @type {import('next').NextConfig} */
const nextConfig = {
    // Emit a minimal standalone server bundle for small production Docker images.
    output: "standalone",
    images: {
    domains: ['lh3.googleusercontent.com','avatars.githubusercontent.com'],
  },
};

export default nextConfig;
