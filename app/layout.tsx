import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from 'sonner';

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: "StudySync",
  description: "Beyond the Books: Your Academic Social Hub.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        // className={`bg-slate-50 ${inter.className} h-screen w-full m-0 p-0`}
        >
          <ConvexClientProvider>
            {children}
            <Toaster
              richColors={true}
              closeButton={true}
              position="top-right"
            />

          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
