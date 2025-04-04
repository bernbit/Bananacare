"use client";
import React, { ReactNode } from "react";

interface ScanButtonProps {
  children: ReactNode;
  className?: string;
}

function ScanButton({ className = "", children }: ScanButtonProps) {
  return (
    <button className={className} onClick={() => alert("Scan Now")}>
      {children}
    </button>
  );
}

export default ScanButton;
