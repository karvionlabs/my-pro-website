"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "bn";

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	toggleLanguage: () => void;
	t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
	en: {
		// Navigation & Actions
		navServices: "Services",
		navProjects: "Projects",
		navTechStack: "Tech Stack",
		navTestimonials: "Testimonials",
		navContact: "Contact",
		getQuote: "Get a Quote",
		hireUs: "Hire Us",
		startProject: "Start a Project",
		availableQ4: "Available for Q4 Projects",
		scheduleCall: "Schedule Strategy Call",
		exploreCases: "Explore Case Studies",

		// Hero
		heroStatus: "Open for Q4 AI Automation & SQA Projects",
		heroTitle1: "Automating Complex Workflows.",
		heroTitle2: "Building Resilient Software.",
		heroSubtitle:
			"We engineer autonomous AI agents, enterprise Next.js web applications, and bulletproof automated test frameworks (SQA) to help companies scale seamlessly with zero manual bottlenecks.",
		heroHighlight1: "Autonomous Agents",
		heroHighlight2: "Next.js 16 Architecture",
		heroHighlight3: "Playwright E2E Testing",

		// Metrics
		metricWorkflows: "Automated Workflows",
		metricWorkflowsDesc: "Production bots & pipelines running daily",
		metricReliability: "System Reliability",
		metricReliabilityDesc: "Zero-downtime, fault-tolerant execution",
		metricSpeedup: "Process Speedup",
		metricSpeedupDesc: "Average throughput gain for client teams",
		metricOperations: "Continuous Operations",
		metricOperationsDesc: "Autonomous task scheduling & monitoring",

		// Services & Bento Grid
		servicesBadge: "Core Capabilities",
		servicesTitle: "Engineered to Automate, Accelerate & Scale",
		servicesSubtitle:
			"We bridge bleeding-edge AI models, robust Next.js web systems, and automated testing frameworks to turn complex technical challenges into streamlined business engines.",
		consultCapability: "Consult on this capability",
		bentoAiBadge: "Autonomous Execution",
		bentoAiLiveConsole: "Agent Prompt & Tool Chaining Pipeline",
		bentoWebBadge: "Sub-Second FCP",
		bentoWebScore: "100/100 Core Web Vitals",
		bentoSqaBadge: "CI/CD Pre-Merge Gate",
		bentoSqaGuarantee: "Zero Regression Guarantee",
		bentoGrowthBadge: "Automated Scaling",
		bentoGrowthMetric: "400% Content & Conversion Velocity",

		// Projects
		projectsBadge: "Proven Results",
		projectsTitle: "Featured Projects & Case Studies",
		projectsSubtitle:
			"Explore production systems engineered for measurable client impact, from multi-agent orchestrations to robust testing suites.",
		tabAll: "All Projects",
		tabAi: "AI Automation",
		tabWeb: "Web Applications",
		tabSqa: "Test Automation",
		viewCaseStudy: "View Architecture & Case Study",

		// Tech Stack
		techBadge: "Engineering Stack",
		techTitle: "Production Runtimes & Tech Matrix",
		techSubtitle:
			"We deliberately choose open-source, high-throughput technologies that eliminate technical debt, prevent regressions, and maximize speed.",

		// Testimonials
		testBadge: "Client Validation",
		testTitle: "Trusted by Engineering & Product Teams",
		testSubtitle:
			"Direct feedback from tech leaders and founders who automated their workflows and hardened their release pipelines with Karvion Labs.",

		// Contact
		contactBadge: "Get in Touch",
		contactTitle: "Start Your Next Engineering Leap",
		contactSubtitle:
			"Have a project in mind or need autonomous AI workflows for your team? Drop us a message and we'll evaluate feasibility within 24 hours.",
		directChannels: "Direct Channels",
		directDesc: "Connect directly with Founder & Principal Engineer",
		yourName: "Your Name *",
		emailAddress: "Email Address *",
		serviceFocus: "Service Focus",
		projectDetails: "Project Details / Goals *",
		submitInquiry: "Submit Project Inquiry",
		submitting: "Transmitting...",
		inquirySuccess: "Inquiry Transmitted Successfully",
		inquirySuccessDesc:
			"Thank you! Your message has been received. Abdullah Karif Shahjada will personally review your project scope and respond within 24 hours.",
		sendAnother: "Send Another Message",
		chatWhatsApp: "Chat Directly on WhatsApp",
	},
	bn: {
		// Navigation & Actions
		navServices: "সার্ভিসসমূহ",
		navProjects: "প্রজেক্টসমূহ",
		navTechStack: "টেক স্ট্যাক",
		navTestimonials: "গ্রাহক মতামত",
		navContact: "যোগাযোগ",
		getQuote: "প্রজেক্ট শুরু করুন",
		hireUs: "হায়ার করুন",
		startProject: "প্রজেক্ট বুকিং দিন",
		availableQ4: "কিউ৪ প্রজেক্টের জন্য উন্মুক্ত",
		scheduleCall: "স্ট্র্যাটেজি কল নির্ধারণ করুন",
		exploreCases: "কেস স্টাডি দেখুন",

		// Hero
		heroStatus: "কিউ৪ এআই অটোমেশন ও এসকিউএ প্রজেক্টের জন্য উন্মুক্ত",
		heroTitle1: "জটিল ওয়ার্কফ্লোর আধুনিক অটোমেশন।",
		heroTitle2: "নির্ভরযোগ্য ও নিরাপদ সফটওয়্যার।",
		heroSubtitle:
			"আমরা তৈরি করি স্বয়ংক্রিয় এআই এজেন্টস, আধুনিক নেক্সট.জেএস ওয়েব সিস্টেম এবং নির্ভুল অটোমেটেড টেস্টিং ফ্রেমওয়ার্ক (এসকিউএ)—যা আপনার ব্যবসায়ের পুনরাবৃত্তিমূলক কাজ কমিয়ে গতি বাড়ায় বহুগুণ।",
		heroHighlight1: "স্বয়ংক্রিয় এআই এজেন্টস",
		heroHighlight2: "নেক্সট.জেএস ১৬ আর্কিটেকচার",
		heroHighlight3: "প্লে-রাইট ই২ই টেস্টিং",

		// Metrics
		metricWorkflows: "সফল অটোমেশন পাইপলাইন",
		metricWorkflowsDesc: "দৈনন্দিন লাইভ বটস ও ওয়ার্কফ্লো",
		metricReliability: "সিস্টেম রিলায়াবিলিটি",
		metricReliabilityDesc: "জিরো-ডাউনটাইম ও সুরক্ষিত আর্কিটেকচার",
		metricSpeedup: "কাজের গতি বৃদ্ধি",
		metricSpeedupDesc: "ক্লায়েন্ট টিমের কাজের সময় সাশ্রয়",
		metricOperations: "নিরবচ্ছিন্ন কার্যক্রম",
		metricOperationsDesc: "২৪/৭ স্বয়ংক্রিয় মনিটরিং ও শিডিউলিং",

		// Services & Bento Grid
		servicesBadge: "মূল দক্ষতাসমূহ",
		servicesTitle: "অটোমেশন, গতি ও স্কেল নিশ্চিত করার প্রযুক্তি",
		servicesSubtitle:
			"আমরা অত্যাধুনিক এআই মডেল, শক্তিশালী নেক্সট.জেএস ফ্রেমওয়ার্ক এবং অটোমেটেড টেস্টিং সমন্বয় করে যেকোনো জটিল কাজকে স্বয়ংক্রিয় ব্যবসায়িক ইঞ্জিনে রূপান্তরিত করি।",
		consultCapability: "এই সার্ভিসের বিস্তারিত জানুন",
		bentoAiBadge: "স্বয়ংক্রিয় এক্সিকিউশন",
		bentoAiLiveConsole: "এজেন্ট প্রম্পট ও টুল পাইপলাইন",
		bentoWebBadge: "সাব-সেকেন্ড এফসিপি",
		bentoWebScore: "১০০/১০০ কোর ওয়েব ভাইটালস",
		bentoSqaBadge: "সিআই/সিডি প্রি-মার্জ গেট",
		bentoSqaGuarantee: "জিরো রিগ্রেশন নিশ্চয়তা",
		bentoGrowthBadge: "স্বয়ংক্রিয় স্কেলিং",
		bentoGrowthMetric: "৪০০% কনটেন্ট ও কনভার্শন গতি",

		// Projects
		projectsBadge: "বাস্তব ফলাফল",
		projectsTitle: "উল্লেখযোগ্য প্রজেক্ট ও কেস স্টাডিজ",
		projectsSubtitle:
			"মাল্টি-এজেন্ট অটোমেশন থেকে শুরু করে হাই-পারফরম্যান্স ওয়েব ও টেস্টিং আর্কিটেকচার—আমাদের সফল কাজসমূহ এক্সপ্লোর করুন।",
		tabAll: "সকল প্রজেক্ট",
		tabAi: "এআই অটোমেশন",
		tabWeb: "ওয়েব প্ল্যাটফর্ম",
		tabSqa: "টেস্ট অটোমেশন",
		viewCaseStudy: "আর্কিটেকচার ও কেস স্টাডি দেখুন",

		// Tech Stack
		techBadge: "প্রযুক্তি কাঠামো",
		techTitle: "প্রোডাকশন রানটাইমস ও টেক স্ট্যাক",
		techSubtitle:
			"আমরা আধুনিক ওপেন-সোর্স প্রযুক্তি ব্যবহার করি যা টেকনিক্যাল ডেট দূর করে, সিস্টেমের নির্ভরযোগ্যতা বাড়ায় এবং গতি নিশ্চিত করে।",

		// Testimonials
		testBadge: "গ্রাহক সন্তুষ্টি",
		testTitle: "ইঞ্জিনিয়ারিং ও প্রোডাক্ট লিডারদের আস্থা",
		testSubtitle:
			"কারভিয়ন ল্যাবসের সাথে ওয়ার্কফ্লো অটোমেট করা এবং টেস্টিং পাইপলাইন নিরাপদ করা উদ্যোক্তাদের সরাসরি রিভিউ।",

		// Contact
		contactBadge: "যোগাযোগ করুন",
		contactTitle: "আপনার পরবর্তী প্রজেক্টের সূচনা করুন",
		contactSubtitle:
			"আপনার ব্যবসায়ে এআই অটোমেশন প্রয়োজন অথবা হাই-পারফরম্যান্স ওয়েবসাইট ও টেস্টিং প্রয়োজন? আমাদের জানান, আমরা ২৪ ঘণ্টার মধ্যে মূল্যায়ন জানাব।",
		directChannels: "সরাসরি যোগাযোগের মাধ্যম",
		directDesc: "প্রতিষ্ঠাতা ও প্রিন্সিপাল অটোমেশন ইঞ্জিনিয়ারের সাথে সরাসরি কথা বলুন",
		yourName: "আপনার নাম *",
		emailAddress: "ইমেইল অ্যাড্রেস *",
		serviceFocus: "সার্ভিসের ধরন",
		projectDetails: "প্রজেক্টের বিবরণ / লক্ষ্য *",
		submitInquiry: "প্রজেক্ট রিকোয়েস্ট পাঠান",
		submitting: "পাঠানো হচ্ছে...",
		inquirySuccess: "রিকোয়েস্ট সফলভাবে জমা হয়েছে",
		inquirySuccessDesc:
			"ধন্যবাদ! আপনার বার্তা আমরা পেয়েছি। আব্দুল্লাহ কারিফ শাহজাদা ব্যক্তিগতভাবে আপনার বিবরণ দেখে ২৪ ঘণ্টার মধ্যে যোগাযোগ করবেন।",
		sendAnother: "আরেকটি বার্তা পাঠান",
		chatWhatsApp: "হোয়াটসঅ্যাপে সরাসরি চ্যাট করুন",
	},
};

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<Language>("en");

	useEffect(() => {
		const saved = localStorage.getItem("karvion_lang") as Language;
		if (saved === "en" || saved === "bn") {
			setLanguage(saved);
			document.documentElement.lang = saved;
		}
	}, []);

	const handleSetLanguage = (lang: Language) => {
		setLanguage(lang);
		localStorage.setItem("karvion_lang", lang);
		document.documentElement.lang = lang;
	};

	const toggleLanguage = () => {
		const next = language === "en" ? "bn" : "en";
		handleSetLanguage(next);
	};

	const t = (key: string): string => {
		return translations[language][key] || translations.en[key] || key;
	};

	return (
		<LanguageContext.Provider
			value={{
				language,
				setLanguage: handleSetLanguage,
				toggleLanguage,
				t,
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}
