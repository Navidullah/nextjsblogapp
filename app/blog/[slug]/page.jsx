import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Eye, Heart } from "lucide-react";
import CommentSection from "@/app/components/commentsection/CommentSection";
import LikeButton from "@/app/components/likebutton/LikeButton";
import EditButton from "@/app/components/blog/EditButton";

// This component runs on the server by default in Next.js App Router
export default async function SingleBlogPage(props) {
  // In Next.js 15+, params is async:
  const { params } = await props;

  // Fetch the blog post by slug from your API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();
  const blog = await res.json();

  return (
    <div className="blogwrapper py-12 px-4">
      {/* Edit button for blog */}
      <EditButton blog={blog} />
      {/* Blog title */}
      <h1 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {blog.title}
      </h1>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
        <span>
          {blog.date
            ? new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : ""}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-4 h-4" /> {blog.views || 0}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="w-4 h-4" /> {blog.likesCount || 0}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> {blog.commentsCount || 0}
        </span>
      </div>

      {/* Blog main image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover mb-8 border"
        />
      )}

      {/* Category and author */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary text-white">
          {blog.category}
        </span>
        <span className="text-xs text-gray-400 ml-2">
          by
          <span className="ml-1 font-medium text-black dark:text-white">
            {blog.author}
          </span>
        </span>
        {blog.authorImage && (
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-7 h-7 rounded-full object-cover ml-2 border"
          />
        )}
      </div>
      <LikeButton initialLikes={blog.likesCount} blogSlug={blog.slug} />

      {/* Blog content (rich text) */}
      <div
        className="tiptap max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
      <CommentSection blogSlug={blog.slug} />

      {/* Back to home link */}
      <div className="mt-8">
        <Link href="/" className="text-indigo-600 hover:underline">
          ← Back to all blogs
        </Link>
      </div>
    </div>
  );
}
