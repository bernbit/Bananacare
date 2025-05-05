import Navbar from "@/components/user/Navbar";
import React from "react";
import { auth as nextAuth } from "@/lib/auth";

async function UserLayout({
  about,
  disease,
  home,
  auth,
}: {
  about: React.ReactNode;
  disease: React.ReactNode;
  home: React.ReactNode;
  auth: React.ReactNode;
}) {
  // const session = await nextAuth();
  // console.log("Main Session", session);

  return (
    <div className="mb-10 flex h-full flex-1 flex-col">
      <Navbar />

      {auth}
      {home}
      {disease}
      {about}
    </div>
  );
}

export default UserLayout;
