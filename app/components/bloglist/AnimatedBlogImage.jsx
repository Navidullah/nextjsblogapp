"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimatedBlogImage({ href, src, alt }) {
  return (
    <Link href={href}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[200px] object-contain "
        style={{ minWidth: 180, minHeight: 120, background: "#222" }}
        whileHover={{
          borderColor: "var(--primary)", // Vibrant violet (Tailwind's violet-700)
          scale: 1.04,
          boxShadow: "0 0 16px var(--primary)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </Link>
  );
}
