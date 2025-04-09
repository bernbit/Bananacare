"use server";

import { signIn, signOut } from "@/lib/auth";

export async function handleLogin(formData: any) {
  try {
    // console.log(formData);
    const result = await signIn("credentials", formData);
    console.log("Sign-in Success", result);
    // Handle success, maybe redirect or return a response
  } catch (err: any) {
    console.log("Error during sign-in:", err.message); // Log only the error message
  }
}

export async function handleLogout() {
  try {
    const result = await signOut();
    console.log("Sign-out Success", result);
    // Handle success, maybe redirect or return a response
  } catch (err: any) {
    console.log("Error during sign-in:", err.message); // Log only the error message
  }
}
