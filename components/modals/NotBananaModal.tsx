import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { MdClose } from "react-icons/md";
import Image from "next/image";

interface NotBananaModalProps {
  open?: boolean;
  onClose: (open: boolean) => void;
}

function NotBananaModal({ open = true, onClose }: NotBananaModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="flex h-[95vh] flex-col overflow-y-auto border-none bg-black/70 md:min-w-[48vw] md:px-10">
        <AlertDialogHeader className="h-fit text-left">
          <AlertDialogTitle className="sr-only flex items-center">
            <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold opacity-0">
              Not a Banana
            </p>
            <AlertDialogCancel className="border-none text-right shadow-none hover:cursor-pointer hover:opacity-70">
              <MdClose className="size-6" />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Image
            src={"/img/Not_Banana.png"}
            // fill
            width={300}
            height={300}
            // className="h-40 w-40"
            alt="Not a Banana"
            unoptimized
          />
          <p className="text-light text-xl font-bold">
            Oops! This is Not a Banana.
          </p>
          <AlertDialogCancel className="text-light w-60 rounded-md border border-red-600 bg-red-600 px-2 py-1 shadow-none">
            Close
          </AlertDialogCancel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default NotBananaModal;
