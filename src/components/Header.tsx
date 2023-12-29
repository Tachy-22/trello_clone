"use client";
import React, { useEffect } from "react";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import ProgressBar from "./ProgressBar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Logo from "./Logo";

export default function Header() {
  //   const { isLoaded, userId } = useAuth();
  //   const { isSignedIn, user } = useUser();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  //  console.log("user :", userId, isSignedIn, user, isLoaded);

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/dashboard", text: "Dashboard" },
    { href: "/contact", text: "Contact" },
    { href: "/about", text: "About" },
  ];

  return (
    <>
      <Navbar
        className="bg-white"
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
              <Link className="text-gray-600" href={link.href}>
                {link.text}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {false && (
          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <ThemeSwitcher />
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}
        {true && (
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex">
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
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href={item.href}
                size="lg"
              >
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
