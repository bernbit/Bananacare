"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";

function UserLayout({
  auth,
  home,
  disease,
  contact,
  about,
}: {
  auth: React.ReactNode;
  home: React.ReactNode;
  disease: React.ReactNode;
  contact: React.ReactNode;
  about: React.ReactNode;
}) {
  useEffect(() => {
    if (window.location.hash === "#_=_") {
      // Remove the fragment
      history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  return (
    <div className="flex h-full flex-1 flex-col">
      <Navbar />

      {auth}
      {home}
      {disease}
      {about}
      {contact}
      <Footer />
    </div>
  );
}

export default UserLayout;
