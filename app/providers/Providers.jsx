"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
      </NextThemesProvider>
    </SessionProvider>
  );
}
