ALTER TABLE "users" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "basic" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "academic" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "psycological" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "interpersonal" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "physical" SET DATA TYPE text;