"use client";

import {
	Bot,
	Cpu,
	FolderKanban,
	Globe,
	Laptop,
	Mail,
	MessageCircle,
	MessageSquareQuote,
	Moon,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { GithubIcon } from "@/components/layout/social-icons";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { useLanguage } from "@/context/language-context";
import { BRAND_DATA } from "@/data/portfolio-data";

export function openCommandPalette() {
	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event("open-command-palette"));
	}
}

export function CommandMenu() {
	const [open, setOpen] = React.useState(false);
	const { language, toggleLanguage, t } = useLanguage();
	const { theme, setTheme } = useTheme();

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};

		const handleOpenEvent = () => setOpen(true);

		document.addEventListener("keydown", down);
		window.addEventListener("open-command-palette", handleOpenEvent);

		return () => {
			document.removeEventListener("keydown", down);
			window.removeEventListener("open-command-palette", handleOpenEvent);
		};
	}, []);

	const runCommand = (command: () => void) => {
		setOpen(false);
		command();
	};

	const navigateTo = (hash: string) => {
		runCommand(() => {
			const el = document.querySelector(hash);
			if (el) {
				el.scrollIntoView({ behavior: "smooth" });
			} else {
				window.location.hash = hash;
			}
		});
	};

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			title="Karvion Command Palette"
			description="Search sections, trigger workflows, or switch language and theme"
			className="border-white/15 bg-background/95 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 max-w-xl"
		>
			<CommandInput
				placeholder={
					language === "en"
						? "Type a command or search sections..."
						: "কমান্ড টাইপ করুন অথবা সেকশন খুঁজুন..."
				}
			/>
			<CommandList className="max-h-80 p-2">
				<CommandEmpty className="text-muted-foreground text-xs py-6">
					{language === "en" ? "No results found." : "কোনো ফলাফল পাওয়া যায়নি।"}
				</CommandEmpty>

				{/* Quick Section Navigation */}
				<CommandGroup
					heading={language === "en" ? "Section Navigation" : "সেকশন নেভিগেশন"}
				>
					<CommandItem
						onSelect={() => navigateTo("#services")}
						className="cursor-pointer"
					>
						<Bot className="size-4 text-cyan-400 mr-2" />
						<span>{t("navServices")}</span>
						<CommandShortcut>#services</CommandShortcut>
					</CommandItem>

					<CommandItem
						onSelect={() => navigateTo("#workflow-builder")}
						className="cursor-pointer"
					>
						<Cpu className="size-4 text-teal-400 mr-2" />
						<span>
							{language === "en" ? "AI Workflow Studio" : "অটোমেশন স্টুডিও"}
						</span>
						<CommandShortcut>#studio</CommandShortcut>
					</CommandItem>

					<CommandItem
						onSelect={() => navigateTo("#projects")}
						className="cursor-pointer"
					>
						<FolderKanban className="size-4 text-violet-400 mr-2" />
						<span>{t("navProjects")}</span>
						<CommandShortcut>#projects</CommandShortcut>
					</CommandItem>

					<CommandItem
						onSelect={() => navigateTo("#tech-stack")}
						className="cursor-pointer"
					>
						<Cpu className="size-4 text-teal-400 mr-2" />
						<span>{t("navTechStack")}</span>
						<CommandShortcut>#tech-stack</CommandShortcut>
					</CommandItem>

					<CommandItem
						onSelect={() => navigateTo("#testimonials")}
						className="cursor-pointer"
					>
						<MessageSquareQuote className="size-4 text-emerald-400 mr-2" />
						<span>{t("navTestimonials")}</span>
						<CommandShortcut>#reviews</CommandShortcut>
					</CommandItem>

					<CommandItem
						onSelect={() => navigateTo("#contact")}
						className="cursor-pointer"
					>
						<Mail className="size-4 text-amber-400 mr-2" />
						<span>{t("navContact")}</span>
						<CommandShortcut>#contact</CommandShortcut>
					</CommandItem>
				</CommandGroup>

				<CommandSeparator className="my-1.5 border-white/10" />

				{/* Quick Preferences & System Actions */}
				<CommandGroup
					heading={
						language === "en" ? "Language & Preferences" : "ভাষা ও পার্সোনালাইজেশন"
					}
				>
					<CommandItem
						onSelect={() => runCommand(toggleLanguage)}
						className="cursor-pointer"
					>
						<Globe className="size-4 text-cyan-400 mr-2" />
						<span>
							{language === "en"
								? "বাংলা ভাষায় পরিবর্তন করুন (Switch to Bangla)"
								: "Switch to English (ইংরেজি ভাষা)"}
						</span>
						<CommandShortcut>{language === "en" ? "BN" : "EN"}</CommandShortcut>
					</CommandItem>

					<CommandItem
						onSelect={() =>
							runCommand(() =>
								setTheme(
									theme === "dark"
										? "light"
										: theme === "light"
											? "system"
											: "dark",
								),
							)
						}
						className="cursor-pointer"
					>
						{theme === "dark" ? (
							<Sun className="size-4 text-amber-400 mr-2" />
						) : theme === "light" ? (
							<Moon className="size-4 text-violet-400 mr-2" />
						) : (
							<Laptop className="size-4 text-muted-foreground mr-2" />
						)}
						<span>
							{language === "en" ? "Toggle Theme" : "থিম পরিবর্তন করুন"}
						</span>
						<CommandShortcut className="capitalize">
							{theme || "dark"}
						</CommandShortcut>
					</CommandItem>
				</CommandGroup>

				<CommandSeparator className="my-1.5 border-white/10" />

				{/* External Channels */}
				<CommandGroup
					heading={language === "en" ? "Direct Channels" : "সরাসরি চ্যানেলসমূহ"}
				>
					<CommandItem
						onSelect={() =>
							runCommand(() =>
								window.open(
									"https://wa.me/8801840624022?text=Hello%20Abdullah%2C%20I%20am%20reaching%20out%20via%20Karvion%20Command%20Palette.",
									"_blank",
									"noopener,noreferrer",
								),
							)
						}
						className="cursor-pointer"
					>
						<MessageCircle className="size-4 text-emerald-400 mr-2" />
						<span>
							{language === "en" ? "Chat on WhatsApp" : "হোয়াটসঅ্যাপে চ্যাট করুন"}
						</span>
						<CommandShortcut>WhatsApp</CommandShortcut>
					</CommandItem>

					<CommandItem
						onSelect={() =>
							runCommand(() =>
								window.open(
									BRAND_DATA.socials.github,
									"_blank",
									"noopener,noreferrer",
								),
							)
						}
						className="cursor-pointer"
					>
						<GithubIcon className="size-4 text-muted-foreground mr-2" />
						<span>GitHub Repository & Source</span>
						<CommandShortcut>GitHub</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
