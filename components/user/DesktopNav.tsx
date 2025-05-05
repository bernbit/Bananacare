"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function DesktopNav() {
  const { data: session, status } = useSession();

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

  const onLogout = async () => {
    await signOut();
  };

  return (
    <ul className="hidden flex-1 flex-row items-center justify-end gap-4 font-semibold md:flex">
      {sectionIds.map((id) => (
        <li
          key={id}
          className={`hover:text-primary whitespace-nowrap hover:cursor-pointer ${
            activeNav === id ? "text-primary" : "text-dark"
          }`}
          onClick={() => handleNavClick(id)}
        >
          {id === "contact"
            ? "Contact Us"
            : id.charAt(0).toUpperCase() + id.slice(1)}
        </li>
      ))}

      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "authenticated" && session?.user ? (
        <>
          <p className="text-dark">Welcome, {session.user.name}</p>
          <button
            className="text-light rounded-md bg-red-600 px-6 py-1 hover:opacity-70"
            onClick={onLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="bg-primary text-light rounded-md px-8 py-1 hover:cursor-pointer hover:opacity-70"
        >
          Login
        </Link>
      )}

      {/* <Link
        href="/login"
        className="bg-primary text-light rounded-md px-8 py-1 hover:cursor-pointer hover:opacity-70"
      >
        Login
      </Link>

      <button
        className="text-light rounded-md bg-red-600 px-6 py-1 hover:opacity-70"
        onClick={onLogout}
      >
        Logout
      </button> */}
    </ul>
  );
}

export default DesktopNav;
