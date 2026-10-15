"use client";

import confetti from "canvas-confetti";
import {
	CheckCircle2,
	Clock,
	Mail,
	MapPin,
	MessageCircle,
	Send,
	Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/language-context";
import { BRAND_DATA } from "@/data/portfolio-data";

export function ContactSection() {
	const { t } = useLanguage();
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		service: "AI Workflows & Autonomous Agents",
		message: "",
	});

	const servicesOptions = [
		"AI Workflows & Autonomous Agents",
		"High-Performance Full-Stack Web Apps",
		"End-to-End Test Automation (SQA)",
		"AI Digital Strategy & Growth Systems",
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMessage(null);

		if (
			!formData.name.trim() ||
			!formData.email.trim() ||
			!formData.message.trim()
		) {
			setErrorMessage("Please fill in all required fields.");
			return;
		}

		setStatus("loading");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				const errMsg =
					data.errors?.message?.[0] ||
					data.errors?.email?.[0] ||
					data.message ||
					"Failed to transmit inquiry.";
				setErrorMessage(errMsg);
				setStatus("error");
				toast.error("Transmission Failed", {
					description: errMsg,
				});
				return;
			}

			// Success actions: Confetti + Toast Notification + State transition
			confetti({
				particleCount: 90,
				spread: 75,
				origin: { y: 0.6 },
				colors: ["#22d3ee", "#a855f7", "#34d399"],
			});

			toast.success(t("inquirySuccess"), {
				description: t("inquirySuccessDesc"),
			});

			setStatus("success");
			setFormData({
				name: "",
				email: "",
				service: "AI Workflows & Autonomous Agents",
				message: "",
			});
		} catch (err) {
			console.error("[FORM_SUBMIT_ERROR]", err);
			setErrorMessage(
				"Network error occurred. Please try again or reach out on WhatsApp.",
			);
			setStatus("error");
			toast.error("Network Error", {
				description:
					"Please check your connection or reach out directly on WhatsApp.",
			});
		}
	};

	return (
		<section id="contact" className="py-20 md:py-28 relative">
			<div className="container mx-auto max-w-6xl px-4 sm:px-6">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
					<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-medium uppercase tracking-wider mb-4">
						{t("contactBadge")}
					</div>
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
						{t("contactTitle")}
					</h2>
					<p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
						{t("contactSubtitle")}
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
					{/* Left: Contact Info & Value Prop */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="lg:col-span-2 space-y-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
					>
						<div className="space-y-2">
							<h3 className="font-heading text-xl font-bold text-foreground">
								{t("directChannels")}
							</h3>
							<p className="text-sm text-muted-foreground leading-relaxed">
								{t("directDesc")}{" "}
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
										{BRAND_DATA.location}
									</div>
								</div>
							</div>
						</div>

						{/* Direct WhatsApp Channel Button */}
						<div className="pt-2">
							<a
								href="https://wa.me/8801840624022?text=Hello%20Abdullah%2C%20I%20am%20reaching%20out%20from%20Karvion%20Labs%20website%20to%20discuss%20a%20project."
								target="_blank"
								rel="noreferrer"
								className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold transition-all hover:scale-[1.01] shadow-sm shadow-emerald-500/10"
							>
								<MessageCircle className="size-4" />
								<span>{t("chatWhatsApp")}</span>
							</a>
						</div>

						<div className="pt-2 border-t border-white/5">
							<Badge
								variant="outline"
								className="w-full justify-center py-2 border-cyan-500/30 bg-cyan-500/5 text-cyan-300 text-xs"
							>
								<Sparkles className="size-3.5 mr-1.5" />
								NDAs & Type-Safe Architecture Guaranteed
							</Badge>
						</div>
					</motion.div>

					{/* Right: Interactive Form */}
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
					>
						{status === "success" ? (
							<div className="py-12 flex flex-col items-center text-center space-y-4">
								<div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
									<CheckCircle2 className="size-8" />
								</div>
								<h3 className="font-heading text-2xl font-bold text-foreground">
									{t("inquirySuccess")}
								</h3>
								<p className="text-sm text-muted-foreground max-w-md leading-relaxed">
									{t("inquirySuccessDesc")}
								</p>
								<Button
									variant="outline"
									onClick={() => setStatus("idle")}
									className="mt-4 border-white/15 hover:bg-white/10 text-foreground cursor-pointer"
								>
									{t("sendAnother")}
								</Button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-6">
								{errorMessage && (
									<div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-xs">
										{errorMessage}
									</div>
								)}

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<label
											htmlFor="name"
											className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
										>
											{t("yourName")}
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
											{t("emailAddress")}
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
										{t("serviceFocus")}
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
												className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
													formData.service === opt
														? "border-cyan-500 bg-cyan-500/15 text-cyan-300 font-semibold shadow-sm shadow-cyan-500/10"
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
										{t("projectDetails")}
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
									className="w-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-semibold h-11 shadow-lg shadow-cyan-500/20 border-0 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
								>
									{status === "loading" ? (
										<span>{t("submitting")}</span>
									) : (
										<>
											<span>{t("submitInquiry")}</span>
											<Send className="size-4" />
										</>
									)}
								</Button>
							</form>
						)}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
