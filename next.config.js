
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { hostname: "utfs.io", pathname: "/**" },
      { hostname: "sneakerbardetroit.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn-images.farfetch-contents.com", pathname: "/**" },
      { hostname: "**", pathname: "/**" },
    ],
  },
};

export default nextConfig;
