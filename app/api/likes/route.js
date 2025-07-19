// Example: /api/likes/route.js
import BlogModel from "@/lib/models/BlogModel";

export async function POST(req) {
  const { blogSlug, increment } = await req.json(); // increment: 1 for like, -1 for unlike

  await BlogModel.updateOne(
    { slug: blogSlug },
    { $inc: { likesCount: increment } }
  );

  return Response.json({ message: "Like updated" }, { status: 200 });
}
