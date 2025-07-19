"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const isLoading = status === "loading" || loading;

  const Spinner = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      className="flex flex-col items-center justify-center gap-4"
    >
      <Loader2
        className="animate-spin text-indigo-600 dark:text-indigo-400"
        size={44}
      />
      <span className="font-semibold text-lg tracking-wide">
        Preparing your sign in...
      </span>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center  overflow-hidden">
      {/* Login Card centered */}
      <div className="relative z-10 flex items-center justify-center w-full h-full min-h-screen">
        <div className="w-full max-w-md px-4">
          {error === "OAuthAccountNotLinked" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 text-red-600 text-center font-semibold"
            >
              You already have an account with this email but with another
              provider.
              <br />
              Please sign in using your original provider.
            </motion.div>
          )}
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                className="w-full flex items-center justify-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.35 }}
              >
                <Spinner />
              </motion.div>
            ) : (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  className="
                    w-80 max-w-full min-h-[450px]
                    flex flex-col justify-center
                    shadow-2xl border border-indigo-400/30
                    bg-white/40 dark:bg-zinc-900/40
                    backdrop-blur-lg
                    transition
                    glass-card
                  "
                >
                  <CardHeader className="flex flex-col items-center gap-4 w-full">
                    <CardTitle className="text-3xl text-center font-mono font-bold pt-4">
                      Welcome back!
                    </CardTitle>
                    <CardDescription>
                      We’re glad to see you again.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 w-full flex-1 flex flex-col justify-center">
                    <div className="flex flex-col gap-3 w-full">
                      <button
                        onClick={async () => {
                          setLoading(true);
                          await signIn("google");
                        }}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded hover:bg-indigo-50 dark:hover:bg-indigo-900 transition font-medium text-base disabled:opacity-60"
                      >
                        <FcGoogle size={22} />
                        Continue with Google
                      </button>
                      <button
                        onClick={async () => {
                          setLoading(true);
                          await signIn("github");
                        }}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded hover:bg-indigo-50 dark:hover:bg-indigo-900 transition font-medium text-base disabled:opacity-60"
                      >
                        <FaGithub size={22} />
                        Continue with GitHub
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
