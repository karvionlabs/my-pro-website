import type { Metadata } from "next";
import {
	Hind_Siliguri,
	JetBrains_Mono,
	Plus_Jakarta_Sans,
} from "next/font/google";
import { CommandMenu } from "@/components/layout/command-menu";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/context/language-context";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
	variable: "--font-sans",
	subsets: ["latin"],
	display: "swap",
});

const fontMono = JetBrains_Mono({
	variable: "--font-mono",
	subsets: ["latin"],
	display: "swap",
});

const fontBangla = Hind_Siliguri({
	variable: "--font-bangla",
	subsets: ["bengali"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
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

const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Organization",
			"@id": "https://karvionlabs.com/#organization",
			name: "Karvion Labs",
			url: "https://karvionlabs.com",
			sameAs: [
				"https://github.com/abdullahshahjada12-sudo",
				"https://facebook.com/karvionlabs",
				"https://youtube.com/@karvionlabs",
				"https://linkedin.com/in/abdullahkarif",
			],
			founder: {
				"@type": "Person",
				"@id": "https://karvionlabs.com/#founder",
				name: "Abdullah Karif Shahjada",
				jobTitle: "Founder & Principal Automation Engineer",
				email: "Abdullahshahjada12@gmail.com",
				sameAs: [
					"https://github.com/abdullahshahjada12-sudo",
					"https://linkedin.com/in/abdullahkarif",
				],
			},
			address: {
				"@type": "PostalAddress",
				addressLocality: "Chattogram & Dhaka",
				addressCountry: "BD",
			},
			description:
				"Karvion Labs engineers autonomous AI workflows, enterprise Next.js web applications, and bulletproof End-to-End test automation frameworks.",
		},
		{
			"@type": "WebSite",
			"@id": "https://karvionlabs.com/#website",
			url: "https://karvionlabs.com",
			name: "Karvion Labs",
			publisher: {
				"@id": "https://karvionlabs.com/#organization",
			},
		},
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`dark ${fontSans.variable} ${fontMono.variable} ${fontBangla.variable} scroll-smooth antialiased`}
			suppressHydrationWarning
		>
			<head>
				<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
			</head>
			<body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<LanguageProvider>
						<SmoothScroll />
						<CommandMenu />
						{/* Architectural Grid & Ambient Vignette */}
						<div
							className="fixed inset-0 bg-grid-pattern pointer-events-none -z-10"
							aria-hidden="true"
						/>
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
						<Toaster position="bottom-right" richColors />
					</LanguageProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
