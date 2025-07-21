// /lib/actions/blog.js

import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";

export const getRelatedBlogs = async (category, currentSlug) => {
  await ConnectToDB();
  const blogs = await BlogModel.find({
    category,
    slug: { $ne: currentSlug },
  })
    .sort({ date: -1 })
    .limit(3);
  return blogs;
};
