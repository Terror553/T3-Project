/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  allowedDevOrigins: ["http://localhost:3000", "localhost", "192.168.178.35"],
  output: "standalone",
  distDir: "build",
  pageExtensions: ["tsx", "ts"],
};

export default config;
