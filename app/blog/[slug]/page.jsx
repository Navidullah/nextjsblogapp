import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Eye, Heart } from "lucide-react";
import CommentSection from "@/app/components/commentsection/CommentSection";
import LikeButton from "@/app/components/likebutton/LikeButton";
import EditButton from "@/app/components/blog/EditButton";
import { getRelatedBlogs } from "@/app/api/getRelatedBlogs/route";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

import ViewTrackerWrapper from "@/app/blogviews/[slug]/ViewTrackerWrapper";
import { enhanceBlogHtml } from "@/app/components/blogeditor/enhanceBlogHtml";

// import this at top

// 👇 1. Generate SEO metadata
export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return {};

  const blog = await res.json();
  return {
    title: blog.title,
    description: blog.description.replace(/<[^>]+>/g, "").slice(0, 150),
    openGraph: {
      title: blog.title,
      description: blog.description.replace(/<[^>]+>/g, "").slice(0, 150),
      images: [{ url: blog.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description.replace(/<[^>]+>/g, "").slice(0, 150),
      images: [blog.image],
    },
  };
}

// 👇 2. Page Component
export default async function SingleBlogPage({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return notFound();
  const blog = await res.json();
  const related = await getRelatedBlogs(blog.category, blog.slug);

  const readTime = Math.ceil(
    blog.description.replace(/<[^>]+>/g, "").split(" ").length / 200
  );
  const enhanced = await enhanceBlogHtml(blog.description);

  return (
    <article className=" blogwrapper py-12 px-4 ">
      <ViewTrackerWrapper slug={blog.slug} />
      <EditButton blog={blog} />

      {/* Title */}
      <h1 className="text-2xl md:text-4xl sm:text-3xl text-center font-bold mb-4">
        {blog.title}
      </h1>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
        <span>
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
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
        <span className="italic ml-auto">{readTime} min read</span>
      </div>

      {/* Cover image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover mb-8 border rounded"
        />
      )}

      {/* Category and author */}
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <span className="px-2 py-0.5 font-semibold rounded bg-primary text-white">
          {blog.category}
        </span>
        <span className="ml-2">
          by <span className="font-medium">{blog.author}</span>
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

      {/* Blog content */}
      <div
        className="tiptap font-sans max-w-none"
        dangerouslySetInnerHTML={{ __html: enhanced }}
      />

      {/* Comment section */}
      <CommentSection blogSlug={blog.slug} />

      {/* Author Bio */}
      <div className="mt-12 border-t pt-6">
        <div className="flex items-center gap-4">
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-14 h-14 rounded-full border object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{blog.author}</p>
            <p className="text-xs text-gray-500">Author of this blog</p>
          </div>
        </div>
      </div>

      {/* Social Sharing Buttons */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="text-sm text-gray-500">Share this blog:</p>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`
          )}&text=${encodeURIComponent(blog.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <BsTwitterX className="text-2xl" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <FaLinkedin className="text-2xl text-blue-500 " />
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            blog.title +
              " " +
              `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <FaWhatsapp className="text-2xl text-green-600" />
        </a>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.description.replace(/<[^>]+>/g, "").slice(0, 150),
            image: blog.image,
            author: {
              "@type": "Person",
              name: blog.author,
            },
            datePublished: blog.date,
            dateModified: blog.updatedAt || blog.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_BASE_URL || ""}/blog/${
                blog.slug
              }`,
            },
          }),
        }}
      />

      {/* Back link */}
      <div className="mt-8">
        <Link href="/" className="text-indigo-600 hover:underline">
          ← Back to all blogs
        </Link>
      </div>
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-semibold mb-4">Related Blogs</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                href={`/blog/${item.slug}`}
                key={item._id}
                className="border p-4 rounded hover:shadow transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover mb-3 rounded"
                />
                <h3 className="font-semibold text-lg line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
