import Image from "next/image";
import React from "react";

function page() {
  return (
    <section
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
              A fungal infection causing dark streaks on leaves, reducing yield.{" "}
              <span className="text-secondary">Learn more...</span>
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
              A fungal infection causing dark streaks on leaves, reducing yield.{" "}
              <span className="text-secondary">Learn more...</span>
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
              A fungal infection causing dark streaks on leaves, reducing yield.{" "}
              <span className="text-secondary">Learn more...</span>
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
              A fungal infection causing dark streaks on leaves, reducing yield.{" "}
              <span className="text-secondary">Learn more...</span>
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
              A fungal infection causing dark streaks on leaves, reducing yield.{" "}
              <span className="text-secondary">Learn more...</span>
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
              A fungal infection causing dark streaks on leaves, reducing yield.{" "}
              <span className="text-secondary">Learn more...</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
