"use client";

import * as React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    console.log("theme button");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer relative rounded-full"
      onClick={toggleTheme}
    >
      <FiSun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
      <FiMoon className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
