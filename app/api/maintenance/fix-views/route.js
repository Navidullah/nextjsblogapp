import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await ConnectToDB();

    const result = await BlogModel.updateMany(
      { views: { $exists: false } },
      { $set: { views: 0 } }
    );

    return NextResponse.json({
      message: "Views field added to blogs missing it.",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
