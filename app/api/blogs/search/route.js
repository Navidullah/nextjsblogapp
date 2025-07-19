import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";

export async function GET(req) {
  await ConnectToDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  // Case-insensitive, partial match in title
  const blogs = await BlogModel.find({
    title: { $regex: q, $options: "i" },
  }).sort({ date: -1 });
  return Response.json(blogs, { status: 200 });
}
