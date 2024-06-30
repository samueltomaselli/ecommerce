"use server";

import { LoginSchema } from "@/types/login-schema";
import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sendVerificationEmail } from "./email";
import { signIn } from "../auth";
import { AuthError } from "next-auth";

const action = createSafeActionClient();

export const emailSignIn = action(LoginSchema, async ({ email, password, code }) => {
  try {
    // Check if the user is in the database
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!existingUser) {
      return { error: "Email not found" };
    }

    // If the user is not verified
    if (!existingUser.emailVerified) {
      const verificationToken = await generateEmailVerificationToken(existingUser.email);
      await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);
      return { success: "Confirmation Email Sent!" };
    }

    // 2FA TODO
    console.log(`test`);
    await signIn("credentials", { email, password, redirectTo: "/" });
    return { success: "User signed In" };
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error.type);
      switch (error.type) {
        case "CredentialsSignin":
          return { error: error.name };
        case "AccessDenied":
          return { error: error.message };
        case "OAuthAccountNotLinked":
          return { error: error.message };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
});
