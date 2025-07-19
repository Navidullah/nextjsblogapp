import BlogList from "../components/bloglist/BlogList";

export default async function BlogHomePage() {
  // Fetch all blogs and their comments count in parallel
  const [blogsRes, countsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs`, {
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/comments-count`,
      { cache: "no-store" }
    ),
  ]);
  const blogs = await blogsRes.json();
  const countsArr = await countsRes.json();

  // Create a lookup for slug -> commentsCount, likesCount
  const counts = {};
  countsArr.forEach((c) => {
    counts[c.slug] = {
      commentsCount: c.commentsCount,
      likesCount: c.likesCount,
    };
  });

  // Merge counts into blogs
  const blogsWithCounts = blogs.map((blog) => ({
    ...blog,
    commentsCount: counts[blog.slug] || 0, // never undefined!
    likesCount: counts[blog.slug] || 0,
  }));

  return (
    <main className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <BlogList blogs={blogsWithCounts} />
    </main>
  );
}
