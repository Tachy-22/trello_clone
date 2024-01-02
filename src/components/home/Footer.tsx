import React from "react";
import LogoWhite from "../LogoWhite";
import { SignInButton } from "@clerk/nextjs";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full flex flex-col lg:mt-[5rem] mt-[1rem] gap-3 bg-slate-900 text-white">
      <div className="py-[2rem] max-w-7xl lg:flex hidden items-start  border-b mx-auto ">
        <div className="w-full scale-[40%]">
          <LogoWhite />
          <div className="text-white">
            <SignInButton />
          </div>
        </div>
        <ul className="flex gap-3 justify-between text-white">
          {sections.map((section, index) => (
            <li
              key={index}
              className="flex-1  rounded-lg p-4 hover:bg-gray-500/50 "
              style={{ minWidth: "200px" }} // Adjust the width as needed
            >
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <p className="text-white">{section.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-7xl mx-auto p-[2rem] md:flex-row flex gap-3 flex-col justify-between w-full items-center">
        <span className="w-fit">Copyright © 2023 Atlassian</span>
        <div className="flex items-center justify-center space-x-4 w-fit">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link?.url}
              target="_blank"
              className="rounded-full border p-1"
            >
              {link?.icon}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;

const sections = [
  {
    title: "About Trello",
    description: "What’s behind the boards.",
  },
  {
    title: "Jobs",
    description: "Learn about open roles on the Trello team.",
  },
  {
    title: "Apps",
    description: "Download the Trello App for your Desktop or Mobile devices.",
  },
  {
    title: "Contact us",
    description: "Need anything? Get in touch and we can help.",
  },
];

const socialLinks = [
  {
    url: "Twitter",
    icon: <TwitterIcon />,
  },
  {
    url: "Instagram",
    icon: <InstagramIcon />,
  },
  {
    url: "Facebook",
    icon: <FacebookIcon />,
  },
  {
    url: "LinkedIn",
    icon: <LinkedinIcon />,
  },
  // Add more social links as needed
];
