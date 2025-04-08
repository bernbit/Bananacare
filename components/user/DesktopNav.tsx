"use client";

import React, { useState, useEffect } from "react";

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

import { LoginForm } from "@/components/user/LoginForm";

function DesktopNav() {
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
    <ul className="hidden flex-1 flex-row items-center justify-end gap-4 font-semibold md:flex">
      <li
        className={`hover:text-primary whitespace-nowrap hover:cursor-pointer ${activeNav === "home" ? "text-primary" : "text-dark"}`}
        onClick={() => handleNavClick("home")}
      >
        Home
      </li>
      <li
        className={`hover:text-primary whitespace-nowrap hover:cursor-pointer ${activeNav === "disease" ? "text-primary" : "text-dark"}`}
        onClick={() => handleNavClick("disease")}
      >
        Disease
      </li>
      <li
        className={`hover:text-primary whitespace-nowrap hover:cursor-pointer ${activeNav === "about" ? "text-primary" : "text-dark"}`}
        onClick={() => handleNavClick("about")}
      >
        About
      </li>
      <li
        className={`hover:text-primary whitespace-nowrap hover:cursor-pointer ${activeNav === "contact" ? "text-primary" : "text-dark"}`}
        onClick={() => handleNavClick("contact")}
      >
        Contact Us
      </li>

      <AlertDialog>
        <AlertDialogTrigger className="bg-primary text-light rounded-md px-8 py-1 hover:cursor-pointer hover:opacity-70">
          Login
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-light flex h-[95vh] flex-col overflow-y-auto border-none md:min-w-[45vw] md:px-10">
          <AlertDialogHeader className="h-fit text-left">
            <AlertDialogTitle className="flex items-center">
              <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
                Login
              </p>
              <AlertDialogCancel className="border-none text-right shadow-none hover:cursor-pointer hover:opacity-70">
                <MdClose className="size-6" />
              </AlertDialogCancel>
            </AlertDialogTitle>
          </AlertDialogHeader>

          <LoginForm />
        </AlertDialogContent>
      </AlertDialog>

      <div className="bg-primary hidden h-12 w-12 rounded-full"></div>
    </ul>
  );
}

export default DesktopNav;
