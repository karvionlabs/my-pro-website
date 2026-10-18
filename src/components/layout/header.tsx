"use client";

import { ArrowRight, Globe, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { openCommandPalette } from "@/components/layout/command-menu";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { BRAND_DATA } from "@/data/portfolio-data";

export const NAV_ITEMS = [
	{ key: "navServices", href: "#services" },
	{ key: "navProjects", href: "#projects" },
	{ key: "navTechStack", href: "#tech-stack" },
	{ key: "navTestimonials", href: "#testimonials" },
	{ key: "navContact", href: "#contact" },
];

export function Header() {
	const { language, toggleLanguage, t } = useLanguage();

	return (
		<header className="sticky top-0 z-40 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
			<div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
				{/* Brand Logo */}
				<Link href="/" className="flex items-center gap-2.5 group">
					<div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-500/20">
						<Sparkles className="size-4 text-cyan-400 group-hover:scale-110 transition-transform" />
					</div>
					<div className="flex flex-col">
						<span className="font-heading text-lg font-bold tracking-tight text-foreground group-hover:text-cyan-400 transition-colors">
							{BRAND_DATA.name}
						</span>
						<span className="text-[10px] text-muted-foreground -mt-1 font-mono tracking-wide">
							AI & SQA LABS
						</span>
					</div>
				</Link>

				{/* Desktop Navigation Links */}
				<nav className="hidden md:flex items-center gap-1 lg:gap-2">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.key}
							href={item.href}
							className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
						>
							{t(item.key)}
						</Link>
					))}
				</nav>

				{/* Right Actions: Command+K + Language Switcher + Availability Badge + CTA Button */}
				<div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
					{/* Quick Search Palette Button */}
					<button
						type="button"
						onClick={openCommandPalette}
						className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer"
						aria-label="Open command palette"
					>
						<Search className="size-3.5 text-cyan-400" />
						<span className="hidden md:inline font-normal">Search</span>
						<kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-0.5 rounded border border-white/15 bg-white/10 px-1 font-mono text-[10px] font-medium text-muted-foreground">
							Ctrl K
						</kbd>
					</button>

					{/* Language Switcher */}
					<Button
						variant="ghost"
						size="sm"
						onClick={toggleLanguage}
						className="h-8 px-2.5 rounded-lg border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-500/10 text-xs font-medium text-foreground gap-1.5 transition-colors cursor-pointer"
						aria-label="Toggle language"
					>
						<Globe className="size-3.5 text-cyan-400" />
						<span className="font-semibold">
							{language === "en" ? "বাংলা" : "EN"}
						</span>
					</Button>

					<Badge
						variant="outline"
						className="hidden lg:inline-flex items-center gap-1.5 py-1 px-2.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-normal"
					>
						<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
						{t("availableQ4")}
					</Badge>

					<Link
						href="#contact"
						className={buttonVariants({
							size: "sm",
							className:
								"bg-foreground text-background hover:bg-neutral-200 font-medium text-xs h-8 px-3 rounded-lg border-0 flex items-center gap-1.5 transition-colors cursor-pointer",
						})}
					>
						<span>{t("getQuote")}</span>
						<ArrowRight className="size-3.5" />
					</Link>
				</div>

				{/* Mobile Controls */}
				<div className="flex sm:hidden items-center gap-1.5">
					<Button
						variant="ghost"
						size="icon"
						onClick={openCommandPalette}
						className="size-7 text-muted-foreground hover:text-foreground cursor-pointer"
						aria-label="Open search palette"
					>
						<Search className="size-3.5 text-cyan-400" />
					</Button>

					<Button
						variant="ghost"
						size="sm"
						onClick={toggleLanguage}
						className="h-7 px-2 rounded-lg border border-white/10 text-xs font-semibold text-foreground cursor-pointer"
						aria-label="Toggle language"
					>
						{language === "en" ? "বাং" : "EN"}
					</Button>

					<Link
						href="#contact"
						className={buttonVariants({
							size: "xs",
							className: "bg-cyan-500 text-white text-xs px-2.5 h-7",
						})}
					>
						{t("hireUs")}
					</Link>
					<MobileNav />
				</div>
				<div className="hidden sm:flex md:hidden items-center gap-2">
					<Button
						variant="ghost"
						size="sm"
						onClick={toggleLanguage}
						className="h-8 px-2.5 rounded-lg border border-white/10 text-xs font-semibold text-foreground cursor-pointer"
						aria-label="Toggle language"
					>
						{language === "en" ? "বাংলা" : "EN"}
					</Button>
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
