import BlogList from "./components/bloglist/BlogList";

export default async function HomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs`,
    { cache: "no-store" }
  );
  const blogs = await res.json();

  return (
    <main className=" wrapper py-10">
      <h1 className="text-2xl font-bold mb-6">Latest Blogs</h1>
      <BlogList blogs={blogs} />
    </main>
  );
}
