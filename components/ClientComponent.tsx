"use client";

import React, { ReactNode } from "react";

export function ClientComponent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
