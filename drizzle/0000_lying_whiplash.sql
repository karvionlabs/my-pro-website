CREATE TABLE `leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`service` text NOT NULL,
	`budget` text DEFAULT 'Flexible / TBD' NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `system_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`event_name` text NOT NULL,
	`metadata` text,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workflow_blueprints` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`preset` text NOT NULL,
	`steps` text NOT NULL,
	`automation_rate` integer DEFAULT 98 NOT NULL,
	`estimated_savings` text DEFAULT '$1,200/mo' NOT NULL,
	`saved_by` text DEFAULT 'Demo Client' NOT NULL,
	`email` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
