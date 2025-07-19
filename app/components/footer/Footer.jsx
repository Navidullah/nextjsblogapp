// components/Footer.jsx
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t dark:border-muted p-6">
      <div className="wrapper flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo or Site Name */}
        <div className="  sm:w-auto mb-2 sm:mb-0">
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

        {/* Navigation Links */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition">
            Home
          </a>
          <a href="/" className="hover:text-foreground transition">
            Tuitions
          </a>
          <a href="/" className="hover:text-foreground transition">
            Blog
          </a>
          <a href="/contact" className="hover:text-foreground transition">
            Contact
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-muted-foreground">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-muted-foreground mt-4">
        © {new Date().getFullYear()} EchoEmpact. All rights reserved.
      </div>
    </footer>
  );
}
