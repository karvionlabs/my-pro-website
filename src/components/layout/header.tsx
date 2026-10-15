import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { BRAND_DATA, NAV_LINKS } from "@/data/portfolio-data";

export function Header() {
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
					{NAV_LINKS.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
						>
							{link.name}
						</Link>
					))}
				</nav>

				{/* Right Actions: Availability Badge + CTA Button */}
				<div className="hidden sm:flex items-center gap-3">
					<Badge
						variant="outline"
						className="hidden lg:inline-flex items-center gap-1.5 py-1 px-2.5 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-normal"
					>
						<span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
						Available for Q4
					</Badge>

					<Link
						href="#contact"
						className={buttonVariants({
							size: "sm",
							className:
								"bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-medium shadow-md shadow-cyan-500/20 border-0 flex items-center gap-1.5",
						})}
					>
						<span>Get a Quote</span>
						<ArrowRight className="size-3.5" />
					</Link>
				</div>

				{/* Mobile Drawer */}
				<div className="flex sm:hidden items-center gap-2">
					<Link
						href="#contact"
						className={buttonVariants({
							size: "xs",
							className: "bg-cyan-500 text-white text-xs px-2.5 h-7",
						})}
					>
						Hire Us
					</Link>
					<MobileNav />
				</div>
				<div className="hidden sm:flex md:hidden">
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
