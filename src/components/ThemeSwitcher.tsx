// app/components/ThemeSwitcher.tsx
"use client";

import { motion } from "framer-motion";

import { useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const [isMounted, setMounted] = useState<boolean>();
  const { theme, setTheme } = useTheme();
  const TOGGLE_CLASSES = useMemo(
    () =>
      "text-sm font-medium flex items-center gap-2 px-2 md:pl-3 md:pr-3 py-2 md:py-1 transition-colors relative ",
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`${TOGGLE_CLASSES}  ${
          theme === "light" ? "text-white" : "text-yellow-400"
        }`}
        onClick={() => {
          setTheme("light");
        }}
      >
        <SunIcon className="relative z-10 text-lg md:text-sm" />

        <span className="relative z-10 hidden sm:block">Light</span>
      </button>

      <button
        className={`${TOGGLE_CLASSES}
${theme === "dark" ? "text-white" : "text-slate-400"}`}
        onClick={() => {
          setTheme("dark");
        }}
      >
        <MoonIcon className="relative z-10 text-lg md:text-sm" />

        <span className="relative z-10 hidden sm:block">Dark</span>
      </button>

      <div
        className={`absolute inset-0 z-0 flex ${
          theme === "dark" ? "justify-end" : "justify-start"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-blue-600 dark:from-transparent dark:to-blue-600"
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;
