/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "eloquentjavascript.net",
      "mjavascript.com",
      "d2sofvawe08yqg.cloudfront.net",
      "exploringjs.com",
      "m.media-amazon.com",
      "github.com",
      "git-scm.com",
      "media.springernature.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // Replace with your image host domain
        port: "", // You can leave this empty for the default port
        pathname: "/**", // Allow all paths
      },
    ],
  },
};

export default nextConfig;
