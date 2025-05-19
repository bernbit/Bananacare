import Image from "next/image";
import React from "react";

function page() {
  return (
    <section
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
            className={`border-dark/40 bg- shadow-custom dark:bg-dark-tertiary bg-primary/20 relative min-h-full basis-1/2 rounded-md border dark:border-none dark:shadow-none`}
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
            className={`border-dark/40 bg- shadow-custom dark:bg-dark-tertiary bg-primary/20 relative min-h-full basis-1/2 rounded-md border dark:border-none dark:shadow-none`}
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
            className={`border-dark/40 bg- shadow-custom dark:bg-dark-tertiary bg-primary/20 relative min-h-full basis-1/2 rounded-md border dark:border-none dark:shadow-none`}
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
                Our goal is to ensure healthier banana plants and higher yields
                through faster, more accurate disease detection, empowering
                farmers to take proactive measures for sustainable farming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
