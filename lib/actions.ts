"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "./prisma";
import { signUpSchema } from "./zod";
import { executeAction } from "./executeAction";

export async function handleSignup(formData: any) {
  const validatedData = signUpSchema.parse(formData);

  const { name, email, password } = validatedData;

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return { ok: true };
}

export async function handleLogin(formData: any) {
  await executeAction({
    actionFn: async () => {
      await signIn("credentials", formData);
    },
  });
}

export async function handleLogout() {
  await executeAction({
    actionFn: async () => {
      await signOut();
    },
  });
}
