import * as z from "zod";

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
});
