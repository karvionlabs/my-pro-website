"use client";

import {
	CheckCircle2,
	Clock,
	Mail,
	MapPin,
	Send,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BRAND_DATA } from "@/data/portfolio-data";

export function ContactSection() {
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		service: "AI Automation",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.name || !formData.email || !formData.message) return;

		setStatus("loading");
		// Client feedback simulation
		setTimeout(() => {
			setStatus("success");
			setFormData({
				name: "",
				email: "",
				service: "AI Automation",
				message: "",
			});
		}, 600);
	};

	const servicesOptions = [
		"AI Automation",
		"Next.js Web Development",
		"Test Automation (SQA)",
		"Full Enterprise Consulting",
	];

	return (
		<section id="contact" className="py-20 md:py-28 relative">
			<div className="container mx-auto max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium uppercase tracking-wider mb-4">
						Get in Touch
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
						Start Your Next Engineering Leap
					</h2>
					<p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
						Have a project in mind or need autonomous AI workflows for your
						team? Drop us a message and we'll evaluate feasibility within 24
						hours.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
					{/* Left: Contact Info & Value Prop */}
					<div className="lg:col-span-2 space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
						<div className="space-y-2">
							<h3 className="font-heading text-xl font-bold text-foreground">
								Direct Channels
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								Connect directly with Founder & Principal Engineer{" "}
								<span className="text-foreground font-medium">
									{BRAND_DATA.founder}
								</span>
								.
							</p>
						</div>

						<div className="space-y-4 pt-4 border-t border-white/5">
							<div className="flex items-start gap-3">
								<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
									<Mail className="size-4" />
								</div>
								<div>
									<div className="text-xs text-muted-foreground">Email</div>
									<a
										href={`mailto:${BRAND_DATA.email}`}
										className="text-sm font-mono font-medium text-foreground hover:text-cyan-400 transition-colors"
									>
										{BRAND_DATA.email}
									</a>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
									<Clock className="size-4" />
								</div>
								<div>
									<div className="text-xs text-muted-foreground">
										Response SLA
									</div>
									<div className="text-sm font-medium text-foreground">
										Guaranteed response within 24 hours
									</div>
								</div>
							</div>

							<div className="flex items-start gap-3">
								<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
									<MapPin className="size-4" />
								</div>
								<div>
									<div className="text-xs text-muted-foreground">Location</div>
									<div className="text-sm font-medium text-foreground">
										{BRAND_DATA.location} (Remote Globally)
									</div>
								</div>
							</div>
						</div>

						<div className="pt-4 border-t border-white/5">
							<Badge
								variant="outline"
								className="w-full justify-center py-2 border-cyan-500/30 bg-cyan-500/5 text-cyan-300 text-xs"
							>
								<Sparkles className="size-3.5 mr-1.5" />
								NDAs & Type-Safe Architecture Guaranteed
							</Badge>
						</div>
					</div>

					{/* Right: Interactive Form */}
					<div className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
						{status === "success" ? (
							<div className="py-12 flex flex-col items-center text-center space-y-4">
								<div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
									<CheckCircle2 className="size-8" />
								</div>
								<h3 className="font-heading text-2xl font-bold text-foreground">
									Inquiry Transmitted Successfully
								</h3>
								<p className="text-sm text-muted-foreground max-w-md">
									Thank you! Your message has been received.{" "}
									{BRAND_DATA.founder} will personally review your project scope
									and respond within 24 hours.
								</p>
								<Button
									variant="outline"
									onClick={() => setStatus("idle")}
									className="mt-4 border-white/15 hover:bg-white/10 text-foreground"
								>
									Send Another Message
								</Button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label
											htmlFor="name"
											className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
										>
											Your Name *
										</label>
										<Input
											id="name"
											required
											placeholder="Jane Doe"
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											className="border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground/60 h-10"
										/>
									</div>

									<div className="space-y-2">
										<label
											htmlFor="email"
											className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
										>
											Email Address *
										</label>
										<Input
											id="email"
											type="email"
											required
											placeholder="jane@company.com"
											value={formData.email}
											onChange={(e) =>
												setFormData({ ...formData, email: e.target.value })
											}
											className="border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground/60 h-10"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="service-select"
										className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
									>
										Service Focus
									</label>
									<div
										id="service-select"
										className="grid grid-cols-1 sm:grid-cols-2 gap-2"
									>
										{servicesOptions.map((opt) => (
											<button
												key={opt}
												type="button"
												onClick={() =>
													setFormData({ ...formData, service: opt })
												}
												className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
													formData.service === opt
														? "border-cyan-500 bg-cyan-500/15 text-cyan-300 font-semibold"
														: "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
												}`}
											>
												{opt}
											</button>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<label
										htmlFor="message"
										className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
									>
										Project Details / Goals *
									</label>
									<Textarea
										id="message"
										required
										rows={4}
										placeholder="Tell us about the workflow you want to automate or the platform you want to build..."
										value={formData.message}
										onChange={(e) =>
											setFormData({ ...formData, message: e.target.value })
										}
										className="border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground/60 resize-none"
									/>
								</div>

								<Button
									type="submit"
									disabled={status === "loading"}
									className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold h-11 shadow-lg shadow-cyan-500/20 border-0 flex items-center justify-center gap-2"
								>
									{status === "loading" ? (
										<span>Transmitting...</span>
									) : (
										<>
											<span>Submit Project Inquiry</span>
											<Send className="size-4" />
										</>
									)}
								</Button>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
