"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
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
			{/* Ambient background glow & radial spotlight */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] md:size-[700px] bg-gradient-to-tr from-cyan-500/15 via-violet-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

			<div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center text-center">
				{/* Status Pill Badge with Motion */}
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}
					className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-medium mb-8 shadow-sm shadow-cyan-500/10"
				>
					<span className="flex size-2 rounded-full bg-cyan-400 animate-ping" />
					<span className="flex size-2 rounded-full bg-cyan-400" />
					<span>{t("heroStatus")}</span>
				</motion.div>

				{/* Main Headline */}
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] text-foreground"
				>
					{t("heroTitle1")}{" "}
					<span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
						{t("heroTitle2")}
					</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
				>
					{t("heroSubtitle")}
				</motion.p>

				{/* Key Value Highlights */}
				<motion.div
					initial={{ opacity: 0, y: 15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.3 }}
					className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground"
				>
					<div className="flex items-center gap-1.5 text-foreground">
						<CheckCircle2 className="size-4 text-cyan-400" />
						<span>{t("heroHighlight1")}</span>
					</div>
					<div className="flex items-center gap-1.5 text-foreground">
						<CheckCircle2 className="size-4 text-cyan-400" />
						<span>{t("heroHighlight2")}</span>
					</div>
					<div className="flex items-center gap-1.5 text-foreground">
						<CheckCircle2 className="size-4 text-cyan-400" />
						<span>{t("heroHighlight3")}</span>
					</div>
				</motion.div>

				{/* Dual Action Buttons */}
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
								"w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/25 border-0 px-8 h-12 text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02]",
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
								"w-full sm:w-auto border-white/15 bg-white/5 hover:bg-white/10 text-foreground px-8 h-12 text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02]",
						})}
					>
						<span>{t("exploreCases")}</span>
					</Link>
				</motion.div>

				{/* Live Metric Counters Grid with Staggered Entrance */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.5 }}
					className="mt-16 sm:mt-20 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl"
				>
					{metrics.map((metric) => (
						<div
							key={metric.label}
							className="group flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all duration-300"
						>
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
								{metric.value}
							</div>
							<div className="mt-1 text-sm font-semibold text-foreground">
								{metric.label}
							</div>
							<div className="mt-0.5 text-xs text-muted-foreground text-center">
								{metric.description}
							</div>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
