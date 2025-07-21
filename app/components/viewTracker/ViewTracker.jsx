"use client";
import { useEffect } from "react";

export default function ViewTracker({ slug }) {
  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blogViews/${slug}/view`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          console.error("Failed to increment views");
        }
      })
      .catch(console.error);
  }, [slug]);

  return null;
}
