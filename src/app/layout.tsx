import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Karvion Labs | AI Automation, SQA & High-Performance Web Development",
	description:
		"Karvion Labs engineers autonomous AI workflows, enterprise Next.js web applications, and bulletproof End-to-End test automation frameworks. Founded by Abdullah Karif Shahjada.",
	keywords: [
		"AI Automation",
		"OpenClaw",
		"Autonomous Agents",
		"Software Quality Assurance",
		"Playwright",
		"Test Automation",
		"Next.js 16",
		"Tailwind CSS",
		"Full-Stack Development",
		"Karvion Labs",
		"Abdullah Karif Shahjada",
	],
	authors: [
		{
			name: "Abdullah Karif Shahjada",
			url: "https://github.com/abdullahshahjada12-sudo",
		},
	],
	creator: "Abdullah Karif Shahjada",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://karvionlabs.com",
		title: "Karvion Labs | Innovative Software & AI Automation",
		description:
			"Building the Future, Smartly. Autonomous AI agents, enterprise test suites, and modern Next.js web platforms.",
		siteName: "Karvion Labs",
	},
	twitter: {
		card: "summary_large_image",
		title: "Karvion Labs | AI Automation & SQA Frameworks",
		description:
			"Autonomous AI workflows and bulletproof test automation engineered by Abdullah Karif Shahjada.",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`dark ${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
		>
			<body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
