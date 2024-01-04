import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, currentUser } from "@clerk/nextjs";

import "./globals.css";
import Header from "@/components/Header";
import NextProvider from "./Providers/NextProvider";
import StoreProvider from "./Providers/StoreProvider";
import registerUser from "@/actions/home/registerUser";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Trello",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  console.log("user :", user);

  const name = `${user?.firstName} ${user?.lastName}`;
  const email = user?.emailAddresses[0]?.emailAddress;
  const userDbData = await registerUser(email as string, name);

  console.log("userDbData :", userDbData);
  return (
    <ClerkProvider>
      <html lang="en">
        <NextProvider>
          <StoreProvider>
            <body
              className={` relative w-full min-h-screen    dark:bg-gray-900 bg-white transition-colors duration-250`}
            >
              <Header dbData={userDbData} />
              {children}
              <Toaster />
            </body>
          </StoreProvider>
        </NextProvider>
      </html>
    </ClerkProvider>
  );
}
