"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MessageCircle } from "lucide-react";

export default function CommentSection({ blogSlug }) {
  const { data: session } = useSession();
  const user = session?.user;
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ text: "" });
  const [loading, setLoading] = useState(false);

  // Fetch comments
  useEffect(() => {
    fetch(`/api/comments/${blogSlug}`)
      .then((res) => res.json())
      .then(setComments);
  }, [blogSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user && !form.name) return alert("Please enter your name!");
    setLoading(true);

    const res = await fetch("/api/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blogSlug,
        name: user ? user.name : form.name,
        text: form.text,
        userImage: user ? user.image : null,
        userEmail: user ? user.email : null,
      }),
    });

    setLoading(false);
    if (res.ok) {
      setForm({ text: "" });
      fetch(`/api/comments/${blogSlug}`)
        .then((r) => r.json())
        .then(setComments);
    } else {
      alert("Failed to add comment.");
    }
  };

  return (
    <div className="mt-10 max-w-xl">
      <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
        <MessageCircle className="w-5 h-5" /> Comments ({comments.length})
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        {!user && (
          <input
            type="text"
            placeholder="Your name"
            value={form.name || ""}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border px-2 py-1 rounded w-1/2"
            required
          />
        )}
        {user && (
          <div className="flex items-center gap-2 mb-2">
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">{user.name}</span>
          </div>
        )}
        <textarea
          rows={3}
          placeholder="Write a comment..."
          value={form.text}
          onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
          className="border px-2 py-1 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </form>
      <div className="space-y-5">
        {comments.length === 0 && <div>No comments yet.</div>}
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-100 dark:bg-zinc-800 rounded px-4 py-3 shadow flex gap-3"
          >
            {c.userImage ? (
              <img
                src={c.userImage}
                alt={c.name}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-300 flex items-center justify-center text-xl font-bold text-white">
                {c.name ? c.name[0].toUpperCase() : "?"}
              </div>
            )}
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-gray-400 mb-1">
                {new Date(c.date).toLocaleDateString()}
              </div>
              <div>{c.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
