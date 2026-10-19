"use client";

import NumberFlow from "@number-flow/react";
import {
	Activity,
	ArrowLeft,
	Bot,
	CheckCircle2,
	Clock,
	Database,
	Layers,
	LogOut,
	Mail,
	RefreshCw,
	Search,
	Shield,
	Terminal,
	User,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { logoutAdmin, updateLeadStatus } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Lead, SystemEvent, WorkflowBlueprint } from "@/db/schema";

interface AdminDashboardViewProps {
	initialLeads: Lead[];
	initialEvents: SystemEvent[];
	initialBlueprints: WorkflowBlueprint[];
}

export function AdminDashboardView({
	initialLeads,
	initialEvents,
	initialBlueprints,
}: AdminDashboardViewProps) {
	const [leadsList, setLeadsList] = useState<Lead[]>(initialLeads);
	const [activeTab, setActiveTab] = useState<"leads" | "events" | "blueprints">(
		"leads",
	);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [isPending, startTransition] = useTransition();

	const handleStatusChange = (
		leadId: number,
		newStatus: "new" | "contacted" | "closed",
	) => {
		startTransition(async () => {
			const res = await updateLeadStatus(leadId, newStatus);
			if (res.success) {
				setLeadsList((prev) =>
					prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)),
				);
				toast.success(`Lead #${leadId} marked as ${newStatus}`);
			} else {
				toast.error("Failed to update status");
			}
		});
	};

	const filteredLeads = leadsList.filter((lead) => {
		const matchesSearch =
			lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lead.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
			lead.message.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			statusFilter === "all" || lead.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	const totalLeads = leadsList.length;
	const newLeadsCount = leadsList.filter((l) => l.status === "new").length;
	const totalEvents = initialEvents.length;
	const totalBlueprints = initialBlueprints.length;

	return (
		<div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
			{/* Top Navigation Bar */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
				<div className="space-y-1">
					<div className="flex items-center gap-2">
						<Link
							href="/"
							className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors gap-1 mr-2"
						>
							<ArrowLeft className="size-3.5" />
							<span>Back to Site</span>
						</Link>
						<Badge
							variant="outline"
							className="border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[10px] tracking-wide"
						>
							INTERNAL TELEMETRY
						</Badge>
					</div>
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
						<span>Executive Operations Hub</span>
						<span className="size-2 rounded-full bg-emerald-400" />
					</h1>
					<p className="text-xs sm:text-sm text-muted-foreground">
						Live client inquiries, telemetry event streams, and Drizzle SQLite
						audit logs.
					</p>
				</div>

				<div className="flex items-center gap-3">
					<Badge
						variant="outline"
						className="border-white/15 bg-white/5 text-muted-foreground font-mono text-xs py-1 px-3"
					>
						<Database className="size-3.5 mr-1.5 text-cyan-400 inline" />
						SQLite / Drizzle ORM
					</Badge>
					<Button
						variant="outline"
						size="sm"
						onClick={() => window.location.reload()}
						className="h-8 border-white/15 bg-white/5 hover:bg-white/10 text-xs text-foreground cursor-pointer"
					>
						<RefreshCw className="size-3.5 mr-1 text-muted-foreground" />
						Refresh
					</Button>
					<Button
						variant="outline"
						size="sm"
						disabled={isPending}
						onClick={() => {
							startTransition(async () => {
								await logoutAdmin();
								toast.info("Session locked. Admin logged out.");
								window.location.reload();
							});
						}}
						className="h-8 border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-xs text-rose-300 cursor-pointer"
					>
						<LogOut className="size-3.5 mr-1" />
						Lock
					</Button>
				</div>
			</div>

			{/* KPI Bento Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="border-white/10 bg-neutral-900/60 backdrop-blur-md rounded-xl p-5">
					<CardHeader className="p-0 pb-2 flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-xs font-mono uppercase text-muted-foreground">
							Total Inbound Leads
						</CardTitle>
						<User className="size-4 text-cyan-400" />
					</CardHeader>
					<CardContent className="p-0">
						<div className="text-2xl sm:text-3xl font-bold font-mono text-foreground">
							<NumberFlow value={totalLeads} />
						</div>
						<p className="text-[11px] text-muted-foreground mt-1">
							{newLeadsCount} awaiting response
						</p>
					</CardContent>
				</Card>

				<Card className="border-white/10 bg-neutral-900/60 backdrop-blur-md rounded-xl p-5">
					<CardHeader className="p-0 pb-2 flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-xs font-mono uppercase text-muted-foreground">
							Audit Event Logs
						</CardTitle>
						<Activity className="size-4 text-teal-400" />
					</CardHeader>
					<CardContent className="p-0">
						<div className="text-2xl sm:text-3xl font-bold font-mono text-teal-300">
							<NumberFlow value={totalEvents} />
						</div>
						<p className="text-[11px] text-muted-foreground mt-1">
							Real-time system telemetry
						</p>
					</CardContent>
				</Card>

				<Card className="border-white/10 bg-neutral-900/60 backdrop-blur-md rounded-xl p-5">
					<CardHeader className="p-0 pb-2 flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-xs font-mono uppercase text-muted-foreground">
							Saved Blueprints
						</CardTitle>
						<Layers className="size-4 text-violet-400" />
					</CardHeader>
					<CardContent className="p-0">
						<div className="text-2xl sm:text-3xl font-bold font-mono text-violet-300">
							<NumberFlow value={totalBlueprints} />
						</div>
						<p className="text-[11px] text-muted-foreground mt-1">
							Custom architecture exports
						</p>
					</CardContent>
				</Card>

				<Card className="border-white/10 bg-neutral-900/60 backdrop-blur-md rounded-xl p-5">
					<CardHeader className="p-0 pb-2 flex flex-row items-center justify-between space-y-0">
						<CardTitle className="text-xs font-mono uppercase text-muted-foreground">
							System Reliability
						</CardTitle>
						<Shield className="size-4 text-emerald-400" />
					</CardHeader>
					<CardContent className="p-0">
						<div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">
							100%
						</div>
						<p className="text-[11px] text-muted-foreground mt-1">
							Zero downtime / Healthy
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Main Content Tabs & Data Views */}
			<div className="space-y-4">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
					{/* Tab Navigation */}
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => setActiveTab("leads")}
							className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
								activeTab === "leads"
									? "bg-white/10 text-foreground border border-white/15"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Mail className="size-3.5 inline mr-1.5" />
							Client Inquiries ({totalLeads})
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("events")}
							className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
								activeTab === "events"
									? "bg-white/10 text-foreground border border-white/15"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Terminal className="size-3.5 inline mr-1.5" />
							Telemetry Stream ({totalEvents})
						</button>

						<button
							type="button"
							onClick={() => setActiveTab("blueprints")}
							className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
								activeTab === "blueprints"
									? "bg-white/10 text-foreground border border-white/15"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							<Bot className="size-3.5 inline mr-1.5" />
							Workflow Blueprints ({totalBlueprints})
						</button>
					</div>

					{/* Search & Filter for Leads */}
					{activeTab === "leads" && (
						<div className="flex items-center gap-2">
							<div className="relative">
								<Search className="size-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Search name, email, service..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="h-8 pl-8 text-xs bg-white/5 border-white/15 w-48 sm:w-64"
								/>
							</div>

							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								aria-label="Filter inquiries by status"
								className="h-8 text-xs bg-neutral-900 border border-white/15 rounded-md px-2 text-foreground outline-none cursor-pointer"
							>
								<option value="all">All Statuses</option>
								<option value="new">New</option>
								<option value="contacted">Contacted</option>
								<option value="closed">Closed</option>
							</select>
						</div>
					)}
				</div>

				{/* Tab 1: Inbound Leads Table */}
				{activeTab === "leads" && (
					<Card className="border-white/10 bg-neutral-900/50 backdrop-blur-md rounded-xl overflow-hidden">
						{filteredLeads.length === 0 ? (
							<div className="text-center py-16 text-muted-foreground space-y-2">
								<Mail className="size-8 mx-auto opacity-30" />
								<div className="text-sm">No client inquiries found.</div>
								<p className="text-xs text-muted-foreground/60">
									Submissions via the contact form or API appear here
									automatically.
								</p>
							</div>
						) : (
							<div className="overflow-x-auto">
								<table className="w-full text-left text-xs">
									<thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-mono text-[10px]">
										<tr>
											<th className="py-3 px-4">Client</th>
											<th className="py-3 px-4">Service & Budget</th>
											<th className="py-3 px-4">Message</th>
											<th className="py-3 px-4">Status</th>
											<th className="py-3 px-4">Received</th>
											<th className="py-3 px-4 text-right">Action</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-white/5">
										{filteredLeads.map((lead) => (
											<tr
												key={lead.id}
												className="hover:bg-white/[0.02] transition-colors"
											>
												<td className="py-3 px-4">
													<div className="font-semibold text-foreground">
														{lead.name}
													</div>
													<div className="text-[11px] text-muted-foreground font-mono">
														{lead.email}
													</div>
												</td>
												<td className="py-3 px-4">
													<Badge
														variant="outline"
														className="text-[10px] font-mono border-cyan-500/30 text-cyan-300 bg-cyan-500/10 mb-0.5"
													>
														{lead.service}
													</Badge>
													<div className="text-[10px] text-muted-foreground">
														{lead.budget}
													</div>
												</td>
												<td className="py-3 px-4 max-w-xs">
													<p className="truncate text-muted-foreground text-[11px]">
														{lead.message}
													</p>
												</td>
												<td className="py-3 px-4">
													<Badge
														variant="outline"
														className={`text-[10px] font-mono uppercase ${
															lead.status === "new"
																? "border-amber-500/30 text-amber-300 bg-amber-500/10"
																: lead.status === "contacted"
																	? "border-cyan-500/30 text-cyan-300 bg-cyan-500/10"
																	: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10"
														}`}
													>
														{lead.status}
													</Badge>
												</td>
												<td className="py-3 px-4 text-muted-foreground font-mono text-[10px] whitespace-nowrap">
													{lead.createdAt}
												</td>
												<td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
													{lead.status === "new" && (
														<Button
															size="sm"
															variant="outline"
															disabled={isPending}
															onClick={() =>
																handleStatusChange(lead.id, "contacted")
															}
															className="h-7 text-[10px] px-2 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 cursor-pointer"
														>
															<CheckCircle2 className="size-3 mr-1" />
															Mark Contacted
														</Button>
													)}
													{lead.status === "contacted" && (
														<Button
															size="sm"
															variant="outline"
															disabled={isPending}
															onClick={() =>
																handleStatusChange(lead.id, "closed")
															}
															className="h-7 text-[10px] px-2 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 cursor-pointer"
														>
															Mark Closed
														</Button>
													)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</Card>
				)}

				{/* Tab 2: System Telemetry & Audit Stream */}
				{activeTab === "events" && (
					<Card className="border-white/10 bg-neutral-900/50 backdrop-blur-md rounded-xl p-5">
						<div className="space-y-3">
							<div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
								<span>EVENT STREAM JOURNAL</span>
								<span>PERSISTED IN SQLITE</span>
							</div>

							<div className="space-y-2 max-h-96 overflow-y-auto font-mono text-xs">
								{initialEvents.length === 0 ? (
									<div className="text-center py-12 text-muted-foreground/60">
										No telemetry events logged yet.
									</div>
								) : (
									initialEvents.map((evt) => (
										<div
											key={evt.id}
											className="p-3 rounded-lg bg-black/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
										>
											<div className="flex items-center gap-2">
												<span className="size-2 rounded-full bg-cyan-400" />
												<span className="text-foreground font-semibold">
													{evt.eventName}
												</span>
												{evt.metadata && (
													<span className="text-[10px] text-muted-foreground truncate max-w-md">
														{evt.metadata}
													</span>
												)}
											</div>
											<div className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
												<Clock className="size-3" />
												<span>{evt.timestamp}</span>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</Card>
				)}

				{/* Tab 3: Workflow Blueprints */}
				{activeTab === "blueprints" && (
					<Card className="border-white/10 bg-neutral-900/50 backdrop-blur-md rounded-xl p-5">
						<div className="space-y-3">
							<div className="text-xs text-muted-foreground font-mono">
								SAVED ARCHITECTURE BLUEPRINTS
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{initialBlueprints.length === 0 ? (
									<div className="col-span-2 text-center py-12 text-muted-foreground/60">
										No custom blueprints saved yet. Use the Live Workflow Studio
										on the homepage to save blueprints.
									</div>
								) : (
									initialBlueprints.map((bp) => (
										<div
											key={bp.id}
											className="p-4 rounded-xl border border-white/10 bg-white/[0.02] space-y-2"
										>
											<div className="flex items-center justify-between">
												<Badge
													variant="outline"
													className="text-[10px] font-mono border-violet-500/30 text-violet-300 bg-violet-500/10"
												>
													{bp.preset}
												</Badge>
												<span className="text-[10px] font-mono text-muted-foreground">
													{bp.createdAt}
												</span>
											</div>
											<div className="font-semibold text-sm text-foreground">
												{bp.title}
											</div>
											<div className="text-xs text-muted-foreground flex items-center gap-3 pt-1">
												<span>Saved by: {bp.savedBy}</span>
												<span>Savings: {bp.estimatedSavings}</span>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</Card>
				)}
			</div>
		</div>
	);
}
