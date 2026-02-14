import type { NextConfig } from 'next';

// Fix Turbopack "inferred workspace root" warnings when this repo lives inside
// a parent folder that also contains a lockfile.
const turbopackRoot = new URL('.', import.meta.url).pathname;

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
};

export default nextConfig;
