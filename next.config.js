/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { hostname: "utfs.io" },
      {
        protocol: "https",
        hostname: "sneakerbardetroit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images.farfetch-contents.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
