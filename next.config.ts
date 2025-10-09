import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	webpack: (config) => {
		config.externals.push("better-sqlite3");
		return config;
	},
};

export default nextConfig;
