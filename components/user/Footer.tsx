"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";

function Footer() {
  const sectionIds = ["home", "disease", "about", "contact"];
  const [activeNav, setActiveNav] = useState<string>("home");
  const activeNavRef = useRef(activeNav);
  useEffect(() => {
    const handleScroll = () => {
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            if (activeNavRef.current !== id) {
              activeNavRef.current = id;
              setActiveNav(id);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveNav(id);
    activeNavRef.current = id;
  };

  return (
    <footer className="bg-dark mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 py-10 lg:flex-row">
          <a
            href="https://pagedone.io/"
            className="flex basis-[30%] justify-center gap-2"
          >
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
          </a>
          <ul className="flex-1 items-center justify-center gap-14 text-center transition-all duration-500 sm:flex lg:gap-10 xl:gap-14">
            {sectionIds.map((id) => (
              <li
                className="hover:text-primary my-2 text-white sm:my-0"
                key={id}
                onClick={() => handleNavClick(id)}
              >
                {id === "contact"
                  ? "Contact Us"
                  : id.charAt(0).toUpperCase() + id.slice(1)}
              </li>
            ))}
          </ul>
          <div className="flex basis-[30%] space-x-2 sm:justify-center">
            <div className="flex h-[35] items-center gap-2 rounded-md border border-gray-400 px-2">
              <MdOutlineEmail className="text-primary text-2xl" />
              <input
                type="text"
                name="email"
                className="rounded-md text-white placeholder:text-gray-400 focus:outline-none"
                placeholder="Contact"
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-light rounded-md px-6 font-medium"
            >
              Send
            </button>
          </div>
        </div>

        <div className="flex flex-col border-t border-gray-700 py-7 lg:flex-row">
          <div className="basis-[30%]"></div>
          <div className="flex flex-1 items-center justify-center">
            <span className="text-gray-400">
              ©
              <a
                href="https://pagedone.io/"
                className="text-primary font-clash-grotesk font-medium"
              >
                Banana<span className="text-secondary">Care </span>
              </a>
              2024, All rights reserved.
            </span>
          </div>
          <div className="basis-[30%]"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
