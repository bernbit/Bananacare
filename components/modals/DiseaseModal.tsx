import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { MdClose, MdLock } from "react-icons/md";
import Link from "next/link";

const DiseaseModal = ({
  isOpen,
  onClose,
  disease,
  session,
}: {
  isOpen: boolean;
  onClose: () => void;
  disease: any;
  session: any;
}) => {
  if (!isOpen || !disease) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-light flex h-[95vh] flex-col overflow-y-auto border-none md:min-w-[48vw] md:px-10">
        <AlertDialogHeader className="h-fit text-left">
          <AlertDialogTitle className="flex items-center">
            <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
              {disease.title}
            </p>
            <AlertDialogCancel
              onClick={onClose}
              className="border-none text-right shadow-none hover:cursor-pointer hover:opacity-70"
            >
              <MdClose className="size-6" />
            </AlertDialogCancel>
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="flex h-full flex-col">
          <div className="relative h-96 w-full overflow-hidden rounded-t-md">
            <Image
              src={disease.image}
              fill
              alt={disease.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="bg-dark text-light w-full flex-1 rounded-b-md px-4 py-4">
            <p className="text-primary text-lg font-semibold">
              {disease.title}
            </p>
            <p className="text-justify">{disease.description}</p>
          </div>
        </div>

        {/* Overlay */}
        {!session && (
          <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-black/70 px-6 md:px-20">
            <div className="bg-light flex h-[70%] w-full flex-col items-center justify-center gap-4 rounded-md px-10">
              <div className="flex flex-col items-center justify-center p-4">
                <MdLock className="text-primary mx-1 text-4xl" />
                <p className="text-primary text-center text-lg font-bold">
                  Login Required
                </p>
                <p className="text-dark text-center text-sm">
                  Log in to continue and make the most of BananaCare's full
                  functionality
                </p>
              </div>

              <div className="flex w-full flex-col gap-2">
                <Link href="/login" passHref>
                  <AlertDialogCancel
                    onClick={onClose}
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
  );
};

export default DiseaseModal;
