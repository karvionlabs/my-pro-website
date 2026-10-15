import { Quote, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { TESTIMONIALS_DATA } from "@/data/portfolio-data";

export function TestimonialsSection() {
	return (
		<section
			id="testimonials"
			className="py-20 md:py-28 border-b border-white/5 relative bg-white/[0.01]"
		>
			<div className="container mx-auto max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium uppercase tracking-wider mb-4">
						Client Validation
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
						Trusted by Engineering & Product Teams
					</h2>
					<p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
						Direct feedback from tech leaders and founders who automated their
						workflows and hardened their release pipelines with Karvion Labs.
					</p>
				</div>

				{/* 3-Column Testimonial Grid */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					{TESTIMONIALS_DATA.map((testimonial) => (
						<Card
							key={testimonial.id}
							className="border-white/10 bg-white/[0.02] hover:border-violet-500/30 transition-all duration-300 flex flex-col justify-between p-6 sm:p-8"
						>
							<div>
								{/* Star Ratings + Quote Icon */}
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-1">
										{Array.from({ length: testimonial.rating }).map((_, i) => (
											<Star
												// biome-ignore lint/suspicious/noArrayIndexKey: Fixed 5-star rating count
												key={i}
												className="size-4 fill-cyan-400 text-cyan-400"
											/>
										))}
									</div>
									<Quote className="size-6 text-white/10" />
								</div>

								{/* Quote text */}
								<p className="text-sm text-foreground/90 leading-relaxed italic">
									"{testimonial.quote}"
								</p>
							</div>

							{/* Author Info */}
							<div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-3">
								<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 border border-white/10 font-bold text-sm text-cyan-400">
									{testimonial.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</div>
								<div>
									<h4 className="font-semibold text-sm text-foreground">
										{testimonial.name}
									</h4>
									<p className="text-xs text-muted-foreground">
										{testimonial.role} • {testimonial.company}
									</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
