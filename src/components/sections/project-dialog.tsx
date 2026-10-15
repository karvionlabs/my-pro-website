"use client";

import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/layout/social-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ProjectItem } from "@/data/portfolio-data";

interface ProjectDialogProps {
	project: ProjectItem | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({
	project,
	open,
	onOpenChange,
}: ProjectDialogProps) {
	if (!project) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-xl bg-background/95 backdrop-blur-2xl border-white/15 p-6 sm:p-8">
				<DialogHeader className="p-0 text-left space-y-3">
					<div className="flex items-center gap-2">
						<Badge
							variant="secondary"
							className="border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs"
						>
							{project.categoryLabel}
						</Badge>
						{project.featured && (
							<Badge
								variant="outline"
								className="border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs flex items-center gap-1"
							>
								<Sparkles className="size-3" />
								Featured Case Study
							</Badge>
						)}
					</div>

					<DialogTitle className="text-2xl font-bold text-foreground">
						{project.title}
					</DialogTitle>

					<DialogDescription className="text-sm text-cyan-300/90 font-medium">
						{project.tagline}
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 pt-4">
					{/* Description */}
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
							Overview
						</h4>
						<p className="text-sm text-foreground/90 leading-relaxed">
							{project.description}
						</p>
					</div>

					{/* Impact */}
					<div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
						<div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1">
							<TrendingUp className="size-4" />
							Business Impact & Result
						</div>
						<p className="text-sm text-foreground font-medium">
							{project.impact}
						</p>
					</div>

					{/* Metrics Grid */}
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
							Key Metrics
						</h4>
						<div className="grid grid-cols-3 gap-3">
							{project.metrics.map((m) => (
								<div
									key={m.label}
									className="p-3 rounded-lg border border-white/5 bg-white/[0.02] text-center"
								>
									<div className="text-lg font-bold text-cyan-400">
										{m.value}
									</div>
									<div className="text-[11px] text-muted-foreground">
										{m.label}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Technologies */}
					<div>
						<h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
							Tech Stack
						</h4>
						<div className="flex flex-wrap gap-1.5">
							{project.techStack.map((tech) => (
								<span
									key={tech}
									className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-muted-foreground border border-white/10"
								>
									{tech}
								</span>
							))}
						</div>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-3 pt-4 border-t border-white/10">
						{project.liveUrl && (
							<Link
								href={project.liveUrl}
								target="_blank"
								rel="noreferrer"
								className={buttonVariants({
									size: "sm",
									className:
										"bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-medium flex items-center gap-1.5",
								})}
							>
								<span>View Live Preview</span>
								<ArrowUpRight className="size-4" />
							</Link>
						)}
						{project.githubUrl && (
							<Link
								href={project.githubUrl}
								target="_blank"
								rel="noreferrer"
								className={buttonVariants({
									variant: "outline",
									size: "sm",
									className:
										"border-white/15 bg-white/5 hover:bg-white/10 text-foreground flex items-center gap-1.5",
								})}
							>
								<GithubIcon className="size-4" />
								<span>Repository</span>
							</Link>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
