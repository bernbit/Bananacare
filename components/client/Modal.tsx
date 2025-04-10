"use client";

import React, { useEffect } from "react";

import { MdClose } from "react-icons/md";

import Link from "next/link";
import { useRouter } from "next/navigation";

type ModalProps = {
  title: string;
  route: string;
  children: React.ReactNode;
};

function Modal({ title, route, children }: ModalProps) {
  const router = useRouter();

  // // Lock scroll when the modal is open
  // useEffect(() => {
  //   document.body.style.overflow = "hidden"; // Prevent scroll

  //   // Cleanup to restore scroll when modal closes
  //   return () => {
  //     document.body.style.overflow = "auto"; // Allow scroll again
  //   };
  // }, []);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="bg-light z-50 flex h-fit max-h-[95vh] w-[95vw] flex-col overflow-y-auto rounded-md border-none px-6 py-6 md:w-[45vw] md:px-10">
        <div className="flex h-fit flex-row text-left">
          <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
            {title}
          </p>
          <Link href={route}>
            <MdClose className="size-6 hover:cursor-pointer hover:opacity-70" />
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
