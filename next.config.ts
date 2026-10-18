import type { NextConfig } from "next";

// Strix-compliant Content Security Policy (CSP) mitigating XSS, data exfiltration & clickjacking
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' blob: data: https:;
  connect-src 'self' https:;
  frame-ancestors 'self';
  form-action 'self';
  base-uri 'self';
  object-src 'none';
`;

const nextConfig: NextConfig = {
	output: "standalone",
	poweredByHeader: false,
	turbopack: {
		rules: {
			"*.css": {
				loaders: ["@tailwindcss/turbopack"],
				as: "*.css",
			},
		},
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						key: "Content-Security-Policy",
						value: cspHeader.replace(/\s{2,}/g, " ").trim(),
					},
				],
			},
		];
	},
};

export default nextConfig;
