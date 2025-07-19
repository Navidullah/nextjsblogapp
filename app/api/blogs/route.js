/*import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import path from "path";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export async function POST(req) {
  await ConnectToDB();
  const formData = await req.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const image = formData.get("image"); // File
  const author = formData.get("author");
  const authorImage = formData.get("authorImage");
  const authorEmail = formData.get("authorEmail");

  // Generate slug from title
  let slug = slugify(title);

  // If slug exists, append a random 4-digit code
  let exists = await BlogModel.findOne({ slug });
  if (exists) {
    slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  // Save image to public/uploads
  let imageUrl = "";
  if (image && image.name) {
    const ext = image.name.split(".").pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const savePath = path.join(process.cwd(), "public/uploads", fileName);
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(savePath, buffer);
    imageUrl = `/uploads/${fileName}`;
  }

  // Save blog to DB with slug
  const blog = new BlogModel({
    title,
    slug,
    description,
    category,
    image: imageUrl,
    author,
    authorImage,
    authorEmail,
  });

  await blog.save();

  return new Response(JSON.stringify({ message: "Blog created", blog }), {
    status: 201,
  });
}

// /api/blogs/route.js (GET)
export async function GET() {
  await ConnectToDB();
  const blogs = await BlogModel.find().sort({ date: -1 });
  return Response.json(blogs, { status: 200 });
}
*/
import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export async function POST(req) {
  await ConnectToDB();
  const data = await req.json(); // Expect JSON body now!

  const {
    title,
    description,
    category,
    image,
    author,
    authorImage,
    authorEmail,
  } = data;

  // Generate slug from title
  let slug = slugify(title);

  // If slug exists, append a random 4-digit code
  let exists = await BlogModel.findOne({ slug });
  if (exists) {
    slug = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  // Save blog to DB with slug and image URL from Firebase
  const blog = new BlogModel({
    title,
    slug,
    description,
    category,
    image, // <-- This is now a URL string
    author,
    authorImage,
    authorEmail,
  });

  await blog.save();

  return new Response(JSON.stringify({ message: "Blog created", blog }), {
    status: 201,
  });
}

// /api/blogs/route.js (GET)
export async function GET() {
  await ConnectToDB();
  const blogs = await BlogModel.find().sort({ date: -1 });
  return Response.json(blogs, { status: 200 });
}
