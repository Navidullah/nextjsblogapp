import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";

export async function POST(req, { params }) {
  await ConnectToDB();
  const blog = await BlogModel.findOneAndUpdate(
    { slug: params.slug },
    { $inc: { likesCount: 1 } },
    { new: true }
  );
  if (!blog) return Response.json({ error: "Blog not found" }, { status: 404 });
  return Response.json({ likesCount: blog.likesCount });
}
