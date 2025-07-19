/*"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const AuthLinks = ({ pathname }) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("🟢 Session:", session);
  }, [session]);

  const linkClasses = (href) =>
    `text-[18px] transition-all duration-300 px-2 py-1 ${
      pathname === href ? "text-primary border-primary" : "hover:text-primary"
    }`;

  if (status === "loading") return null;

  return (
    <>
      {status === "authenticated" ? (
        <>
          <Link href="/dashboard" className={linkClasses("/dashboard")}>
            Dashboard
          </Link>
          <span
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-[18px] px-2 py-1 hover:text-primary cursor-pointer"
          >
            Logout
          </span>
        </>
      ) : (
        <Link href="/login" className={linkClasses("/login")}>
          Login
        </Link>
      )}
    </>
  );
};

export default AuthLinks;
*/
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming you're using shadcn/ui
import { Loader2 } from "lucide-react";

const AuthLinks = ({ mobile = false, onNavigate }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const getLinkClasses = (href) => {
    const baseClasses = "text-[18px] transition-all duration-300 px-2 py-1";
    const activeClasses =
      pathname === href ? "text-primary font-medium" : "hover:text-primary";
    const mobileClasses = mobile ? "block w-full text-center py-3 px-4" : "";

    return `${baseClasses} ${activeClasses} ${mobileClasses}`;
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center p-2">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className={mobile ? "w-full space-y-4" : "flex items-center gap-4"}>
      {status === "authenticated" ? (
        <>
          <Link
            href="/dashboard"
            className={getLinkClasses("/dashboard")}
            onClick={() => mobile && onNavigate?.()}
            aria-label="Dashboard"
          >
            Dashboard
          </Link>
          {mobile ? (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                signOut({ callbackUrl: "/" });
                onNavigate?.();
              }}
            >
              Logout
            </Button>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className={getLinkClasses("/logout")}
              aria-label="Logout"
            >
              Logout
            </button>
          )}
        </>
      ) : (
        <>
          <Link
            href="/login"
            className={getLinkClasses("/login")}
            onClick={() => mobile && onNavigate?.()}
            aria-label="Login"
          >
            Login
          </Link>
          {mobile && (
            <Link
              href="/register"
              className={getLinkClasses("/register")}
              onClick={() => mobile && onNavigate?.()}
              aria-label="Register"
            >
              Register
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default AuthLinks;
