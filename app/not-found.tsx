"use client";

// pages/404.js
import { useEffect } from "react";

export default function Custom404() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 1); // reload after 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="bg-primary/80">
      {/* <h1>404 - Page Not Found</h1>
      <p>Reloading in 5 seconds...</p> */}
    </div>
  );
}
