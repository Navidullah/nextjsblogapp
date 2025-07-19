import BlogList from "../components/bloglist/BlogList";

export default async function SearchPage({ searchParams }) {
  const q = searchParams?.q || "";

  // Only fetch if there is a query
  let blogs = [];
  if (q) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/search?q=${encodeURIComponent(q)}`,
      { cache: "no-store" }
    );
    blogs = await res.json();
  }

  return (
    <main className="min-h-screen py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        {q ? `Search results for "${q}"` : "Enter a term to search blogs"}
      </h1>
      <BlogList blogs={blogs} />
      {!q && (
        <p className="text-gray-500 mt-10">
          Try searching for a keyword or title.
        </p>
      )}
      {q && blogs.length === 0 && (
        <p className="text-gray-500 mt-10">No blogs found for your search.</p>
      )}
    </main>
  );
}
