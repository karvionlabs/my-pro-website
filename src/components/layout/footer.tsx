"use client";

import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { NAV_ITEMS } from "@/components/layout/header";
import {
	FacebookIcon,
	GithubIcon,
	LinkedinIcon,
	YoutubeIcon,
} from "@/components/layout/social-icons";
import { useLanguage } from "@/context/language-context";
import { BRAND_DATA, SERVICES_DATA } from "@/data/portfolio-data";

export function Footer() {
	const { t } = useLanguage();

	return (
		<footer className="w-full border-t border-white/10 bg-background/90 text-muted-foreground">
			<div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
					{/* Brand Column */}
					<div className="md:col-span-2 space-y-4">
						<Link href="/" className="flex items-center gap-2.5 group">
							<div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-500/20">
								<Sparkles className="size-4 text-cyan-400" />
							</div>
							<span className="font-heading text-lg font-bold tracking-tight text-foreground">
								{BRAND_DATA.name}
							</span>
						</Link>

						<p className="text-sm leading-relaxed max-w-md text-muted-foreground">
							{BRAND_DATA.tagline}. We engineer autonomous AI workflows,
							high-performance Next.js platforms, and bulletproof End-to-End
							test automation frameworks for visionary founders and enterprises.
						</p>

						<div className="pt-2 text-xs space-y-1">
							<p className="font-medium text-foreground">
								Founded by {BRAND_DATA.founder}
							</p>
							<p className="text-muted-foreground">
								{BRAND_DATA.founderRole} • {BRAND_DATA.location}
							</p>
						</div>

						{/* Social Media Links */}
						<div className="flex items-center gap-3 pt-2">
							<Link
								href={BRAND_DATA.socials.github}
								target="_blank"
								rel="noopener noreferrer"
								className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
								aria-label="GitHub Profile"
							>
								<GithubIcon className="size-4" />
							</Link>
							<Link
								href={BRAND_DATA.socials.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
								aria-label="LinkedIn Profile"
							>
								<LinkedinIcon className="size-4" />
							</Link>
							<Link
								href={BRAND_DATA.socials.facebook}
								target="_blank"
								rel="noopener noreferrer"
								className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
								aria-label="Facebook Page"
							>
								<FacebookIcon className="size-4" />
							</Link>
							<Link
								href={BRAND_DATA.socials.youtube}
								target="_blank"
								rel="noopener noreferrer"
								className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
								aria-label="YouTube Channel"
							>
								<YoutubeIcon className="size-4" />
							</Link>
						</div>
					</div>

					{/* Navigation Links Column */}
					<div className="space-y-4">
						<h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
							Navigation
						</h4>
						<ul className="space-y-2.5 text-sm">
							{NAV_ITEMS.map((link) => (
								<li key={link.key}>
									<Link
										href={link.href}
										className="hover:text-foreground transition-colors"
									>
										{t(link.key)}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Capabilities Column */}
					<div className="space-y-4">
						<h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
							{t("navServices")}
						</h4>
						<ul className="space-y-2.5 text-sm">
							{SERVICES_DATA.map((service) => (
								<li key={service.id}>
									<Link
										href="#services"
										className="hover:text-foreground transition-colors flex items-center justify-between group"
									>
										<span className="truncate">{service.title}</span>
										<ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
									</Link>
								</li>
							))}
							<li className="pt-2">
								<Link
									href={`mailto:${BRAND_DATA.email}`}
									className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-mono"
								>
									<Mail className="size-3.5" />
									<span>{BRAND_DATA.email}</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
					<p>© 2026 {BRAND_DATA.name}. All rights reserved.</p>
					<div className="flex items-center gap-1">
						<span>Engineered with Next.js 16, Shadcn UI & Biome by</span>
						<span className="font-medium text-foreground">
							{BRAND_DATA.founder}
						</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
