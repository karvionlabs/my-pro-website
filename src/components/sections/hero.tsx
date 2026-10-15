import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { BRAND_DATA, STAT_METRICS } from "@/data/portfolio-data";

export function HeroSection() {
	return (
		<section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-white/5">
			{/* Ambient background glow */}
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] md:size-[700px] bg-gradient-to-tr from-cyan-500/15 via-violet-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

			<div className="container mx-auto max-w-6xl px-4 sm:px-6 flex flex-col items-center text-center">
				{/* Status Pill Badge */}
				<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md text-cyan-300 text-xs sm:text-sm font-medium mb-8 animate-fade-in">
					<span className="flex size-2 rounded-full bg-cyan-400 animate-ping" />
					<span className="flex size-2 rounded-full bg-cyan-400" />
					<span>{BRAND_DATA.status}</span>
				</div>

				{/* Main Headline */}
				<h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] text-foreground">
					Automating Complex Workflows.{" "}
					<span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 bg-clip-text text-transparent">
						Building Resilient Software.
					</span>
				</h1>

				{/* Subtitle */}
				<p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
					We engineer autonomous AI agents, enterprise Next.js web applications,
					and bulletproof automated test frameworks (SQA) to help companies
					scale seamlessly with zero manual bottlenecks.
				</p>

				{/* Key Value Highlights */}
				<div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
					<div className="flex items-center gap-1.5 text-foreground">
						<CheckCircle2 className="size-4 text-cyan-400" />
						<span>Autonomous Agents</span>
					</div>
					<div className="flex items-center gap-1.5 text-foreground">
						<CheckCircle2 className="size-4 text-cyan-400" />
						<span>Next.js 16 Architecture</span>
					</div>
					<div className="flex items-center gap-1.5 text-foreground">
						<CheckCircle2 className="size-4 text-cyan-400" />
						<span>Playwright E2E Testing</span>
					</div>
				</div>

				{/* Dual Action Buttons */}
				<div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
					<Link
						href="#contact"
						className={buttonVariants({
							size: "lg",
							className:
								"w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold shadow-lg shadow-cyan-500/25 border-0 px-8 h-12 text-base flex items-center justify-center gap-2",
						})}
					>
						<span>Schedule Strategy Call</span>
						<ArrowRight className="size-4" />
					</Link>

					<Link
						href="#projects"
						className={buttonVariants({
							variant: "outline",
							size: "lg",
							className:
								"w-full sm:w-auto border-white/15 bg-white/5 hover:bg-white/10 text-foreground px-8 h-12 text-base flex items-center justify-center gap-2",
						})}
					>
						<span>Explore Case Studies</span>
					</Link>
				</div>

				{/* Live Metric Counters Grid */}
				<div className="mt-16 sm:mt-20 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
					{STAT_METRICS.map((metric) => (
						<div
							key={metric.label}
							className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-500/20 transition-colors"
						>
							<div className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
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
				</div>
			</div>
		</section>
	);
}
