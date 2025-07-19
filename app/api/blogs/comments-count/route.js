/*import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";
import CommentModel from "@/lib/models/CommentModel";

export async function GET() {
  await ConnectToDB();

  // 1. Get all blog slugs & likesCount
  const blogs = await BlogModel.find({}, "slug likesCount");

  // 2. Get comment counts per slug (using blogSlug)
  const commentCounts = await CommentModel.aggregate([
    { $group: { _id: "$blogSlug", count: { $sum: 1 } } },
  ]);
  // Map: { slug: count }
  const commentCountMap = {};
  commentCounts.forEach((c) => {
    commentCountMap[c._id] = c.count;
  });

  // 3. Build response
  const result = blogs.map((blog) => ({
    slug: blog.slug,
    commentsCount: commentCountMap[blog.slug] || 0,
    likesCount: blog.likesCount || 0, // assumes you added likesCount to BlogModel!
  }));

  return Response.json(result);
}
*/
import { ConnectToDB } from "@/lib/db";
import BlogModel from "@/lib/models/BlogModel";
import CommentModel from "@/lib/models/CommentModel";

export async function GET() {
  await ConnectToDB();

  // Get all blog slugs & likesCount
  const blogs = await BlogModel.find({}, "slug likesCount");

  // Get comment counts per slug
  const commentCounts = await CommentModel.aggregate([
    { $group: { _id: "$blogSlug", count: { $sum: 1 } } },
  ]);
  // Map: { slug: count }
  const commentCountMap = {};
  commentCounts.forEach((c) => {
    commentCountMap[c._id] = c.count;
  });

  // Build response
  const result = blogs.map((blog) => ({
    slug: blog.slug,
    commentsCount: commentCountMap[blog.slug] || 0,
    likesCount: blog.likesCount || 0,
  }));

  return Response.json(result);
}
