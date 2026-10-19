"use client";

import {
	ArrowRight,
	Bot,
	Check,
	CheckCircle2,
	Cpu,
	Gauge,
	Layout,
	ShieldCheck,
	Terminal,
	TrendingUp,
	Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import { SERVICES_DATA } from "@/data/portfolio-data";

export function ServicesSection() {
	const { t } = useLanguage();

	const aiService = SERVICES_DATA.find((s) => s.id === "ai-automation");
	const webService = SERVICES_DATA.find((s) => s.id === "fullstack-web");
	const sqaService = SERVICES_DATA.find((s) => s.id === "sqa-automation");
	const growthService = SERVICES_DATA.find((s) => s.id === "growth-marketing");

	return (
		<section
			id="services"
			className="py-20 md:py-28 border-b border-white/5 relative"
		>
			<div className="container mx-auto max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium uppercase tracking-wider mb-4">
						{t("servicesBadge")}
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
						{t("servicesTitle")}
					</h2>
					<p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
						{t("servicesSubtitle")}
					</p>
				</div>

				{/* Silicon Valley Bento Grid (7-col / 5-col Asymmetric Matrix) */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
					{/* Bento Card 1: AI Autonomous Agents (Span 7) */}
					{aiService && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="lg:col-span-7"
						>
							<Card className="h-full group relative border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/10 flex flex-col justify-between overflow-hidden">
								<CardHeader className="p-6 sm:p-8 pb-4">
									<div className="flex items-center justify-between gap-4 mb-4">
										<div className="flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-foreground group-hover:border-white/20 transition-all">
											<Bot className="size-5 text-cyan-400" />
										</div>
										<div className="flex items-center gap-2">
											<Badge
												variant="secondary"
												className="border border-white/10 bg-white/[0.03] text-neutral-300 text-xs font-mono font-medium"
											>
												{aiService.badge}
											</Badge>
											<Badge
												variant="outline"
												className="border-white/10 bg-white/[0.02] text-neutral-400 text-xs flex items-center gap-1 font-mono"
											>
												<Cpu className="size-3" />
												{t("bentoAiBadge")}
											</Badge>
										</div>
									</div>

									<CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
										{aiService.title}
									</CardTitle>

									<CardDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
										{aiService.description}
									</CardDescription>

									{/* Interactive Live Agent Terminal Widget */}
									<div className="mt-4 p-3.5 rounded-xl border border-white/10 bg-black/40 font-mono text-[11px] space-y-1.5 shadow-inner">
										<div className="flex items-center justify-between text-muted-foreground pb-1.5 border-b border-white/5">
											<span className="flex items-center gap-1.5 text-cyan-400">
												<Terminal className="size-3" />
												{t("bentoAiLiveConsole")}
											</span>
											<span className="flex items-center gap-1 text-[10px] text-emerald-400">
												<span className="size-1.5 rounded-full bg-emerald-400" />
												LIVE RUNTIME
											</span>
										</div>
										<div className="text-muted-foreground">
											<span className="text-cyan-400">$</span> openclaw run
											--agent lead-sync --model gemini-3-flash
										</div>
										<div className="text-teal-300/90 pl-3">
											&gt; [TRIGGER] Inbound webhook verified &amp; schema
											parsed
										</div>
										<div className="text-emerald-400 pl-3">
											&gt; [DISPATCH] Automated tool call executed in 140ms
										</div>
									</div>
								</CardHeader>

								<CardContent className="p-6 sm:p-8 pt-2 space-y-5">
									{/* Features */}
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
										{aiService.features.map((feature) => (
											<li
												key={feature}
												className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
											>
												<span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5">
													<Check className="size-2.5" />
												</span>
												<span className="text-foreground/90">{feature}</span>
											</li>
										))}
									</ul>

									{/* Tags & Action */}
									<div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
										<div className="flex flex-wrap gap-1.5">
											{aiService.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-muted-foreground border border-white/10"
												>
													{tag}
												</span>
											))}
										</div>
										<Link
											href="#contact"
											className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
										>
											<span>{t("consultCapability")}</span>
											<ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
										</Link>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Bento Card 2: Next.js 16 Web Engineering (Span 5) */}
					{webService && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="lg:col-span-5"
						>
							<Card className="h-full group relative border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/10 flex flex-col justify-between overflow-hidden">
								<CardHeader className="p-6 sm:p-8 pb-4">
									<div className="flex items-center justify-between gap-4 mb-4">
										<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-sm shadow-cyan-500/20">
											<Layout className="size-6" />
										</div>
										<Badge
											variant="secondary"
											className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium flex items-center gap-1"
										>
											<Zap className="size-3" />
											{t("bentoWebBadge")}
										</Badge>
									</div>

									<CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
										{webService.title}
									</CardTitle>

									<CardDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
										{webService.description}
									</CardDescription>

									{/* Speed Metric Box */}
									<div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Gauge className="size-4 text-emerald-400" />
											<span className="text-xs font-semibold text-foreground">
												{t("bentoWebScore")}
											</span>
										</div>
										<span className="font-mono text-xs text-cyan-400 font-bold">
											FCP &lt; 0.4s
										</span>
									</div>
								</CardHeader>

								<CardContent className="p-6 sm:p-8 pt-2 space-y-5">
									<ul className="space-y-2">
										{webService.features.slice(0, 3).map((feature) => (
											<li
												key={feature}
												className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
											>
												<span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5">
													<Check className="size-2.5" />
												</span>
												<span className="text-foreground/90">{feature}</span>
											</li>
										))}
									</ul>

									<div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
										<div className="flex flex-wrap gap-1.5">
											{webService.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-muted-foreground border border-white/10"
												>
													{tag}
												</span>
											))}
										</div>
										<Link
											href="#contact"
											className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
										>
											<span>{t("consultCapability")}</span>
											<ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
										</Link>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Bento Card 3: End-to-End SQA Playwright (Span 5) */}
					{sqaService && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="lg:col-span-5"
						>
							<Card className="h-full group relative border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/10 flex flex-col justify-between overflow-hidden">
								<CardHeader className="p-6 sm:p-8 pb-4">
									<div className="flex items-center justify-between gap-4 mb-4">
										<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-sm shadow-cyan-500/20">
											<ShieldCheck className="size-6" />
										</div>
										<Badge
											variant="secondary"
											className="border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium"
										>
											{t("bentoSqaBadge")}
										</Badge>
									</div>

									<CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
										{sqaService.title}
									</CardTitle>

									<CardDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
										{sqaService.description}
									</CardDescription>

									{/* Regression Seal Box */}
									<div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between font-mono text-xs">
										<span className="flex items-center gap-1.5 text-foreground font-semibold">
											<CheckCircle2 className="size-3.5 text-emerald-400" />
											{t("bentoSqaGuarantee")}
										</span>
										<span className="text-violet-400">250+ E2E</span>
									</div>
								</CardHeader>

								<CardContent className="p-6 sm:p-8 pt-2 space-y-5">
									<ul className="space-y-2">
										{sqaService.features.slice(0, 3).map((feature) => (
											<li
												key={feature}
												className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
											>
												<span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5">
													<Check className="size-2.5" />
												</span>
												<span className="text-foreground/90">{feature}</span>
											</li>
										))}
									</ul>

									<div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
										<div className="flex flex-wrap gap-1.5">
											{sqaService.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-muted-foreground border border-white/10"
												>
													{tag}
												</span>
											))}
										</div>
										<Link
											href="#contact"
											className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
										>
											<span>{t("consultCapability")}</span>
											<ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
										</Link>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Bento Card 4: AI Growth Systems (Span 7) */}
					{growthService && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="lg:col-span-7"
						>
							<Card className="h-full group relative border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/10 flex flex-col justify-between overflow-hidden">
								<CardHeader className="p-6 sm:p-8 pb-4">
									<div className="flex items-center justify-between gap-4 mb-4">
										<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-sm shadow-cyan-500/20">
											<TrendingUp className="size-6" />
										</div>
										<Badge
											variant="secondary"
											className="border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-medium"
										>
											{t("bentoGrowthBadge")}
										</Badge>
									</div>

									<CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
										{growthService.title}
									</CardTitle>

									<CardDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
										{growthService.description}
									</CardDescription>

									{/* Velocity Metric Preview Box */}
									<div className="mt-4 p-3.5 rounded-xl border border-white/10 bg-black/40 font-mono text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-inner">
										<div className="flex items-center gap-2 text-foreground">
											<Cpu className="size-3.5 text-teal-400" />
											<span>{t("bentoGrowthMetric")}</span>
										</div>
										<span className="text-teal-300 text-[10px] bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
											A/B Pipeline Active
										</span>
									</div>
								</CardHeader>

								<CardContent className="p-6 sm:p-8 pt-2 space-y-5">
									<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
										{growthService.features.map((feature) => (
											<li
												key={feature}
												className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
											>
												<span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5">
													<Check className="size-2.5" />
												</span>
												<span className="text-foreground/90">{feature}</span>
											</li>
										))}
									</ul>

									<div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
										<div className="flex flex-wrap gap-1.5">
											{growthService.tags.map((tag) => (
												<span
													key={tag}
													className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-muted-foreground border border-white/10"
												>
													{tag}
												</span>
											))}
										</div>
										<Link
											href="#contact"
											className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
										>
											<span>{t("consultCapability")}</span>
											<ArrowRight className="size-3.5 group-hover/link:translate-x-1 transition-transform" />
										</Link>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
}
