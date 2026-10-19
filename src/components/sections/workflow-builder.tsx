"use client";

import NumberFlow from "@number-flow/react";
import {
	Activity,
	ArrowRight,
	Bot,
	CheckCircle2,
	Database,
	Layers,
	Loader2,
	Play,
	Save,
	Send,
	ShieldCheck,
	Terminal,
	Video,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/language-context";

interface WorkflowStep {
	id: string;
	titleEn: string;
	titleBn: string;
	descEn: string;
	descBn: string;
	icon: typeof Bot;
	badge: string;
}

interface WorkflowPreset {
	id: string;
	titleEn: string;
	titleBn: string;
	category: string;
	baseAutomationRate: number;
	baseLatency: number;
	baseSavings: number;
	steps: WorkflowStep[];
}

const WORKFLOW_PRESETS: WorkflowPreset[] = [
	{
		id: "lead-qualification",
		titleEn: "Autonomous Inbound Lead Qualification & WhatsApp Dispatch",
		titleBn: "অটোনোমাস ইনবাউন্ড লিড যাচাইকরণ ও হোয়াটসঅ্যাপ নোটিফিকেশন",
		category: "Enterprise AI Automation",
		baseAutomationRate: 98,
		baseLatency: 380,
		baseSavings: 1450,
		steps: [
			{
				id: "step-1",
				titleEn: "Webhook Ingestion & Payload Bounds",
				titleBn: "ওয়েবহুক ইনজেশন ও পেলোড বাউন্ডস",
				descEn:
					"Captures lead inputs from Typeform/Calendly with strict rate limiting.",
				descBn: "টাইপফর্ম বা ক্যালেন্ডলি থেকে সিকিউর রেট লিমিটসহ লিড গ্রহণ।",
				icon: Zap,
				badge: "Ingestion",
			},
			{
				id: "step-2",
				titleEn: "Gemini 3 Flash Intent & Budget Scoring",
				titleBn: "জেমিনি এআই দিয়ে ইন্টেন্ট ও বাজেট স্ক্যানিং",
				descEn:
					"Extracts client urgency, budget tiers, and technology match score.",
				descBn: "ক্লায়েন্টের কাজের ধরণ, বাজেট এবং প্রয়োজনীয়তা এআই দ্বারা যাচাই।",
				icon: Bot,
				badge: "AI Reasoning",
			},
			{
				id: "step-3",
				titleEn: "Drizzle ORM Lead Persistence",
				titleBn: "ড্রজল ওআরএম দিয়ে ডেটাবেস সংরক্ষণ",
				descEn:
					"Stores structured lead records and deduplicates in SQLite table.",
				descBn: "SQLite ডেটাবেসে লিডটি সংরক্ষিত ও ডুপ্লিকেট চেকিং সম্পন্ন হয়।",
				icon: Database,
				badge: "Storage",
			},
			{
				id: "step-4",
				titleEn: "Instant WhatsApp & Priority Escalation",
				titleBn: "তাৎক্ষণিক হোয়াটসঅ্যাপ অ্যালার্ট ও নোটিফিকেশন",
				descEn:
					"Dispatches instant hot lead summary to founder's WhatsApp channel.",
				descBn: "ফাউন্ডারের হোয়াটসঅ্যাপে বিস্তারিত লিড কার্ড স্বয়ংক্রিয়ভাবে পাঠানো হয়।",
				icon: Send,
				badge: "Dispatch",
			},
		],
	},
	{
		id: "sqa-regression",
		titleEn: "Playwright Headless CI/CD & Visual Regression AI Gate",
		titleBn: "প্লে-রাইট হেডলেস সিআই/সিডি ও ভিজ্যুয়াল রিগ্রেশন গেট",
		category: "Software Quality Assurance",
		baseAutomationRate: 99,
		baseLatency: 640,
		baseSavings: 2200,
		steps: [
			{
				id: "step-1",
				titleEn: "GitHub PR Diff Detection",
				titleBn: "গিটহাব পিআর চেঞ্জ ডিটেকশন",
				descEn:
					"Triggers scoped test suites based on modified component paths.",
				descBn: "পিআরে কোড পরিবর্তনের ওপর ভিত্তি করে টেস্ট স্যুট ট্রিগার।",
				icon: Layers,
				badge: "Trigger",
			},
			{
				id: "step-2",
				titleEn: "Multi-Viewport Matrix Execution",
				titleBn: "মাল্টি-ভিউস্পেস মেট্রিক্স টেস্ট",
				descEn:
					"Runs Chromium, Firefox, and WebKit cross-browser tests simultaneously.",
				descBn: "ক্রোমিয়াম, ফায়ারফক্স ও ওয়েবকিট ব্রাউজারে প্যারালাল টেস্ট রান।",
				icon: ShieldCheck,
				badge: "E2E Testing",
			},
			{
				id: "step-3",
				titleEn: "Visual Pixel Difference AI Analysis",
				titleBn: "ভিজ্যুয়াল পিক্সেল ডিফারেন্স এআই অ্যানালাইসিস",
				descEn:
					"Flags UI layout shifts and contrast anomalies with sub-pixel precision.",
				descBn: "ইউআই লেআউট শিফট এবং ভিজ্যুয়াল বাগ স্বয়ংক্রিয়ভাবে শনাক্ত।",
				icon: Bot,
				badge: "Visual AI",
			},
			{
				id: "step-4",
				titleEn: "SARIF Audit & Auto-Merge Signoff",
				titleBn: "সারিফ অডিট ও অটো-মার্জ ভেরিফিকেশন",
				descEn:
					"Uploads report to GitHub Security and posts detailed test commentary.",
				descBn: "গিটহাব সিকিউরিটি স্ক্যানে রিপোর্ট আপলোড ও রেজাল্ট পোস্টিং।",
				icon: CheckCircle2,
				badge: "Gatekeeper",
			},
		],
	},
	{
		id: "media-production",
		titleEn: "Autonomous Cartoon Video & Multi-Format Repurposing",
		titleBn: "অটোনোমাস কার্টুন ভিডিও ও মাল্টি-ফরম্যাট কনটেন্ট পাইপলাইন",
		category: "Karvion Media Engine",
		baseAutomationRate: 94,
		baseLatency: 520,
		baseSavings: 1800,
		steps: [
			{
				id: "step-1",
				titleEn: "Script & Moral Storyline Ingest",
				titleBn: "স্ক্রিপ্ট ও শিক্ষামূলক স্টোরিলাইন গ্রহণ",
				descEn: "Processes kid-friendly educational English cartoon scripts.",
				descBn: "শিশুদের ইংরেজি শিক্ষার উপযোগী ইসলামিক ও শিক্ষামূলক স্ক্রিপ্ট প্রসেসিং।",
				icon: Video,
				badge: "Ingestion",
			},
			{
				id: "step-2",
				titleEn: "Faster-Whisper Subtitle Alignment",
				titleBn: "হুইসপার এআই সাবটাইটেল অ্যালাইনমেন্ট",
				descEn:
					"Generates frame-accurate SRT subtitles and highlights key vocabulary.",
				descBn: "ভিডিওর প্রতিটি সংলাপের সাথে নির্ভুল ইংরেজি সাবটাইটেল তৈরি।",
				icon: Bot,
				badge: "Audio AI",
			},
			{
				id: "step-3",
				titleEn: "FFmpeg 9:16 Lossless Encoding",
				titleBn: "এফএফএমপেক দিয়ে দ্রুত এনকোডিং",
				descEn:
					"Losslessly converts horizontal clips into mobile Reels and Shorts.",
				descBn: "মোবাইল ও রিলস ফরম্যাটে কোয়ালিটি অক্ষুণ্ণ রেখে ফাস্ট রেন্ডারিং।",
				icon: Zap,
				badge: "FFmpeg",
			},
			{
				id: "step-4",
				titleEn: "Multi-Platform Social Staging",
				titleBn: "ফেসবুক ও ইউটিউব চ্যানেল স্টেজিং",
				descEn:
					"Prepares metadata, thumbnails, and schedule for Karvion channels.",
				descBn: "কারভিয়ন পেজ ও চ্যানেলের জন্য মেটাডেটা ও থাম্বনেইল সহ ড্রাফটিং।",
				icon: ArrowRight,
				badge: "Publishing",
			},
		],
	},
];

interface SimulationLog {
	timestamp: string;
	stepName: string;
	latency: number;
	status: string;
}

export function WorkflowBuilderSection() {
	const { language } = useLanguage();
	const [activePresetId, setActivePresetId] = useState<string>(
		WORKFLOW_PRESETS[0].id,
	);
	const [isSimulating, setIsSimulating] = useState(false);
	const [simulationLogs, setSimulationLogs] = useState<SimulationLog[]>([]);
	const [isSaving, setIsSaving] = useState(false);
	const [saveDialogOpen, setSaveDialogOpen] = useState(false);
	const [clientEmail, setClientEmail] = useState("");
	const [clientName, setClientName] = useState("");

	const currentPreset =
		WORKFLOW_PRESETS.find((p) => p.id === activePresetId) ||
		WORKFLOW_PRESETS[0];

	const triggerSimulation = async () => {
		setIsSimulating(true);
		setSimulationLogs([]);

		try {
			const res = await fetch("/api/workflow", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "simulate",
					presetId: currentPreset.id,
					title: currentPreset.titleEn,
					steps: currentPreset.steps.map((s) => s.titleEn),
					automationRate: currentPreset.baseAutomationRate,
					estimatedSavings: `$${currentPreset.baseSavings}/mo`,
				}),
			});

			const data = await res.json();
			if (data.success && data.executionTrace) {
				setSimulationLogs(
					data.executionTrace.map(
						(t: {
							timestamp: string;
							name: string;
							latencyMs: number;
							status: string;
						}) => ({
							timestamp: t.timestamp.split("T")[1].slice(0, 8),
							stepName: t.name,
							latency: t.latencyMs,
							status: t.status,
						}),
					),
				);
				toast.success(
					language === "en"
						? "Pipeline simulation succeeded! Zero bottlenecks detected."
						: "পাইপলাইন সিমুলেশন সফল হয়েছে! সব সিস্টেম সক্রিয়।",
				);
			} else {
				throw new Error(data.message || "Simulation failed");
			}
		} catch (_error) {
			toast.error(
				language === "en"
					? "Failed to complete simulation."
					: "সিমুলেশন সম্পন্ন করতে সমস্যা হয়েছে।",
			);
		} finally {
			setIsSimulating(false);
		}
	};

	const saveBlueprintToDb = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSaving(true);

		try {
			const res = await fetch("/api/workflow", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					action: "save",
					presetId: currentPreset.id,
					title: currentPreset.titleEn,
					steps: currentPreset.steps.map((s) => s.titleEn),
					automationRate: currentPreset.baseAutomationRate,
					estimatedSavings: `$${currentPreset.baseSavings}/mo`,
					savedBy: clientName || "Enterprise Client",
					email: clientEmail || undefined,
				}),
			});

			const data = await res.json();
			if (data.success) {
				toast.success(
					language === "en"
						? "Blueprint saved to Drizzle SQLite DB!"
						: "ব্লুপ্রিন্ট সফলভাবে ড্রজল ডেটাবেসে সংরক্ষিত হয়েছে!",
				);
				setSaveDialogOpen(false);
				setClientEmail("");
				setClientName("");
			} else {
				throw new Error(data.message || "Failed to save");
			}
		} catch (_error) {
			toast.error(
				language === "en"
					? "Error persisting to database."
					: "ডেটাবেসে সংরক্ষণ করতে সমস্যা হয়েছে।",
			);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<section
			id="workflow-builder"
			className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative"
		>
			{/* Section Header */}
			<div className="flex flex-col items-center text-center mb-16 space-y-4">
				<Badge
					variant="outline"
					className="px-3.5 py-1 text-xs border-white/10 bg-white/[0.02] text-neutral-300 font-mono tracking-wide"
				>
					<Layers className="size-3.5 mr-1.5 inline text-cyan-400" />
					{language === "en"
						? "INTERACTIVE ARCHITECTURE STUDIO"
						: "ইন্টারেক্টিভ আর্কিটেকচার স্টুডিও"}
				</Badge>
				<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground max-w-3xl">
					{language === "en" ? (
						<>
							Test Real Automation Pipelines.{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
								Zero Fluff.
							</span>
						</>
					) : (
						<>
							বাস্তব অটোমেশন পাইপলাইন পরীক্ষা করুন।{" "}
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
								কোনো বাহুল্য ছাড়াই।
							</span>
						</>
					)}
				</h2>
				<p className="text-sm sm:text-base text-muted-foreground max-w-2xl font-normal leading-relaxed">
					{language === "en"
						? "Select an enterprise blueprint below. Simulate end-to-end execution in real-time, inspect latency traces, and persist custom configurations directly into our zero-cost Drizzle ORM database."
						: "নিচে থেকে একটি এন্টারপ্রাইজ অটোমেশন ব্লুপ্রিন্ট নির্বাচন করুন। রিয়েল-টাইমে এক্সিকিউশন সিমুলেট করুন, ল্যাটেন্সি পর্যবেক্ষণ করুন এবং ড্রজল ওআরএম ডেটাবেসে কনফিগারেশন সংরক্ষণ করুন।"}
				</p>
			</div>

			{/* Studio Container */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
				{/* Left Column: Preset Switcher & Real Metrics */}
				<div className="lg:col-span-4 space-y-4">
					<div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
						{language === "en" ? "Enterprise Workflows" : "এন্টারপ্রাইজ ওয়ার্কফ্লোসমূহ"}
					</div>

					<div className="space-y-2">
						{WORKFLOW_PRESETS.map((preset) => {
							const isSelected = preset.id === activePresetId;
							return (
								<button
									key={preset.id}
									type="button"
									onClick={() => {
										setActivePresetId(preset.id);
										setSimulationLogs([]);
									}}
									className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
										isSelected
											? "border-cyan-500/50 bg-white/5 shadow-lg shadow-cyan-500/5 text-foreground"
											: "border-white/10 bg-neutral-900/40 hover:bg-neutral-900/70 text-muted-foreground hover:text-foreground"
									}`}
								>
									{isSelected && (
										<div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan-400" />
									)}
									<div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 mb-1">
										{preset.category}
									</div>
									<div className="text-sm font-semibold text-foreground line-clamp-2">
										{language === "en" ? preset.titleEn : preset.titleBn}
									</div>
								</button>
							);
						})}
					</div>

					{/* Live Numbers Bento Card */}
					<Card className="border-white/10 bg-neutral-900/60 backdrop-blur-md rounded-xl p-5 space-y-4">
						<div className="text-xs font-mono uppercase text-muted-foreground flex items-center justify-between">
							<span>
								{language === "en"
									? "Calculated System ROI"
									: "সিস্টেম রিটার্ন অন ইনভেস্টমেন্ট"}
							</span>
							<Activity className="size-3.5 text-cyan-400" />
						</div>

						<div className="grid grid-cols-3 gap-2 text-center pt-1">
							<div className="p-2 rounded-lg bg-white/5 border border-white/5">
								<div className="text-lg sm:text-xl font-bold font-mono text-cyan-400 flex items-center justify-center">
									<NumberFlow
										value={currentPreset.baseAutomationRate}
										suffix="%"
									/>
								</div>
								<div className="text-[10px] text-muted-foreground uppercase mt-0.5">
									{language === "en" ? "Autonomous" : "অটোমেশন"}
								</div>
							</div>

							<div className="p-2 rounded-lg bg-white/5 border border-white/5">
								<div className="text-lg sm:text-xl font-bold font-mono text-teal-300 flex items-center justify-center">
									<NumberFlow value={currentPreset.baseLatency} suffix="ms" />
								</div>
								<div className="text-[10px] text-muted-foreground uppercase mt-0.5">
									{language === "en" ? "Latency" : "গতি"}
								</div>
							</div>

							<div className="p-2 rounded-lg bg-white/5 border border-white/5">
								<div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 flex items-center justify-center">
									$
									<NumberFlow value={currentPreset.baseSavings} />
								</div>
								<div className="text-[10px] text-muted-foreground uppercase mt-0.5">
									{language === "en" ? "Mo. Saved" : "মাসিক সাশ্রয়"}
								</div>
							</div>
						</div>
					</Card>
				</div>

				{/* Right Column: Interactive Pipeline & Live Terminal */}
				<div className="lg:col-span-8 space-y-6">
					<Card className="border-white/10 bg-neutral-900/60 backdrop-blur-md rounded-2xl overflow-hidden">
						<CardHeader className="p-6 border-b border-white/10 bg-white/[0.02]">
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
								<div>
									<Badge
										variant="secondary"
										className="mb-1 text-[11px] font-mono uppercase bg-cyan-500/10 text-cyan-300 border-0"
									>
										{currentPreset.category}
									</Badge>
									<CardTitle className="text-lg sm:text-xl font-bold text-foreground">
										{language === "en"
											? currentPreset.titleEn
											: currentPreset.titleBn}
									</CardTitle>
								</div>

								{/* Control Actions */}
								<div className="flex items-center gap-2">
									<Button
										size="sm"
										onClick={triggerSimulation}
										disabled={isSimulating}
										className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs h-9 px-4 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5"
									>
										{isSimulating ? (
											<>
												<Loader2 className="size-3.5 animate-spin" />
												<span>
													{language === "en" ? "Simulating..." : "চলছে..."}
												</span>
											</>
										) : (
											<>
												<Play className="size-3.5 fill-current" />
												<span>
													{language === "en" ? "Run Test" : "টেস্ট রান"}
												</span>
											</>
										)}
									</Button>

									<Dialog
										open={saveDialogOpen}
										onOpenChange={setSaveDialogOpen}
									>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setSaveDialogOpen(true)}
											className="border-white/15 bg-white/5 hover:bg-white/10 text-xs text-foreground h-9 px-3 rounded-lg cursor-pointer"
										>
											<Save className="size-3.5 mr-1 text-muted-foreground" />
											<span>
												{language === "en" ? "Save Blueprint" : "সংরক্ষণ"}
											</span>
										</Button>
										<DialogContent className="border-white/15 bg-neutral-950 max-w-md p-6 rounded-2xl">
											<DialogHeader>
												<DialogTitle className="text-lg font-bold text-foreground">
													{language === "en"
														? "Save Automation Blueprint"
														: "অটোমেশন ব্লুপ্রিন্ট সংরক্ষণ"}
												</DialogTitle>
												<DialogDescription className="text-xs text-muted-foreground">
													{language === "en"
														? "This will commit the architecture directly into our zero-cost Drizzle ORM SQLite database for review."
														: "এই ব্লুপ্রিন্ট সরাসরি আমাদের ড্রজল ওআরএম SQLite ডেটাবেসে সংরক্ষিত হবে।"}
												</DialogDescription>
											</DialogHeader>

											<form
												onSubmit={saveBlueprintToDb}
												className="space-y-4 pt-2"
											>
												<div className="space-y-1.5">
													<label
														htmlFor="clientNameInput"
														className="text-xs text-muted-foreground font-medium"
													>
														{language === "en"
															? "Your Name / Organization"
															: "আপনার নাম বা প্রতিষ্ঠানের নাম"}
													</label>
													<Input
														id="clientNameInput"
														value={clientName}
														onChange={(e) => setClientName(e.target.value)}
														placeholder="Karvion Partner"
														className="h-9 text-xs bg-white/5 border-white/15"
													/>
												</div>

												<div className="space-y-1.5">
													<label
														htmlFor="clientEmailInput"
														className="text-xs text-muted-foreground font-medium"
													>
														{language === "en"
															? "Email Address (Optional)"
															: "ইমেইল ঠিকানা (ঐচ্ছিক)"}
													</label>
													<Input
														id="clientEmailInput"
														type="email"
														value={clientEmail}
														onChange={(e) => setClientEmail(e.target.value)}
														placeholder="partner@enterprise.com"
														className="h-9 text-xs bg-white/5 border-white/15"
													/>
												</div>

												<Button
													type="submit"
													disabled={isSaving}
													className="w-full h-9 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs rounded-lg mt-2 cursor-pointer"
												>
													{isSaving ? (
														<Loader2 className="size-4 animate-spin" />
													) : language === "en" ? (
														"Confirm & Persist to Drizzle DB"
													) : (
														"ডেটাবেসে সংরক্ষণ নিশ্চিত করুন"
													)}
												</Button>
											</form>
										</DialogContent>
									</Dialog>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-6 space-y-6">
							{/* Steps Visual Chain */}
							<div className="space-y-3">
								<div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
									{language === "en"
										? "Execution Pipeline Nodes"
										: "এক্সিকিউশন পাইপলাইন নোডসমূহ"}
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{currentPreset.steps.map((step, idx) => {
										const Icon = step.icon;
										return (
											<div
												key={step.id}
												className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-3 relative group hover:border-white/20 transition-all"
											>
												<div className="size-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
													<Icon className="size-4 text-cyan-400" />
												</div>
												<div className="min-w-0 flex-1">
													<div className="flex items-center justify-between gap-2 mb-1">
														<span className="text-xs font-semibold text-foreground truncate">
															{idx + 1}.{" "}
															{language === "en" ? step.titleEn : step.titleBn}
														</span>
														<Badge
															variant="outline"
															className="text-[9px] font-mono px-1.5 py-0 border-white/10 bg-white/5 text-muted-foreground shrink-0"
														>
															{step.badge}
														</Badge>
													</div>
													<p className="text-[11px] text-muted-foreground leading-normal line-clamp-2">
														{language === "en" ? step.descEn : step.descBn}
													</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>

							<Separator className="border-white/10" />

							{/* Live Simulation Console */}
							<div className="rounded-xl border border-white/10 bg-black/70 overflow-hidden font-mono text-xs">
								<div className="px-4 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between text-muted-foreground text-[11px]">
									<div className="flex items-center gap-2">
										<Terminal className="size-3.5 text-cyan-400" />
										<span>Live Pipeline Output Trace</span>
									</div>
									<div className="flex items-center gap-1.5 text-[10px]">
										<span className="size-1.5 rounded-full bg-emerald-400" />
										<span>DAEMON IDLE</span>
									</div>
								</div>

								<div className="p-4 space-y-2 min-h-32 max-h-48 overflow-y-auto">
									{simulationLogs.length === 0 ? (
										<div className="text-muted-foreground/60 text-center py-6 text-xs">
											{language === "en"
												? "Click 'Run Test' above to trigger simulated execution."
												: "সিমুলেশন চালাতে উপরের 'টেস্ট রান' বাটনে ক্লিক করুন।"}
										</div>
									) : (
										simulationLogs.map((log) => (
											<div
												key={`${log.timestamp}-${log.stepName}`}
												className="flex items-center justify-between text-[11px] py-0.5 border-b border-white/5 last:border-0"
											>
												<div className="flex items-center gap-2 min-w-0">
													<span className="text-muted-foreground text-[10px]">
														[{log.timestamp}]
													</span>
													<span className="text-cyan-300 font-medium truncate">
														{log.stepName}
													</span>
												</div>
												<div className="flex items-center gap-3 shrink-0">
													<span className="text-teal-400 text-[10px]">
														+{log.latency}ms
													</span>
													<Badge
														variant="outline"
														className="text-[9px] py-0 px-1 border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
													>
														{log.status}
													</Badge>
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
