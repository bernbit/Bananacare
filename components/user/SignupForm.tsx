"use client";

//React
import React, { useState } from "react";
//Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { signUpSchema } from "@/lib/zod";
//Actions
import { handleSignup } from "@/lib/actions";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

function SignupForm({ type = "full" }) {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const result = await handleSignup(values);

    if (result.ok) {
      if (type === "modal") {
        router.push("/login");
      }
      if (type === "full") {
        window.location.href = "/login";
      }
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-2 md:flex-col">
      {/* Login Form */}
      <div className="flex flex-1 flex-col justify-center py-4">
        <p className="text-secondary text-center text-xl font-bold">
          Join <span className="text-primary">Now!</span>
        </p>
        <p className="text-center text-sm">
          Quickly sign up to access all features and personalize your experience
        </p>

        <Form {...form}>
          <form
            // action={handleLogin}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 pt-4"
          >
            {/* Name Input Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-dark flex flex-col gap-1">
                  <FormLabel className="text-primary font-semibold">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark placeholder:text-dark/60 rounded-sm font-medium focus-visible:ring-1"
                      placeholder="Enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

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
                    <div className="focus-within:ring-primary border-dark text-dark focus-within:border-primary flex gap-2 rounded-sm border px-3 font-medium focus-within:ring-1">
                      <Input
                        type={showPassword.password ? "text" : "password"}
                        className="placeholder:text-dark/60 flex-1 border-none p-0 focus-visible:ring-0"
                        placeholder="Enter your password"
                        {...field}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            password: !prev.password,
                          }))
                        }
                        className="text-dark/60"
                        tabIndex={-1}
                      >
                        {showPassword.password ? (
                          <MdVisibilityOff size={20} className="text-dark/60" />
                        ) : (
                          <MdVisibility size={20} className="text-dark/60" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/*Confirm Password Input Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="text-dark flex flex-col gap-1">
                  <FormLabel className="text-primary font-semibold">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="focus-within:ring-primary border-dark text-dark focus-within:border-primary flex gap-2 rounded-sm border px-3 font-medium focus-within:ring-1">
                      <Input
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
                        className="placeholder:text-dark/60 flex-1 border-none p-0 focus-visible:ring-0"
                        placeholder="Enter your password"
                        {...field}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword((prev) => ({
                            ...prev,
                            confirmPassword: !prev.confirmPassword,
                          }))
                        }
                        className="text-dark/60"
                        tabIndex={-1}
                      >
                        {showPassword.confirmPassword ? (
                          <MdVisibilityOff size={20} className="text-dark/60" />
                        ) : (
                          <MdVisibility size={20} className="text-dark/60" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="text-light text-base hover:cursor-pointer"
            >
              Signup
            </Button>
          </form>
        </Form>

        <p className="py-4 text-center text-sm">
          Already have an account? <span> </span>
          {type === "modal" && (
            <Link
              href={"/login"}
              className="text-primary hover:cursor-pointer hover:opacity-70"
            >
              Login Here
            </Link>
          )}
          {type === "full" && (
            <button
              className="text-primary hover:cursor-pointer hover:opacity-70"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login Here
            </button>
          )}
        </p>
      </div>

      <p className="text-center font-medium">Detect Banana Disease with Ease</p>
    </div>
  );
}

export default SignupForm;
