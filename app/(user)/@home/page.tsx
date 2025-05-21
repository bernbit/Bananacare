import React from "react";
import Image from "next/image";

//Client Components
import { ScanForm } from "@/components/client/ScanForm";
import MoreInfoButton from "@/components/user/MoreInfoButton";
import { auth } from "@/lib/auth";

import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MdClose, MdLock } from "react-icons/md";

async function page() {
  const session = await auth();

  return (
    <section
      className="flex flex-1 scroll-mt-20 flex-col justify-between px-6 md:flex-row-reverse md:px-10 lg:px-28"
      id="home"
    >
      <div className="flex flex-1 items-center justify-center">
        <Image
          src="/img/BananaTree-Hero.svg"
          width={400}
          height={400}
          alt="Banana Tree Hero"
          className="w-[98%] md:w-[95%]"
        />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 text-center md:text-left">
        <Image
          src="/img/BananaCare-Wordmark.svg"
          width={120}
          height={50}
          alt="BananaCare Wordmark"
          className="hidden md:block"
        />

        <h1 className="font-clash-grotesk text-2xl font-semibold whitespace-pre-line md:text-3xl lg:text-4xl">
          Detect Banana Disease with Ease
        </h1>
        <p>
          <span className="text-primary font-medium">
            Snap. Upload. Diagnose.
          </span>{" "}
          Instantly detect banana tree diseases with AI-powered analysis.
          Protect your crops, maximize your yield, and farm smarter—all in just
          a few clicks.
        </p>

        <div className="flex justify-center gap-5 lg:w-[70%]">
          <AlertDialog>
            <AlertDialogTrigger className="bg-primary text-light flex-1 rounded-md px-8 py-2 font-medium hover:cursor-pointer hover:opacity-70">
              Scan Now
            </AlertDialogTrigger>

            <AlertDialogContent
              className={`bg-light h-[95vh] border-none md:min-w-[48vw] md:px-10 ${session?.user ? "overflow-y-auto" : "overflow-hidden"}`}
            >
              <AlertDialogHeader className="text-left">
                <AlertDialogTitle className="flex items-center">
                  <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
                    Scan Banana Disease
                  </p>
                  <AlertDialogCancel className="border-none text-right shadow-none hover:cursor-pointer hover:opacity-70">
                    <MdClose className="size-6" />
                  </AlertDialogCancel>
                </AlertDialogTitle>
              </AlertDialogHeader>

              <ScanForm />

              {!session?.user && (
                <div className="absolute z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-black/70 px-6 md:px-20">
                  <div className="bg-light flex h-[70%] w-full flex-col items-center justify-center gap-4 rounded-md px-10">
                    <div className="flex flex-col items-center justify-center p-4">
                      <MdLock className="text-primary mx-1 text-4xl" />
                      <p className="text-primary text-center text-lg font-bold">
                        Login Required
                      </p>
                      <p className="text-dark text-center text-sm">
                        Log in to continue and make the most of BananaCare's
                        full functionality
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-2">
                      <Link href="/login" passHref>
                        <AlertDialogCancel
                          className="bg-primary text-light w-full rounded-md px-1 py-1 text-center hover:cursor-pointer hover:opacity-70"
                          asChild
                        >
                          <span>Login Here</span>
                        </AlertDialogCancel>
                      </Link>
                      <AlertDialogCancel className="bg-dark text-light w-full rounded-md px-1 py-1 hover:cursor-pointer hover:opacity-70">
                        Close
                      </AlertDialogCancel>
                    </div>
                  </div>
                </div>
              )}
            </AlertDialogContent>
          </AlertDialog>

          <MoreInfoButton />
        </div>
      </div>
    </section>
  );
}

export default page;
