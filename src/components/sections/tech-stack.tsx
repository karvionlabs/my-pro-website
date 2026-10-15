import {
	Box,
	CheckCircle,
	Code,
	Cpu,
	GitBranch,
	Globe,
	Layers,
	Palette,
	Shield,
	Sparkles,
	Terminal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TECH_STACK_CATEGORIES } from "@/data/portfolio-data";

const iconMap = {
	Cpu,
	Sparkles,
	Terminal,
	Globe,
	Code,
	Palette,
	Layers,
	Shield,
	CheckCircle,
	GitBranch,
	Box,
};

export function TechStackSection() {
	return (
		<section
			id="tech-stack"
			className="py-20 md:py-28 border-b border-white/5 relative bg-white/[0.01]"
		>
			<div className="container mx-auto max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-medium uppercase tracking-wider mb-4">
						Engineering Stack
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
						Production Runtimes & Tech Matrix
					</h2>
					<p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
						We deliberately choose open-source, high-throughput technologies
						that eliminate technical debt, prevent regressions, and maximize
						speed.
					</p>
				</div>

				{/* Category Columns */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{TECH_STACK_CATEGORIES.map((category) => (
						<div
							key={category.category}
							className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-cyan-500/20 transition-colors"
						>
							<div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
								<h3 className="font-heading text-base font-bold text-foreground">
									{category.category}
								</h3>
								<span className="text-xs font-mono text-cyan-400">
									{category.technologies.length} tools
								</span>
							</div>

							<div className="space-y-4">
								{category.technologies.map((tech) => {
									const IconComp =
										iconMap[tech.iconName as keyof typeof iconMap] || Code;

									return (
										<div
											key={tech.name}
											className="group p-3.5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15 transition-all"
										>
											<div className="flex items-center justify-between gap-2 mb-1.5">
												<div className="flex items-center gap-2.5">
													<div className="flex size-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
														<IconComp className="size-3.5" />
													</div>
													<span className="font-semibold text-sm text-foreground">
														{tech.name}
													</span>
												</div>
												<Badge
													variant="outline"
													className="text-[10px] py-0 px-2 font-mono border-white/10 text-muted-foreground"
												>
													{tech.proficiency}
												</Badge>
											</div>
											<p className="text-xs text-muted-foreground leading-relaxed pl-9">
												{tech.description}
											</p>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
