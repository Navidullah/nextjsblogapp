import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";

// GET: Get blog by slug
export async function GET(req, { params }) {
  await ConnectToDB();
  const blog = await BlogModel.findOne({ slug: params.slug });
  if (!blog) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return Response.json(blog);
}

/*
// PUT: Update blog by slug
export async function PUT(req, { params }) {
  await ConnectToDB();
  const body = await req.json();
  const blog = await BlogModel.findOneAndUpdate(
    { slug: params.slug },
    { $set: body },
    { new: true }
  );
  if (!blog) return new Response("Not found", { status: 404 });
  return Response.json({ message: "Updated", blog }, { status: 200 });
}*/

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function PUT(req, { params }) {
  await ConnectToDB();

  // Get session (user info) securely
  const session = await getServerSession(authOptions);
  console.log("Session user:", session.user);

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  // Find the blog first
  const blog = await BlogModel.findOne({ slug: params.slug });
  if (!blog) return new Response("Not found", { status: 404 });

  // Only author or admin can update
  const isAuthor = blog.authorEmail === session.user.email;
  const isAdmin = session.user.role === "admin";
  console.log("api check", isAdmin);
  if (!isAuthor && !isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

  // Do not allow slug or authorEmail update for safety
  delete body.slug;
  delete body.authorEmail;

  const updatedBlog = await BlogModel.findOneAndUpdate(
    { slug: params.slug },
    { $set: body },
    { new: true }
  );

  return Response.json(
    { message: "Updated", blog: updatedBlog },
    { status: 200 }
  );
}
