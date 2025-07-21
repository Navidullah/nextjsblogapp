"use client";

import { useEffect } from "react";

export default function ViewTracker({ slug }) {
  useEffect(() => {
    if (!slug) return;

    fetch(`/api/blogViews/${slug}/view`, {
      method: "POST",
    });
  }, [slug]);

  return null; // This component doesn't render anything
}
