// lib/models/CommentModel.js
import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  blogSlug: { type: String, required: true },
  name: String,
  userImage: String, // <--- Add this
  userEmail: String, // <--- Optionally add this
  text: String,
  date: { type: Date, default: Date.now },
});
const CommentModel =
  mongoose.models.comment || mongoose.model("comment", Schema);
export default CommentModel;
