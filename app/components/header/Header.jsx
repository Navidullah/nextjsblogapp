/*import React from "react";
import ClientHeader from "./ClientHeader";
import { ModeToggle } from "./ModeToggle";
import MobileNav from "./MobileNav";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div
        className="
        fixed top-0 w-full z-50
        py-4 xl:py-6 
        bg-white/20 dark:bg-gray-900/20 
        backdrop-blur-md 
        border-b border-black/10 dark:border-gray-700/30
      "
      >
        <div className="wrapper flex justify-between items-center">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logodesign.png"
              width={150}
              height={150}
              alt="logo"
              className="text-3xl"
            />
          </Link>
          <div className="flex items-center gap-8">
            <ClientHeader />
            <ModeToggle />
            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
*/
import ClientHeader from "./ClientHeader";
import { ModeToggle } from "./ModeToggle";
import MobileNav from "./MobileNav";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 py-4 xl:py-6 bg-white/20 dark:bg-gray-900/20 backdrop-blur-md border-b border-black/10 dark:border-gray-700/30">
      <div className="wrapper flex justify-between items-center">
        {/* Logo with priority loading */}
        <Link href="/" className="cursor-pointer" aria-label="Home">
          <Image
            src="/logodesign.png"
            width={150}
            height={150}
            alt="Website Logo"
            priority
            className="text-3xl hover:opacity-90 transition-opacity"
          />
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          {/* Suspense for client-side components */}
          <Suspense fallback={<LoadingSpinner size="small" />}>
            <ClientHeader />
          </Suspense>

          <ModeToggle />

          {/* Mobile navigation */}
          <div className="xl:hidden ml-2">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
