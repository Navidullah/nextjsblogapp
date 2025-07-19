/*"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMenu } from "react-icons/hi";
import { ModeToggle } from "./ModeToggle";
import AuthLinks from "../authlinks/AuthLinks";
//import AuthLinks from "../authlinks/AuthLinksClient";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <>
      <Sheet>
        <SheetTrigger className="flex justify-center items-center">
          <HiMenu className="text-[32px] text-primary" />
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <Link href="/" className="mt-32 mb-48 text-center">
            <h1 className="text-4xl font-semibold cursor-pointer text-primary">
              Blog.
            </h1>
          </Link>
          <nav className="flex flex-col justify-center items-center gap-8">
            {navItems.map((navItem, index) => {
              return (
                <Link
                  href={navItem.href}
                  key={index}
                  className={`${
                    navItem.href === pathname && "text-primary"
                  } text-[18px] capitalize hover:text-primary transition-all`}
                >
                  {navItem.label}
                </Link>
              );
            })}
            <AuthLinks />
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNav;
*/
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HiMenu, HiX } from "react-icons/hi";
import { ModeToggle } from "./ModeToggle";
import AuthLinks from "../authlinks/AuthLinks";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", exact: true },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <HiMenu className="text-2xl text-primary" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col w-[300px] sm:w-[350px]"
        onInteractOutside={() => setOpen(false)}
      >
        <div className="flex justify-end mt-4">
          <SheetTrigger
            aria-label="Close menu"
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <HiX className="text-2xl" />
          </SheetTrigger>
        </div>

        <Link
          href="/"
          className="mt-8 mb-12 text-center"
          onClick={() => setOpen(false)}
        >
          <h1 className="text-4xl font-semibold text-primary hover:opacity-80 transition-opacity">
            Blog.
          </h1>
        </Link>

        <nav className="flex flex-col items-center gap-6 flex-grow">
          {navItems.map(({ label, href, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Link
                href={href}
                key={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-xl capitalize px-4 py-2 rounded-md transition-all",
                  isActive
                    ? "text-primary font-medium bg-primary/10"
                    : "hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}

          <div className="mt-8 w-full px-4">
            <AuthLinks mobile onNavigate={() => setOpen(false)} />
          </div>

          <div className="mt-auto mb-8">
            <ModeToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default MobileNav;
