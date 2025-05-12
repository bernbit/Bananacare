"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/user/Navbar";

function UserLayout({
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
  useEffect(() => {
    if (window.location.hash === "#_=_") {
      // Remove the fragment
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

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
