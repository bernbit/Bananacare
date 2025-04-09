import Navbar from "@/components/user/Navbar";
import React from "react";

// import LoginForm from "@/components/user/LoginForm";
import { auth } from "@/lib/auth";

async function UserLayout({
  about,
  disease,
  home,
}: {
  about: React.ReactNode;
  disease: React.ReactNode;
  home: React.ReactNode;
}) {
  const session = await auth();

  console.log(`${session ? "Login" : "No User"}`);
  return (
    <div className="mb-10 flex h-full flex-1 flex-col">
      <Navbar />
      {home}
      {disease}
      {about}
    </div>
  );
}

export default UserLayout;
