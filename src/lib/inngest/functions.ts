import { inngest } from "./client";

export interface AutomationJobEventData {
	jobId?: string;
	priority?: "low" | "medium" | "high";
}

/**
 * Sample Enterprise Background Automation Job Function
 */
export const executeAutomationJob = inngest.createFunction(
	{
		id: "execute-automation-job",
		name: "Execute Automation Pipeline Job",
		triggers: [{ event: "karvion/automation.job.triggered" }],
	},
	async ({ event, step }) => {
		const data = event.data as AutomationJobEventData;
		const result = await step.run("initialize-job-context", async () => {
			console.log(
				`[INNGEST_AUTOMATION] Processing job: ${data?.jobId || "generic-job"}`,
			);
			return {
				jobId: data?.jobId || "job_default",
				status: "in_progress",
				startedAt: new Date().toISOString(),
			};
		});

		await step.sleep("simulate-worker-latency", "1s");

		const finalStatus = await step.run("finalize-job", async () => {
			console.log(
				`[INNGEST_AUTOMATION] Completed pipeline execution for: ${result.jobId}`,
			);
			return {
				...result,
				status: "completed",
				finishedAt: new Date().toISOString(),
			};
		});

		return finalStatus;
	},
);

export const inngestFunctions = [executeAutomationJob];
