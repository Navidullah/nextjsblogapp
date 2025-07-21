"use client";
/*

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, SquarePen, User } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const handleWrite = () => {
    if (!session) signIn();
    else router.push("/write");
  };

  const handleLogin = () => signIn();
  const handleLogout = () => signOut();
  const isAdmin = session?.user?.role === "admin";
  console.log(isAdmin);

  return (
    <header className="fixed top-0 w-full z-50 py-3 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-black/10 dark:border-gray-700/30">
      <div className="wrapper flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6 px-2 sm:px-6 h-auto sm:h-16">
        {/* Logo 
        <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width={120}
              height={120}
              alt="Brain-sparks-Logo"
              className="text-3xl font-serif font-bold tracking-tight"
            />
          </Link>
        </div>

        {/* Search bar 
        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto flex-1 flex items-center mb-2 sm:mb-0"
        >
          <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border bg-gray-100 focus:bg-white dark:bg-zinc-900 dark:focus:bg-zinc-800 text-sm sm:text-base"
              autoComplete="off"
            />
          </div>
        </form>

        {/* Actions 
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
          {/* Write Button 
          <Button
            variant="outline"
            className="flex items-center px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base"
            onClick={handleWrite}
          >
            <SquarePen className="mr-1" size={18} />
            <span className="hidden sm:inline">Write</span>
          </Button>
          <ModeToggle />

          {/* Login / Avatar Dropdown *
          {!session ? (
            <Button
              onClick={handleLogin}
              className="ml-1 px-3 py-1 text-sm sm:text-base"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt="User avatar" />
                    ) : (
                      <AvatarFallback>
                        <User className="w-6 h-6" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 mt-2">
                <DropdownMenuLabel>
                  {session.user?.name || "User"}
                  {session.user?.isAdmin && (
                    <span className="ml-2 text-xs text-purple-600 font-bold">
                      (Admin)
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                {/* Admin-only menu *
                {session.user?.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );}
  

*/
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  LogOutIcon,
  Search,
  SquarePen,
  User,
} from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  const handleWrite = () => {
    if (!session) signIn();
    else router.push("/write");
  };

  const handleLogin = () => signIn();
  const handleLogout = () => signOut();

  // Check if admin
  const isAdmin = session?.user?.role === "admin";

  return (
    <header className="fixed top-0 w-full z-50 py-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-black/10 dark:border-gray-700/30">
      <div className=" flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6 px-2 sm:px-6 h-auto sm:h-16">
        {/* Logo */}
        <div className="flex items-center w-full sm:w-auto mb-2 sm:mb-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Brain-sparks-Logo"
              className=" font-serif font-bold tracking-tight"
            />
          </Link>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto flex-1 flex items-center mb-2 sm:mb-0"
        >
          <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border bg-gray-100 focus:bg-white dark:bg-zinc-900 dark:focus:bg-zinc-800 text-sm sm:text-base"
              autoComplete="off"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
          {/* Write Button */}
          <Button
            variant="outline"
            className="flex items-center hover:cursor-pointer"
            onClick={handleWrite}
          >
            <SquarePen className="mr-1" size={18} />
            <span className="hidden sm:inline">Write</span>
          </Button>
          <ModeToggle />

          {/* Login / Avatar Dropdown */}
          {!session ? (
            <Button
              onClick={handleLogin}
              className="ml-1 px-3 py-1 text-sm sm:text-base"
            >
              Login
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    {session.user?.image ? (
                      <AvatarImage src={session.user.image} alt="User avatar" />
                    ) : (
                      <AvatarFallback>
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 mt-2">
                <DropdownMenuLabel>
                  {session.user?.name || "User"}
                  {isAdmin && (
                    <span className="ml-2 text-xs text-purple-600 font-bold">
                      (Admin)
                    </span>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {/* Admin-only menu */}
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className=" cursor-pointer"
                  onClick={handleLogout}
                >
                  {" "}
                  <LogOutIcon />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}
