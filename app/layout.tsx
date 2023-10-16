import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from 'sonner';


const inter = Inter({ subsets: ["latin"] });

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
      <html lang="en" className="m-0 p-0" >
        <body className={`bg-slate-50 ${inter.className} h-screen w-full m-0 p-0`}>
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
