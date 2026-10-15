"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { ProjectDialog } from "@/components/sections/project-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PROJECTS_DATA, type ProjectItem } from "@/data/portfolio-data";

export function ProjectsSection() {
	const [activeCategory, setActiveCategory] = useState<string>("all");
	const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
		null,
	);
	const [dialogOpen, setDialogOpen] = useState(false);

	const categories = [
		{ id: "all", label: "All Projects" },
		{ id: "ai", label: "AI Automation" },
		{ id: "web", label: "Web Applications" },
		{ id: "sqa", label: "Test Automation" },
	];

	const filteredProjects =
		activeCategory === "all"
			? PROJECTS_DATA
			: PROJECTS_DATA.filter((p) => p.category === activeCategory);

	const handleOpenProject = (project: ProjectItem) => {
		setSelectedProject(project);
		setDialogOpen(true);
	};

	return (
		<section
			id="projects"
			className="py-20 md:py-28 border-b border-white/5 relative"
		>
			<div className="container mx-auto max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium uppercase tracking-wider mb-4">
						Proven Results
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
						Featured Projects & Case Studies
					</h2>
					<p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
						Explore production systems engineered for measurable client impact,
						from multi-agent orchestrations to robust testing suites.
					</p>
				</div>

				{/* Filter Buttons */}
				<div className="flex flex-wrap items-center justify-center gap-2 mb-12">
					{categories.map((cat) => (
						<Button
							key={cat.id}
							variant={activeCategory === cat.id ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveCategory(cat.id)}
							className={
								activeCategory === cat.id
									? "bg-cyan-500 hover:bg-cyan-400 text-white shadow-md shadow-cyan-500/20"
									: "border-white/10 bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground"
							}
						>
							{cat.label}
						</Button>
					))}
				</div>

				{/* Projects Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					{filteredProjects.map((project) => (
						<Card
							key={project.id}
							className="group relative border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
						>
							<CardHeader className="p-6 sm:p-8 pb-4">
								<div className="flex items-center justify-between gap-2 mb-3">
									<Badge
										variant="secondary"
										className="border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium"
									>
										{project.categoryLabel}
									</Badge>
									{project.featured && (
										<Badge
											variant="outline"
											className="border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs flex items-center gap-1"
										>
											<Sparkles className="size-3" />
											Featured
										</Badge>
									)}
								</div>

								<CardTitle className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-cyan-400 transition-colors">
									{project.title}
								</CardTitle>

								<CardDescription className="text-sm text-cyan-300/80 font-medium mt-1">
									{project.tagline}
								</CardDescription>

								<p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
									{project.description}
								</p>
							</CardHeader>

							<CardContent className="p-6 sm:p-8 pt-0 space-y-5">
								{/* Metrics Pill Preview */}
								<div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5">
									{project.metrics.map((m) => (
										<div key={m.label} className="text-center">
											<div className="text-sm font-bold text-foreground">
												{m.value}
											</div>
											<div className="text-[10px] text-muted-foreground">
												{m.label}
											</div>
										</div>
									))}
								</div>

								{/* Tech Tags */}
								<div className="flex flex-wrap gap-1.5">
									{project.techStack.map((tech) => (
										<span
											key={tech}
											className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-muted-foreground border border-white/5"
										>
											{tech}
										</span>
									))}
								</div>

								{/* Modal Trigger Action */}
								<div className="pt-2">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleOpenProject(project)}
										className="w-full border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-foreground group/btn flex items-center justify-center gap-2"
									>
										<span>View Architecture & Case Study</span>
										<ArrowUpRight className="size-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>

			{/* Project Details Modal */}
			<ProjectDialog
				project={selectedProject}
				open={dialogOpen}
				onOpenChange={setDialogOpen}
			/>
		</section>
	);
}
