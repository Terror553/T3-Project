/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    domains: ["crafatar.com", "mc-heads.net", "10.8.0.4", "cravatar.eu", "test.waleed-bakri.com", "waleed-bakri.com", "cdn.waleed-bakri.com"],
  },
  allowedDevOrigins: ["http://localhost:3000", "localhost", "crafatar.com", "10.8.0.4", "cravatar.eu", "cdn.waleed-bakri.com", "waleed-bakri.com", "10.8.0.1", "https://cdn.waleed-bakri.com"],
  distDir: "build",
  pageExtensions: ["tsx", "ts"],
};

export default config;
