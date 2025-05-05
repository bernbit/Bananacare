import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const clashGrotesk = localFont({
  src: "../public/fonts/ClashGrotesk/ClashGrotesk-Variable.woff2",
  variable: "--font-clash-grotesk",
});

export const metadata: Metadata = {
  title: "BananaCare",
  description: "Detect Banana Disease with Ease",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body
        className={`${raleway.variable} ${clashGrotesk.variable} text-dark bg-light flex min-h-screen flex-col`}
      >
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
