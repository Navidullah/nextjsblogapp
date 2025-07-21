import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  authorImage: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  authorEmail: {
    type: String,
    required: true,
  },
  slug: { type: String, required: true, unique: true },
  likesCount: {
    type: Number,
    default: 0,
  },
  commentsCount: { type: Number, default: 0 },
  views: {
    type: Number,
    default: 0,
  },
});
const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);
export default BlogModel;
