"use client";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function LikeButton({ initialLikes, blogSlug }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    if (liked) return; // Prevent multiple likes per user (simple client-side)
    setLiked(true);
    const res = await fetch(`/api/blogs/${blogSlug}/like`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setLikes(data.likesCount);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1 px-3 py-2 rounded ${
        liked ? "text-red-600" : "text-gray-600 dark:text-gray-300"
      } hover:bg-gray-100 dark:hover:bg-zinc-800 transition`}
    >
      <Heart className={`w-5 h-5 ${liked ? "fill-red-600" : ""}`} />
      <span className="font-semibold">{likes}</span>
      <span className="ml-1">{likes === 1 ? "Like" : "Likes"}</span>
    </button>
  );
}
