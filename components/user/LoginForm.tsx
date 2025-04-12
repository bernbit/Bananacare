"use client";

//React
import React from "react";
//Next
import Image from "next/image";
import Link from "next/link";

//Shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/lib/zod";
//Actions
import { handleLogin, handleLogout } from "@/lib/actions";

function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await handleLogin(values);
  }

  return (
    <div className="flex flex-1 flex-col gap-2 md:flex-col">
      {/* Login Form */}
      <div className="flex-1 py-4">
        <p className="text-secondary text-center text-xl font-bold">
          Hello <span className="text-primary">Again!</span>
        </p>
        <p className="text-center text-sm">
          Sign in to continue your experience and access full features.
        </p>

        <Form {...form}>
          <form
            // action={handleLogin}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-4 pt-4"
          >
            {/* Email Input Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-dark flex flex-col gap-1">
                  <FormLabel className="text-primary font-semibold">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark placeholder:text-dark/60 rounded-sm font-medium focus-visible:ring-1"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Password Input Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="text-dark flex flex-col gap-1">
                  <FormLabel className="text-primary font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark placeholder:text-dark/60 rounded-sm font-medium focus-visible:ring-1"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="text-light text-base hover:cursor-pointer"
            >
              Login
            </Button>
          </form>
        </Form>

        <p className="py-4 text-center text-sm">
          Doesn't have an account?
          <Link
            href={"/signup"}
            className="text-primary hover:cursor-pointer hover:opacity-70"
          >
            {" "}
            Create one
          </Link>
        </p>
      </div>

      {/* Social Media Login */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2 py-2">
          <hr className="flex-1" />
          <p className="text-primary text-center font-medium">or login with</p>
          <hr className="flex-1" />
        </div>

        <button className="border-primary hover:bg-primary/80 hover:text-light flex w-full items-center gap-2 rounded-md border p-2 hover:cursor-pointer">
          <Image
            src="/img/google.png"
            width={25}
            height={25}
            alt="google icon"
          />
          <p className="font-medium">Continue with Google</p>
        </button>

        <button className="border-primary hover:bg-primary/80 hover:text-light flex w-full items-center gap-2 rounded-md border p-2 hover:cursor-pointer">
          <Image
            src="/img/facebook.png"
            width={25}
            height={25}
            alt="google icon"
          />
          <p className="font-medium">Continue with Facebook</p>
        </button>

        <button className="border-primary hover:bg-primary/80 hover:text-light flex w-full items-center gap-2 rounded-md border p-2 hover:cursor-pointer">
          <Image
            src="/img/github.png"
            width={25}
            height={25}
            alt="google icon"
          />
          <p className="font-medium">Continue with GitHub</p>
        </button>
      </div>

      <p className="text-center font-medium">Detect Banana Disease with Ease</p>
    </div>
  );
}

export default LoginForm;
