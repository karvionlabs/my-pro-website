"use client";

import {
	ArrowRight,
	Bot,
	Check,
	Layout,
	ShieldCheck,
	TrendingUp,
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

const iconMap = {
	Bot: Bot,
	Layout: Layout,
	ShieldCheck: ShieldCheck,
	TrendingUp: TrendingUp,
};

export function ServicesSection() {
	const { t } = useLanguage();

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

				{/* Services 2x2 Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{SERVICES_DATA.map((service, index) => {
						const IconComponent =
							iconMap[service.icon as keyof typeof iconMap] || Bot;

						return (
							<motion.div
								key={service.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
							>
								<Card className="h-full group relative border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/40 transition-all duration-300 shadow-sm hover:shadow-cyan-500/10 flex flex-col justify-between">
									<CardHeader className="p-6 sm:p-8 pb-4">
										<div className="flex items-center justify-between gap-4 mb-4">
											<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all shadow-sm shadow-cyan-500/20">
												<IconComponent className="size-6" />
											</div>
											{service.badge && (
												<Badge
													variant="secondary"
													className="border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium"
												>
													{service.badge}
												</Badge>
											)}
										</div>

										<CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
											{service.title}
										</CardTitle>

										<CardDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
											{service.description}
										</CardDescription>
									</CardHeader>

									<CardContent className="p-6 sm:p-8 pt-2 space-y-6">
										{/* Feature List */}
										<ul className="space-y-2.5">
											{service.features.map((feature) => (
												<li
													key={feature}
													className="flex items-start gap-2.5 text-sm text-muted-foreground"
												>
													<span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400 mt-0.5">
														<Check className="size-3" />
													</span>
													<span className="text-foreground/90">{feature}</span>
												</li>
											))}
										</ul>

										{/* Tech Tags */}
										<div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
											{service.tags.map((tag) => (
												<span
													key={tag}
													className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 text-muted-foreground border border-white/10"
												>
													{tag}
												</span>
											))}
										</div>

										{/* Action Link */}
										<div className="pt-2">
											<Link
												href="#contact"
												className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
											>
												<span>{t("consultCapability")}</span>
												<ArrowRight className="size-4 group-hover/link:translate-x-1 transition-transform" />
											</Link>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
