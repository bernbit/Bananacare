import Image from "next/image";

//Client Components
import ScanButton from "@/components/client/ScanButton";
import { ScanForm } from "@/components/client/ScanForm";

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

import { MdClose } from "react-icons/md";

export default function Home() {
  return (
    <div className="mb-10 flex h-full flex-1 flex-col">
      <nav className="bg-light sticky top-0 z-10 flex w-full px-6 py-2 md:px-10 lg:px-28">
        <div className="flex flex-1 items-center gap-2">
          <Image
            src="/img/BananaCare-Logomark.svg"
            width={50}
            height={50}
            alt="BananaCare Logomark"
          />

          <Image
            src="/img/BananaCare-Wordmark.svg"
            width={130}
            height={60}
            alt="BananaCare Wordmark"
          />
        </div>

        {/* Mobile Nav Links */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <label className="flex w-8 flex-col gap-2">
            <input className="peer hidden" type="checkbox" />
            <div className="bg-primary h-[3px] w-1/2 origin-right rounded-2xl duration-500 peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px] peer-checked:rotate-[225deg]"></div>
            <div className="bg-primary h-[3px] w-full rounded-2xl duration-500 peer-checked:-rotate-45"></div>
            <div className="bg-primary h-[3px] w-1/2 origin-left place-self-end rounded-2xl duration-500 peer-checked:translate-x-[12px] peer-checked:translate-y-[1px] peer-checked:rotate-[225deg]"></div>
          </label>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden flex-1 flex-row items-center justify-end gap-4 font-semibold md:flex">
          <li className="text-primary hover:text-primary whitespace-nowrap hover:cursor-pointer">
            <a href="#home">Home</a>
          </li>
          <li className="hover:text-primary whitespace-nowrap hover:cursor-pointer">
            <a href="#disease">Disease</a>
          </li>
          <li className="hover:text-primary whitespace-nowrap hover:cursor-pointer">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-primary whitespace-nowrap hover:cursor-pointer">
            Contact Us
          </li>

          <button className="bg-primary text-light rounded-md px-8 py-1 hover:cursor-pointer hover:opacity-70">
            Login
          </button>
        </ul>
      </nav>

      {/* Home */}
      <main
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
            Protect your crops, maximize your yield, and farm smarter—all in
            just a few clicks.
          </p>

          <div className="flex justify-center gap-5 lg:w-[70%]">
            <AlertDialog>
              <AlertDialogTrigger className="bg-primary text-light flex-1 rounded-md px-8 py-2 font-medium hover:cursor-pointer hover:opacity-70">
                Scan Now
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-light h-[95vh] overflow-y-auto border-none md:min-w-[48vw] md:px-10">
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

                {/* <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter> */}
              </AlertDialogContent>
            </AlertDialog>

            <button className="bg-secondary text-dark flex-1 rounded-md px-8 py-2 font-medium hover:cursor-pointer hover:opacity-70">
              More Info
            </button>
          </div>
        </div>
      </main>

      {/* Disease */}
      <div
        className="mt-10 flex scroll-mt-20 flex-col items-center justify-center gap-3 px-6 md:px-10 lg:px-28"
        id="disease"
      >
        <div className="text-center">
          <p className="font-clash-grotesk text-primary text-2xl font-semibold md:text-4xl">
            <span className="text-secondary">Banana</span> Disease & Care
          </p>
          <p>Identify diseases and keep your banana plants thriving</p>
        </div>

        <div className="bg-primary/20 flex flex-col flex-wrap items-center justify-center gap-2 px-6 py-6 md:flex-row md:rounded-md">
          <div className="bg-primary flex w-96 flex-col items-center justify-center rounded-md px-4 py-4 shadow-black/65">
            <div className="relative h-96 w-full overflow-hidden rounded-t-md">
              <Image
                src="/img/Banana-Black-Sigatoka.jpg"
                fill
                alt="Banana Tree Hero"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-dark text-light w-full rounded-b-md px-4 py-4">
              <p className="text-lg font-semibold">
                Banana Black Sigatoka Disease
              </p>
              <p>
                A fungal infection causing dark streaks on leaves, reducing
                yield. <span className="text-secondary">Learn more...</span>
              </p>
            </div>
          </div>

          <div className="bg-primary flex w-96 flex-col items-center justify-center rounded-md px-4 py-4 shadow-black/65">
            <div className="relative h-96 w-full overflow-hidden rounded-t-md">
              <Image
                src="/img/Banana-Cordana.jpg"
                fill
                alt="Banana Tree Hero"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-dark text-light w-full rounded-b-md px-4 py-4">
              <p className="text-lg font-semibold">Banana Cordana Disease</p>
              <p>
                A fungal infection causing dark streaks on leaves, reducing
                yield. <span className="text-secondary">Learn more...</span>
              </p>
            </div>
          </div>

          <div className="bg-primary flex w-96 flex-col items-center justify-center rounded-md px-4 py-4 shadow-black/65">
            <div className="relative h-96 w-full overflow-hidden rounded-t-md">
              <Image
                src="/img/Banana-Bract-Mosaic-Virus.jpg"
                fill
                alt="Banana Tree Hero"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-dark text-light w-full rounded-b-md px-4 py-4">
              <p className="text-lg font-semibold">
                Banana Bract Mosaic Virus Disease
              </p>
              <p>
                A fungal infection causing dark streaks on leaves, reducing
                yield. <span className="text-secondary">Learn more...</span>
              </p>
            </div>
          </div>

          <div className="bg-primary flex w-96 flex-col items-center justify-center rounded-md px-4 py-4 shadow-black/65">
            <div className="relative h-96 w-full overflow-hidden rounded-t-md">
              <Image
                src="/img/Banana-Moko.jpg"
                fill
                alt="Banana Tree Hero"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-dark text-light w-full rounded-b-md px-4 py-4">
              <p className="text-lg font-semibold">Banana Moko Disease</p>
              <p>
                A fungal infection causing dark streaks on leaves, reducing
                yield. <span className="text-secondary">Learn more...</span>
              </p>
            </div>
          </div>

          <div className="bg-primary flex w-96 flex-col items-center justify-center rounded-md px-4 py-4 shadow-black/65">
            <div className="relative h-96 w-full overflow-hidden rounded-t-md">
              <Image
                src="/img/Banana-Panama.jpg"
                fill
                alt="Banana Tree Hero"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-dark text-light w-full rounded-b-md px-4 py-4">
              <p className="text-lg font-semibold">Banana Panama Disease</p>
              <p>
                A fungal infection causing dark streaks on leaves, reducing
                yield. <span className="text-secondary">Learn more...</span>
              </p>
            </div>
          </div>

          <div className="bg-primary flex w-96 flex-col items-center justify-center rounded-md px-4 py-4 shadow-black/65">
            <div className="relative h-96 w-full overflow-hidden rounded-t-md">
              <Image
                src="/img/Banana-Healthy.jpg"
                fill
                alt="Banana Tree Hero"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="bg-dark text-light w-full rounded-b-md px-4 py-4">
              <p className="text-lg font-semibold">Banana Healty</p>
              <p>
                A fungal infection causing dark streaks on leaves, reducing
                yield. <span className="text-secondary">Learn more...</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div
        className="mt-10 flex scroll-mt-20 flex-col gap-3 px-6 md:px-10 lg:px-28"
        id="about"
      >
        <div className="text-center">
          <p className="font-clash-grotesk text-primary text-2xl font-semibold md:text-4xl">
            <span className="text-secondary">Get to Know </span> BananaCare
          </p>
          <p>Uncover how BananaCare is redefining banana disease detection</p>
        </div>

        <div className="flex flex-col gap-4 md:mt-14 md:flex-row">
          <div className="mt-10 flex-1 md:mt-0">
            <div
              className={`border-extra bg- shadow-custom dark:bg-dark-tertiary bg-primary/20 relative min-h-full basis-1/2 rounded-md border dark:border-none dark:shadow-none`}
            >
              <div className="bg-light absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 transform overflow-hidden rounded-full">
                <Image
                  src="/img/About.svg"
                  fill
                  alt="Banana Tree Hero"
                  // className="w-[98%] md:w-[95%]"
                />
              </div>

              <div className="flex flex-col rounded-md px-8 pt-16 pb-4 text-justify">
                <p className="text-primary text-center text-lg font-bold">
                  About BananaCare
                </p>
                <p className="font-medium">
                  BananaCare is a cutting-edge system that ds farmers with
                  real-time insights, enabling early disease detection and
                  healthier crops for sustainable farming.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex-1 md:mt-0">
            <div
              className={`border-extra bg- shadow-custom dark:bg-dark-tertiary bg-primary/20 relative min-h-full basis-1/2 rounded-md border dark:border-none dark:shadow-none`}
            >
              <div className="bg-light absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 transform overflow-hidden rounded-full">
                <Image
                  src="/img/Mission.svg"
                  fill
                  alt="Banana Tree Hero"
                  // className="w-[98%] md:w-[95%]"
                />
              </div>
              <div className="flex-col rounded-md px-8 pt-16 pb-4 text-justify">
                <p className="text-primary text-center text-lg font-bold">
                  BananaCare Mission
                </p>
                <p className="font-medium">
                  Our mission is to equip farmers with a reliable, user-friendly
                  tool for early banana disease detection, enabling swift action
                  to safeguard their crops and ensure healthy yields.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex-1 md:mt-0">
            <div
              className={`border-extra bg- shadow-custom dark:bg-dark-tertiary bg-primary/20 relative min-h-full basis-1/2 rounded-md border dark:border-none dark:shadow-none`}
            >
              <div className="bg-light absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 transform overflow-hidden rounded-full">
                <Image
                  src="/img/Goal.svg"
                  fill
                  alt="Banana Tree Hero"
                  // className="w-[98%] md:w-[95%]"
                />
              </div>
              <div className="flex-col rounded-md px-8 pt-16 pb-4 text-justify">
                <p className="text-primary text-center text-lg font-bold">
                  BananaCare Goal
                </p>
                <p className="font-medium">
                  Our goal is to ensure healthier banana plants and higher
                  yields through faster, more accurate disease detection,
                  empowering farmers to take proactive measures for sustainable
                  farming.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* <div className="fixed inset-0 z-50 flex hidden items-center justify-center bg-black/50">
        <div className="bg-light flex w-[90vw] flex-col overflow-y-auto rounded-lg px-6 py-6 text-left md:w-[46vw] md:px-14 md:py-10">
          <div className="flex items-center">
            <h1 className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
              Scan Banana Disease
            </h1>
            <MdClose className="text-dark text-2xl" />
          </div>

          <ScanForm />
        </div>
      </div> */}
    </div>
  );
}
