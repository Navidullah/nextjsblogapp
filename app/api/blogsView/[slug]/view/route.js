import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await ConnectToDB();
    const blog = await BlogModel.findOneAndUpdate(
      { slug: params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    console.log(blog.views);
    return NextResponse.json({ views: blog.views });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
