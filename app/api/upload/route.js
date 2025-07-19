import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("image");

  if (!file)
    return NextResponse.json({ error: "No image found" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `./public/uploads/${Date.now()}_${file.name}`;
  await writeFile(path, buffer);

  return NextResponse.json({ imgUrl: `/uploads/${Date.now()}_${file.name}` });
}
