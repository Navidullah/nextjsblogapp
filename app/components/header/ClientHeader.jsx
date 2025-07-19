/*"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import AuthLinks from "../authlinks/AuthLinks";
//import NextAuth from "next-auth";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
];

const ClientHeader = () => {
  const pathname = usePathname();

  return (
    <div className=" h-full">
      <div className="flex justify-between items-center h-full gap-8">
        {/* Navigation Links *
        <div className="hidden xl:flex  justify-around items-center gap-8">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-[18px] transition-all duration-300 px-2 py-1 ${
                  isActive
                    ? "text-primary border-primary"
                    : "hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <AuthLinks />
      </div>
    </div>
  );
};

export default ClientHeader;
*/
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthLinks from "../authlinks/AuthLinks";
import { cn } from "@/lib/utils"; // Utility for class merging

const navItems = [
  { label: "Home", href: "/", exact: true },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

const ClientHeader = () => {
  const pathname = usePathname();

  return (
    <div className="h-full">
      <div className="flex items-center h-full gap-6 xl:gap-8">
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map(({ label, href, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary px-2 py-1",
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-foreground/80"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Auth Links and Mobile Menu */}
        <div className="flex items-center gap-4 xl:gap-6">
          <AuthLinks />

          {/* Mobile menu toggle would go here */}
          {/* You can integrate your MobileNav component */}
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;
