"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";

export function HeroSection() {
	const { t } = useLanguage();

	const metrics = [
		{
			value: "100+",
			label: t("metricWorkflows"),
			description: t("metricWorkflowsDesc"),
		},
		{
			value: "99.8%",
			label: t("metricReliability"),
			description: t("metricReliabilityDesc"),
		},
		{
			value: "10x",
			label: t("metricSpeedup"),
			description: t("metricSpeedupDesc"),
		},
		{
			value: "24/7",
			label: t("metricOperations"),
			description: t("metricOperationsDesc"),
		},
	];

	return (
		<section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/5">
			{/* High-end monochromatic radial spotlight */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] md:size-[800px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(120,119,198,0.12),rgba(255,255,255,0))] pointer-events-none -z-10" />

			<div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center text-center">
				{/* Status Pill Badge with Minimalist Indicator */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-neutral-300 text-xs font-mono mb-8 hover:border-white/20 transition-colors"
				>
					<span className="size-1.5 rounded-full bg-emerald-400" />
					<span>{t("heroStatus")}</span>
				</motion.div>

				{/* High-End Contrast Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.08] text-foreground"
				>
					{t("heroTitle1")}{" "}
					<span className="bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
						{t("heroTitle2")}
					</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal"
				>
					{t("heroSubtitle")}
				</motion.p>

				{/* Clean Minimal Text Tags (No Emojis or Icons) */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-muted-foreground"
				>
					<span className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.02] text-neutral-300">
						{t("heroHighlight1")}
					</span>
					<span className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.02] text-neutral-300">
						{t("heroHighlight2")}
					</span>
					<span className="px-3 py-1 rounded-md border border-white/10 bg-white/[0.02] text-neutral-300">
						{t("heroHighlight3")}
					</span>
				</motion.div>

				{/* Refined Dual Action Buttons */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
				>
					<Link
						href="#contact"
						className={buttonVariants({
							size: "lg",
							className:
								"w-full sm:w-auto bg-foreground text-background hover:bg-neutral-200 font-semibold border-0 px-8 h-12 text-sm flex items-center justify-center gap-2 rounded-lg transition-all hover:scale-[1.01] cursor-pointer",
						})}
					>
						<span>{t("scheduleCall")}</span>
						<ArrowRight className="size-4" />
					</Link>

					<Link
						href="#projects"
						className={buttonVariants({
							variant: "outline",
							size: "lg",
							className:
								"w-full sm:w-auto border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-foreground px-8 h-12 text-sm flex items-center justify-center gap-2 rounded-lg transition-all hover:scale-[1.01] cursor-pointer",
						})}
					>
						<span>{t("exploreCases")}</span>
					</Link>
				</motion.div>

				{/* Crisp Bento Grid Metric Cards */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-16 sm:mt-20 w-full grid grid-cols-2 lg:grid-cols-4 gap-4"
				>
					{metrics.map((metric) => (
						<div
							key={metric.label}
							className="group flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-neutral-900/60 backdrop-blur-md hover:border-white/25 hover:bg-neutral-900/90 hover:-translate-y-1 transition-all duration-300"
						>
							<div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-foreground group-hover:text-cyan-300 transition-colors">
								{metric.value}
							</div>
							<div className="mt-2 text-sm font-semibold text-foreground tracking-tight">
								{metric.label}
							</div>
							<div className="mt-1 text-xs text-muted-foreground text-center font-normal">
								{metric.description}
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
