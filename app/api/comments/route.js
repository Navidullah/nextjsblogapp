import { ConnectToDB } from "@/lib/db";
import CommentModel from "@/lib/models/CommentModel";
import BlogModel from "@/lib/models/BlogModel";

export async function POST(req) {
  await ConnectToDB();
  const { blogSlug, name, userImage, userEmail, text } = await req.json();

  // 1. Create the comment
  const comment = new CommentModel({
    blogSlug,
    name,
    userImage,
    userEmail,
    text,
  });
  await comment.save();

  // 2. Increment commentsCount in Blog
  await BlogModel.findOneAndUpdate(
    { slug: blogSlug },
    { $inc: { commentsCount: 1 } }
  );

  return Response.json({ message: "Comment added", comment }, { status: 201 });
}
