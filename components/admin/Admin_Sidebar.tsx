"use client";

// React
import React, { useState, useEffect } from "react";
//Next
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
//Icons
import {
  RiHome5Line,
  RiTableLine,
  RiBarChart2Line,
  RiUserLine,
} from "react-icons/ri";
//Shadcn
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: RiHome5Line,
  },
  {
    title: "Table",
    url: "/admin/table",
    icon: RiTableLine,
  },
  {
    title: "Chart",
    url: "/admin/chart",
    icon: RiBarChart2Line,
  },

  {
    title: "User",
    url: "/admin/users",
    icon: RiUserLine,
  },
];

export function Admin_Sidebar() {
  const pathname = usePathname();
  const [activeRoute, setActiveRoute] = useState("/admin");

  useEffect(() => {
    setActiveRoute(pathname);
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" className="fomt= border-none shadow-md">
      <SidebarContent className="bg-light">
        {/* Header */}
        <SidebarHeader className="flex flex-row">
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
        </SidebarHeader>

        {/*   Content */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-primary">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => {
                const isActive = activeRoute === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={`${isActive ? "bg-primary text-light" : "text-dark"} hover:bg-primary hover:text-light rounded-md py-[21px] font-medium`}
                    >
                      <Link href={item.url} className="text-4xl">
                        <item.icon className="text-3xl" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>BananaCare</p>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
