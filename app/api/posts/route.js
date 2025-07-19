import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

// GET all blogs
export async function GET() {
  try {
    await ConnectToDB();
    const blogs = await BlogModel.find().sort({ date: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST a new blog
export async function POST(req) {
  try {
    await ConnectToDB();
    const body = await req.json();
    const newBlog = new BlogModel(body);
    await newBlog.save();
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
