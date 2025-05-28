"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <NavigationMenuTrigger>
                <div className="flex items-center gap-2 hover:cursor-pointer hover:opacity-70">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-dark text-base">
                    {session?.user?.name
                      ? session.user.name.trim().split(" ")[0]
                      : ""}
                  </p>
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-light flex h-fit min-w-[200px] flex-col gap-2 !border-none py-4 !shadow-none !ring-0 !outline-none">
                <div className="flex flex-col gap-2 font-normal">
                  <div className="bg-primary/80 text-light flex flex-col rounded-sm px-2 py-1">
                    <p>{`${session?.user.name}`}</p>
                    <p className="text-light/80 text-sm font-light">
                      {`${session?.user.email}`}
                    </p>
                  </div>
                  <p className="hover:bg-primary hover:text-light rounded-sm px-2 py-1 text-base hover:cursor-pointer hover:opacity-70">
                    Change Password
                  </p>
                  <p className="hover:bg-primary hover:text-light rounded-sm px-2 py-1 text-base hover:cursor-pointer hover:opacity-70">
                    Edit Profile
                  </p>
                  <p className="hover:text-light rounded-sm px-2 py-1 text-base text-red-600 hover:cursor-pointer hover:bg-red-600 hover:opacity-70">
                    Delete Account
                  </p>
                </div>
                <button
                  className="text-light rounded-md bg-red-600 px-6 py-1 hover:opacity-70"
                  onClick={onLogout}
                >
                  Logout
                </button>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <Link
          href="/login"
          prefetch={true}
          className="bg-primary text-light rounded-md px-8 py-1 hover:cursor-pointer hover:opacity-70"
        >
          Login
        </Link>
      )}
    </ul>
  );
}

export default DesktopNav;
