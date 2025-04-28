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

export const scanSchema = z.object({
  file: z.array(z.instanceof(File)).min(1, { message: "File is required." }),
  name: z.string().min(2, {
    message: "Provide Full Name",
  }),
  address: z.string().min(1, {
    message: "Adrress is required.",
  }),
  age: z.coerce
    .number()
    .min(1, {
      message: "Age must be at least 1",
    })
    .max(120, {
      message: "Age must be less than 120",
    }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number is too long" })
    .regex(/^\+?[0-9]+$/, { message: "Invalid phone number format" }),
});
