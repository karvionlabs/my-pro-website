"use client";

import { ArrowRight, Menu, Sparkles } from "lucide-react";
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
import { BRAND_DATA, NAV_LINKS } from "@/data/portfolio-data";

export function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden text-foreground hover:bg-white/10"
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
						<SheetTitle className="flex items-center gap-2 text-lg font-bold">
							<span className="flex size-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
								<Sparkles className="size-4" />
							</span>
							<span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
								{BRAND_DATA.name}
							</span>
						</SheetTitle>
					</SheetHeader>

					<nav className="flex flex-col gap-2">
						{NAV_LINKS.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								onClick={() => setOpen(false)}
								className="px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
							>
								{link.name}
							</Link>
						))}
					</nav>
				</div>

				<div className="pt-6 border-t border-white/10 flex flex-col gap-4">
					<div className="text-xs text-muted-foreground">
						<p className="font-medium text-foreground">{BRAND_DATA.founder}</p>
						<p>{BRAND_DATA.founderRole}</p>
					</div>
					<Link
						href="#contact"
						onClick={() => setOpen(false)}
						className={buttonVariants({
							className:
								"w-full bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-medium shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2",
						})}
					>
						<span>Start a Project</span>
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	);
}
