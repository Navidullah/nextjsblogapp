import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";

// Slugify function
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Run with GET request
export async function GET() {
  await ConnectToDB();
  const blogs = await BlogModel.find({ slug: { $exists: false } });
  let updated = 0;

  for (const blog of blogs) {
    if (!blog.slug) {
      const slug = slugify(blog.title);
      await BlogModel.updateOne({ _id: blog._id }, { $set: { slug } });
      updated++;
    }
  }
  return Response.json({ message: `Updated ${updated} blogs with slugs.` });
}
