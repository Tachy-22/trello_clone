import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider, currentUser } from "@clerk/nextjs";

import "./globals.css";
import Header from "@/components/Header";
import NextProvider from "./Providers/NextProvider";
import StoreProvider from "./Providers/StoreProvider";
import registerUser from "@/actions/home/registerUser";
import { Toaster } from "@/components/ui/sonner";
import { User } from "@clerk/nextjs/server";
import RegisterUserProvider from "./Providers/RegisterUserProvider";
// ... (imports)

export const metadata: Metadata = {
  title: "Trello",
  description: "A Trello clone, by Entekume Jeffrey",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // let user = {} as User | null;
  // let userDbData = null;
  // try {
  //   user = await currentUser();
  //   const { firstName = "", lastName = "", emailAddresses = [] } = user as User;
  //   const name = `${firstName} ${lastName}`;
  //   const email = emailAddresses[0]?.emailAddress;
  //   if (email) {
  //     userDbData = await registerUser(email, name);
  //   }
  // } catch (error) {
  //   console.error("Error fetching user data:", error);
  // }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`relative w-full min-h-screen bg-white dark:bg-background`}
      >
        <ClerkProvider>
          <NextProvider>
            <StoreProvider>
              {/* {userDbData && <Header 
              dbData={userDbData as userDbDataType} />} */}
              <RegisterUserProvider>
                {" "}
                <Header />
                {children}
                <Toaster />
              </RegisterUserProvider>
            </StoreProvider>
          </NextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
