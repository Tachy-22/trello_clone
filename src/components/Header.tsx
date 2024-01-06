"use client";
import React, { useEffect, useMemo } from "react";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import ProgressBar from "./ProgressBar";
import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { updateUserDbData } from "@/lib/redux-toolkit/boardSlice";
import { useAppSelector } from "@/lib/redux-toolkit/hooks";

export default function Header({
  dbData,
}: {
  dbData: userDbDataType | null | undefined;
}) {
  const dispatch = useDispatch();
  const { userDbData } = useAppSelector((state) => state.board);
  const { isLoaded } = useAuth();
  useEffect(() => {
    userDbData === null &&
      dbData !== undefined &&
      dbData !== null &&
      dispatch(updateUserDbData(dbData));
  }, [dispatch, dbData, userDbData]);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = useMemo(
    () => [
      { href: "/", text: "Home" },
      {
        href: `/dashboard/${dbData?.id as string}/view`,
        text: "Dashboard",
      },
      { href: "/contact", text: "Contact" },
      { href: "/about", text: "About" },
    ],
    [dbData?.id]
  );

  return (
    <>
      <Navbar
        className=" h-[4rem]"
        isBordered
        onMenuOpenChange={() => setIsMenuOpen((prev) => !prev)}
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {navLinks.map((link, index) => (
            <NavbarItem
              key={index}
              //   isActive={true}
            >
              <Link  className="text-primary dark:text-secondary" href={link.href}>
                {link.text}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {!isLoaded && (
          <NavbarContent justify="end">
            <NavbarItem className="hidden ">
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem>
              <div className="rounded-lg p-2 px-[2rem] hover:bg-black/10 transition-color duration-200">
                <SignUpButton />
              </div>
            </NavbarItem>
            <NavbarItem>
              <div className="rounded-lg hover:bg-blue-300 animate-pulse p-2 px-[2rem] bg-blue-400 text-white ">
                <SignInButton />
              </div>
            </NavbarItem>
          </NavbarContent>
        )}
        {isLoaded && (
          <NavbarContent justify="end">
            <NavbarItem className="flex ">
              <ThemeSwitcher />
            </NavbarItem>

            <NavbarItem>
              <UserButton />
            </NavbarItem>
          </NavbarContent>
        )}

        <NavbarMenu>
          {navLinks.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full" href={item.href} size="lg">
                {item.text}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
      <ProgressBar />{" "}
    </>
  );
}
