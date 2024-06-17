DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roles" "role" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "customerID";