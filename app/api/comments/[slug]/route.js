// app/api/comments/[slug]/route.js
import { ConnectToDB } from "@/lib/db";
import CommentModel from "@/lib/models/CommentModel";

export async function GET(req, { params }) {
  await ConnectToDB();
  const comments = await CommentModel.find({ blogSlug: params.slug }).sort({
    date: -1,
  });
  return Response.json(comments, { status: 200 });
}

export async function POST(req, { params }) {
  await ConnectToDB();
  const { name, text, userImage, userEmail } = await req.json();
  if (!name || !text)
    return Response.json({ error: "Missing data" }, { status: 400 });
  const comment = new CommentModel({
    blogSlug: params.slug,
    name,
    userImage,
    userEmail,
    text,
  });
  await comment.save();
  return Response.json(comment, { status: 201 });
}
