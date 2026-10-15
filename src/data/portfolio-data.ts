export interface ServiceItem {
	id: string;
	title: string;
	slug: string;
	description: string;
	icon: string;
	tags: string[];
	features: string[];
	badge?: string;
}

export interface ProjectItem {
	id: string;
	title: string;
	category: "all" | "ai" | "web" | "sqa";
	categoryLabel: string;
	tagline: string;
	description: string;
	impact: string;
	metrics: { label: string; value: string }[];
	techStack: string[];
	featured: boolean;
	liveUrl?: string;
	githubUrl?: string;
}

export interface TestimonialItem {
	id: string;
	quote: string;
	name: string;
	role: string;
	company: string;
	avatar: string;
	rating: number;
}

export interface TechStackCategory {
	category: string;
	technologies: {
		name: string;
		description: string;
		proficiency: string;
		iconName: string;
	}[];
}

export interface StatMetric {
	value: string;
	label: string;
	description: string;
}

export const BRAND_DATA = {
	name: "Karvion Labs",
	tagline: "Innovative Software & AI Automation",
	slogan: "Building the Future, Smartly",
	founder: "Abdullah Karif Shahjada",
	founderRole: "Founder & Principal Automation Engineer",
	email: "Abdullahshahjada12@gmail.com",
	status: "Available for Q4 Enterprise Projects",
	location: "Chattogram & Dhaka, Bangladesh (Remote Globally)",
	socials: {
		github: "https://github.com/abdullahshahjada12-sudo",
		facebook: "https://facebook.com/karvionlabs",
		youtube: "https://youtube.com/@karvionlabs",
		linkedin: "https://linkedin.com/in/abdullahkarif",
	},
};

export const STAT_METRICS: StatMetric[] = [
	{
		value: "100+",
		label: "Automated Workflows",
		description: "Production bots & pipelines running daily",
	},
	{
		value: "99.8%",
		label: "System Reliability",
		description: "Zero-downtime, fault-tolerant execution",
	},
	{
		value: "10x",
		label: "Process Speedup",
		description: "Average throughput gain for client teams",
	},
	{
		value: "24/7",
		label: "Continuous Operations",
		description: "Autonomous task scheduling & monitoring",
	},
];

export const SERVICES_DATA: ServiceItem[] = [
	{
		id: "ai-automation",
		title: "AI Workflows & Autonomous Agents",
		slug: "ai-automation",
		description:
			"Custom multi-step AI agents and background workers powered by OpenClaw, Gemini, and modern LLM orchestration to eliminate repetitive manual operations.",
		icon: "Bot",
		badge: "Most Popular",
		tags: ["OpenClaw", "Autonomous Agents", "Workflow Automation", "LLM APIs"],
		features: [
			"Autonomous data pipelines & synchronization",
			"CRM and multi-platform automation bridges",
			"Custom prompt chaining & tool-calling agents",
			"Self-healing error handlers & alerting",
		],
	},
	{
		id: "fullstack-web",
		title: "High-Performance Full-Stack Web Apps",
		slug: "fullstack-web",
		description:
			"Enterprise web applications engineered with Next.js 16 App Router, Turbopack, Tailwind CSS v4, and modular Shadcn UI components.",
		icon: "Layout",
		badge: "Next.js 16 Ready",
		tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Shadcn UI"],
		features: [
			"Sub-second First Contentful Paint (FCP) and 100/100 Core Web Vitals",
			"Server Components architecture with zero client bloat",
			"Responsive glassmorphism UI & micro-interactions",
			"Robust API integrations and type-safe schemas",
		],
	},
	{
		id: "sqa-automation",
		title: "End-to-End Test Automation (SQA)",
		slug: "sqa-automation",
		description:
			"Bulletproof Software Quality Assurance frameworks using Playwright and Selenium to guarantee zero regression and rapid release cycles.",
		icon: "ShieldCheck",
		badge: "Enterprise Grade",
		tags: ["Playwright", "Selenium", "CI/CD Gates", "Regression Testing"],
		features: [
			"Multi-browser automated regression suites",
			"Parallel test execution with detailed visual reporting",
			"API contract testing & automated mock verification",
			"GitHub Actions pre-merge testing gates",
		],
	},
	{
		id: "growth-marketing",
		title: "AI Digital Strategy & Growth Systems",
		slug: "growth-marketing",
		description:
			"Conversion rate optimization and AI-augmented campaign automation designed to scale customer acquisition and retention effortlessly.",
		icon: "TrendingUp",
		tags: [
			"Meta Ads",
			"Conversion Rate Optimization",
			"Analytics",
			"Automation",
		],
		features: [
			"Automated ad performance tracking & anomaly detection",
			"Interactive high-converting landing pages",
			"Data-driven A/B testing frameworks",
			"Customer lifecycle automation pipelines",
		],
	},
];

export const PROJECTS_DATA: ProjectItem[] = [
	{
		id: "proj-1",
		title: "Autonomous Multi-Agent CRM Sync",
		category: "ai",
		categoryLabel: "AI Automation",
		tagline: "Enterprise workflow automation platform saving 40+ hours weekly",
		description:
			"Engineered an autonomous agent system that monitors inbound leads, extracts structured metadata, enriches company profiles, and orchestrates cross-platform updates in real-time.",
		impact:
			"Cut lead response time from 4 hours to 12 seconds with 99.9% accuracy.",
		metrics: [
			{ label: "Hours Saved", value: "40+/wk" },
			{ label: "Response Latency", value: "<15s" },
			{ label: "Accuracy", value: "99.9%" },
		],
		techStack: [
			"OpenClaw",
			"Gemini 3 Flash",
			"TypeScript",
			"Node.js",
			"Webhooks",
		],
		featured: true,
		githubUrl: "https://github.com/abdullahshahjada12-sudo/my-pro-website",
	},
	{
		id: "proj-2",
		title: "Enterprise SQA Playwright Framework",
		category: "sqa",
		categoryLabel: "Test Automation",
		tagline: "Continuous test execution engine across multi-browser matrix",
		description:
			"Designed and deployed a scalable automated test architecture covering 250+ critical user journeys, integrated directly into GitHub Actions with automated video artifacts.",
		impact: "Reduced release QA testing cycle from 3 days to 18 minutes.",
		metrics: [
			{ label: "Test Coverage", value: "250+ E2E" },
			{ label: "Execution Time", value: "18 mins" },
			{ label: "Zero Regression", value: "100%" },
		],
		techStack: [
			"Playwright",
			"TypeScript",
			"Docker",
			"GitHub Actions",
			"Allure",
		],
		featured: true,
		githubUrl: "https://github.com/abdullahshahjada12-sudo/my-pro-website",
	},
	{
		id: "proj-3",
		title: "Karvion Labs Agency Web Platform",
		category: "web",
		categoryLabel: "Web Applications",
		tagline: "Ultra-fast Next.js 16 showcase with Spec-Kit governance",
		description:
			"Created a modern, responsive website utilizing Turbopack, Tailwind CSS v4, Shadcn UI primitives, and strict Biome linting with zero client-side hydration penalty.",
		impact:
			"Achieved 100/100 Lighthouse performance and sub-second load times.",
		metrics: [
			{ label: "Lighthouse Score", value: "100/100" },
			{ label: "Bundle Size", value: "<85KB" },
			{ label: "Build Time", value: "255ms" },
		],
		techStack: [
			"Next.js 16",
			"Tailwind CSS v4",
			"Shadcn UI",
			"Biome",
			"Turbopack",
		],
		featured: true,
		liveUrl: "https://github.com/abdullahshahjada12-sudo/my-pro-website",
		githubUrl: "https://github.com/abdullahshahjada12-sudo/my-pro-website",
	},
	{
		id: "proj-4",
		title: "Automated Video Pipeline & Asset Generator",
		category: "ai",
		categoryLabel: "AI Automation",
		tagline: "Automated multimedia content production for digital channels",
		description:
			"Built an end-to-end automation tool that programmatically renders educational animations, converts transcripts into subtitles, and prepares optimized cross-channel media assets.",
		impact: "Scaled weekly content output by 400% without adding headcount.",
		metrics: [
			{ label: "Output Gain", value: "+400%" },
			{ label: "Render Pipeline", value: "Fully Automated" },
			{ label: "Resolution", value: "4K 60fps" },
		],
		techStack: [
			"Python",
			"FFmpeg",
			"Node.js",
			"Gemini API",
			"Automation Shell",
		],
		featured: false,
		githubUrl: "https://github.com/abdullahshahjada12-sudo/my-pro-website",
	},
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
	{
		id: "test-1",
		quote:
			"Abdullah completely transformed our daily operations. The AI automation workflows he engineered eliminated dozens of hours of manual copy-pasting and errors. His attention to detail is phenomenal.",
		name: "Farhan Ahmed",
		role: "Operations Director",
		company: "SaaS ScaleTech",
		avatar: "/avatars/client1.png",
		rating: 5,
	},
	{
		id: "test-2",
		quote:
			"The Playwright automated testing framework designed by Karvion Labs enabled our dev team to ship daily without fearing regressions. Flawless execution and pristine code quality.",
		name: "Tariqul Islam",
		role: "Lead Software Architect",
		company: "Nexus FinTech",
		avatar: "/avatars/client2.png",
		rating: 5,
	},
	{
		id: "test-3",
		quote:
			"Working with Abdullah was a breath of fresh air. Fast turnaround, crystal-clear communication, and an obsession with clean code and modern Next.js best practices.",
		name: "Sarah Jenkins",
		role: "Product Founder",
		company: "OmniGrowth Labs",
		avatar: "/avatars/client3.png",
		rating: 5,
	},
];

export const TECH_STACK_CATEGORIES: TechStackCategory[] = [
	{
		category: "AI & Automation Runtimes",
		technologies: [
			{
				name: "OpenClaw",
				description: "Autonomous agent execution gateway & tool-routing bridge",
				proficiency: "Advanced",
				iconName: "Cpu",
			},
			{
				name: "Gemini 3 Flash",
				description:
					"Ultra-fast low-latency multi-turn reasoning and agent turns",
				proficiency: "Advanced",
				iconName: "Sparkles",
			},
			{
				name: "Python Automation",
				description: "Data scraping, pipeline scripting, and API workers",
				proficiency: "Expert",
				iconName: "Terminal",
			},
		],
	},
	{
		category: "Web & UI Architecture",
		technologies: [
			{
				name: "Next.js 16",
				description: "Turbopack-powered App Router with Server Components",
				proficiency: "Expert",
				iconName: "Globe",
			},
			{
				name: "TypeScript",
				description: "Strict compile-time type safety and interface modeling",
				proficiency: "Expert",
				iconName: "Code",
			},
			{
				name: "Tailwind CSS v4",
				description:
					"Next-gen atomic CSS engine with OKLCH dynamic color scales",
				proficiency: "Expert",
				iconName: "Palette",
			},
			{
				name: "Shadcn UI",
				description: "Accessible, zero-lock-in modular design primitives",
				proficiency: "Expert",
				iconName: "Layers",
			},
		],
	},
	{
		category: "Testing & DevOps",
		technologies: [
			{
				name: "Playwright",
				description: "Headless cross-browser End-to-End automation framework",
				proficiency: "Expert",
				iconName: "Shield",
			},
			{
				name: "Biome",
				description: "Sub-millisecond Rust-powered linting and code formatting",
				proficiency: "Advanced",
				iconName: "CheckCircle",
			},
			{
				name: "GitHub Actions",
				description: "Automated CI/CD validation and release pipelines",
				proficiency: "Advanced",
				iconName: "GitBranch",
			},
			{
				name: "Docker",
				description:
					"Containerized, reproducible environments and deployment cells",
				proficiency: "Intermediate",
				iconName: "Box",
			},
		],
	},
];

export const NAV_LINKS = [
	{ name: "Services", href: "#services" },
	{ name: "Projects", href: "#projects" },
	{ name: "Tech Stack", href: "#tech-stack" },
	{ name: "Testimonials", href: "#testimonials" },
	{ name: "Contact", href: "#contact" },
];
