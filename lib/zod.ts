import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, { message: "Your password must be at least 8 characters long." })
    .max(20, { message: "Your password can't be more than 20 characters" })
    .regex(/^(?=.*[A-Z])(?=.*[0-9])/, {
      message:
        "Include at least one uppercase letter and one number in your password.",
    }),
});

export const signUpSchema = loginSchema.extend({
  name: z.string().min(2, {
    message: "Please enter your full name.",
  }),
});
