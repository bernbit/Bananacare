"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaVirus } from "react-icons/fa";
import { MdContacts, MdHome, MdInfo } from "react-icons/md";

function MobileNav() {
  const [activeNav, setActiveNav] = useState<string>("home");

  const sectionIds = ["home", "disease", "about", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = activeNav;

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if the section is at least partially in view
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            currentSection = id;
            break;
          }
        }
      }

      if (currentSection !== activeNav) {
        setActiveNav(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeNav]);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveNav(id);
  };
  return (
    <nav className="flex flex-1 items-center justify-end md:hidden">
      <label className="flex w-8 flex-col gap-2">
        {/* Hamburger Menu */}
        <input className="peer hidden" type="checkbox" />
        <div className="bg-primary h-[3px] w-1/2 origin-right rounded-2xl duration-500 peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px] peer-checked:rotate-[225deg]"></div>
        <div className="bg-primary h-[3px] w-full rounded-2xl duration-500 peer-checked:-rotate-45"></div>
        <div className="bg-primary h-[3px] w-1/2 origin-left place-self-end rounded-2xl duration-500 peer-checked:translate-x-[12px] peer-checked:translate-y-[1px] peer-checked:rotate-[225deg]"></div>

        {/* Overlay */}
        <div className="pointer-events-none fixed inset-0 h-screen w-screen opacity-0 transition-opacity duration-300 peer-checked:pointer-events-auto peer-checked:bg-black/50 peer-checked:opacity-100"></div>

        {/* Sliding Side Menu */}
        <div className="bg-light fixed top-0 left-0 z-40 flex h-screen w-[55%] -translate-x-full flex-col transition-transform duration-500 ease-in-out peer-checked:translate-x-0">
          <div className="flex items-center gap-2 px-3 py-2">
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

          <ul className="flex flex-1 flex-col gap-3 py-4 font-semibold">
            <p className="text-primary px-3 text-sm font-medium">Menu</p>

            {/* Home */}
            <li
              className={`hover:bg-primary hover:text-light flex items-center gap-3 px-3 py-3 whitespace-nowrap hover:cursor-pointer ${activeNav === "home" ? "bg-primary text-light" : "text-dark"}`}
              onClick={() => handleNavClick("home")}
            >
              <MdHome className="text-xl" />
              <p className="text-base">Home</p>
            </li>

            {/* Disease */}
            <li
              className={`hover:bg-primary hover:text-light flex items-center gap-3 px-3 py-3 whitespace-nowrap hover:cursor-pointer ${activeNav === "disease" ? "bg-primary text-light" : "text-dark"}`}
              onClick={() => handleNavClick("disease")}
            >
              <FaVirus className="text-xl" />
              <p className="text-base">Disease</p>
            </li>

            {/* About */}
            <li
              className={`hover:bg-primary hover:text-light flex items-center gap-3 px-3 py-3 whitespace-nowrap hover:cursor-pointer ${activeNav === "about" ? "bg-primary text-light" : "text-dark"}`}
              onClick={() => handleNavClick("about")}
            >
              <MdInfo className="text-xl" />
              <p className="text-base">About</p>
            </li>

            {/* Contact */}
            <li
              className={`hover:bg-primary hover:text-light flex items-center gap-3 px-3 py-3 whitespace-nowrap hover:cursor-pointer ${activeNav === "contact" ? "bg-primary text-light" : "text-dark"}`}
              onClick={() => handleNavClick("contact")}
            >
              <MdContacts className="text-xl" />
              <p className="text-base">Contact</p>
            </li>
          </ul>

          <div className="border-test px-3 py-10">
            <Link
              href={"/login"}
              className="bg-primary text-light flex-1 rounded-md px-8 py-1 hover:cursor-pointer hover:opacity-70"
            >
              Login
            </Link>
          </div>
        </div>
      </label>
    </nav>
  );
}

export default MobileNav;
