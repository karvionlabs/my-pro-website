"use client";

import { ArrowRight, Globe, Menu, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/context/language-context";
import { BRAND_DATA } from "@/data/portfolio-data";

export function MobileNav() {
	const [open, setOpen] = useState(false);
	const { language, toggleLanguage, t } = useLanguage();

	const navItems = [
		{ key: "navServices", href: "#services" },
		{ key: "navProjects", href: "#projects" },
		{ key: "navTechStack", href: "#tech-stack" },
		{ key: "navTestimonials", href: "#testimonials" },
		{ key: "navContact", href: "#contact" },
	];

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden text-foreground hover:bg-white/10 cursor-pointer"
						aria-label="Open navigation menu"
					>
						<Menu className="size-5" />
					</Button>
				}
			/>
			<SheetContent
				side="right"
				className="w-[300px] sm:w-[350px] bg-background/95 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col justify-between"
			>
				<div>
					<SheetHeader className="p-0 text-left mb-6">
						<SheetTitle className="flex items-center justify-between text-lg font-bold">
							<div className="flex items-center gap-2">
								<span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-foreground border border-white/10">
									<Terminal className="size-3.5 text-cyan-400" />
								</span>
								<span className="text-foreground font-heading">
									{BRAND_DATA.name}
								</span>
							</div>
							<Button
								variant="outline"
								size="sm"
								onClick={toggleLanguage}
								className="h-7 px-2 text-xs border-white/10 gap-1 cursor-pointer"
							>
								<Globe className="size-3 text-cyan-400" />
								<span>{language === "en" ? "বাংলা" : "EN"}</span>
							</Button>
						</SheetTitle>
					</SheetHeader>

					<nav className="flex flex-col gap-2">
						{navItems.map((item) => (
							<Link
								key={item.key}
								href={item.href}
								onClick={() => setOpen(false)}
								className="px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
							>
								{t(item.key)}
							</Link>
						))}
					</nav>
				</div>

				<div className="pt-6 border-t border-white/10 flex flex-col gap-4">
					<div className="text-xs text-muted-foreground">
						<p className="font-medium text-foreground">{BRAND_DATA.founder}</p>
						<p>{BRAND_DATA.founderRole}</p>
						<p className="text-[11px] text-muted-foreground/80 mt-0.5">
							{BRAND_DATA.location}
						</p>
					</div>
					<Link
						href="#contact"
						onClick={() => setOpen(false)}
						className={buttonVariants({
							className:
								"w-full bg-foreground text-background hover:bg-neutral-200 font-medium text-sm flex items-center justify-center gap-2 rounded-lg transition-colors",
						})}
					>
						<span>{t("startProject")}</span>
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	);
}
