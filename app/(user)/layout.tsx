import Navbar from "@/components/user/Navbar";
import React from "react";

function UserLayout({
  about,
  disease,
  home,
}: {
  about: React.ReactNode;
  disease: React.ReactNode;
  home: React.ReactNode;
}) {
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
