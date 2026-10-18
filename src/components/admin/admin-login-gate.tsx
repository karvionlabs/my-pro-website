"use client";

import {
	ArrowLeft,
	Eye,
	EyeOff,
	KeyRound,
	Loader2,
	Lock,
	ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { loginAdmin } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AdminLoginGate() {
	const [passkey, setPasskey] = useState("");
	const [showPasskey, setShowPasskey] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const [isPending, startTransition] = useTransition();

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		setErrorMsg("");

		if (!passkey) {
			setErrorMsg("Please enter your Admin Passkey.");
			return;
		}

		startTransition(async () => {
			const res = await loginAdmin(passkey);
			if (res.success) {
				toast.success("Authentication successful. Welcome to Operations Hub.");
				window.location.reload();
			} else {
				setErrorMsg(res.error || "Authentication failed.");
				toast.error("Access denied. Invalid Passkey.");
			}
		});
	};

	return (
		<div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
			{/* Ambient Architectural Grid */}
			<div
				className="fixed inset-0 bg-grid-pattern pointer-events-none -z-10 opacity-40"
				aria-hidden="true"
			/>

			<Card className="w-full max-w-md border-white/10 bg-neutral-900/80 backdrop-blur-2xl shadow-2xl shadow-cyan-500/5 rounded-2xl overflow-hidden p-2 sm:p-4">
				<CardHeader className="text-center space-y-3 pb-4">
					<div className="mx-auto size-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-inner">
						<Lock className="size-5 text-cyan-400" />
					</div>

					<div className="space-y-1">
						<Badge
							variant="outline"
							className="border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-mono tracking-wider uppercase mb-1"
						>
							Restricted Access
						</Badge>
						<CardTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
							Karvion Executive Gate
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Enter your admin passkey to unlock telemetry, client inquiries,
							and database records.
						</p>
					</div>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleLogin} className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center justify-between text-xs">
								<label
									htmlFor="passkey-input"
									className="text-muted-foreground font-medium flex items-center gap-1.5"
								>
									<KeyRound className="size-3.5 text-cyan-400" />
									<span>Master Passkey</span>
								</label>
								<button
									type="button"
									onClick={() => setShowPasskey(!showPasskey)}
									className="text-[11px] text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1 transition-colors"
								>
									{showPasskey ? (
										<>
											<EyeOff className="size-3" />
											<span>Hide</span>
										</>
									) : (
										<>
											<Eye className="size-3" />
											<span>Show</span>
										</>
									)}
								</button>
							</div>

							<div className="relative">
								<Input
									id="passkey-input"
									type={showPasskey ? "text" : "password"}
									value={passkey}
									onChange={(e) => {
										setPasskey(e.target.value);
										if (errorMsg) setErrorMsg("");
									}}
									placeholder="••••••••••••••••"
									disabled={isPending}
									className="h-10 text-xs bg-white/5 border-white/15 focus-visible:border-cyan-500/50 font-mono tracking-wider rounded-lg"
								/>
							</div>

							{errorMsg && (
								<div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-2 font-medium">
									<ShieldAlert className="size-3.5 shrink-0" />
									<span>{errorMsg}</span>
								</div>
							)}
						</div>

						<Button
							type="submit"
							disabled={isPending}
							className="w-full h-10 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold text-xs rounded-lg cursor-pointer transition-all shadow-md shadow-cyan-500/20"
						>
							{isPending ? (
								<>
									<Loader2 className="size-4 animate-spin mr-2" />
									<span>Verifying Signature...</span>
								</>
							) : (
								<span>Unlock Executive Hub</span>
							)}
						</Button>

						<div className="text-center pt-2">
							<Link
								href="/"
								className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors gap-1.5"
							>
								<ArrowLeft className="size-3.5" />
								<span>Return to Public Website</span>
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
