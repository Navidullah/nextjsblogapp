// app/edit/[slug]/page.jsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = [
  "Technology",
  "Programming",
  "Health",
  "Lifestyle",
  "Science",
  "Travel",
  "Education",
  "Sports",
];

const TiptapEditor = dynamic(
  () => import("@/app/components/blogeditor/TiptapEditor"),
  { ssr: false }
);

export default function EditBlogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);

  // Blog fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Tiptap HTML
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  // Fetch blog data
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        setPreview(data.image);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch blog.");
        setLoading(false);
      });
  }, [slug]);

  // Permission check: Only author or admin
  const isAdmin = session?.user?.role === "admin";
  const isAuthor = session?.user?.email === blog?.authorEmail;
  const canEdit = isAdmin || isAuthor;
  console.log("Full session in API:", session);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = blog.image;
    // If a new image is selected, upload to Firebase as you do in Write Page
    if (image) {
      try {
        const { storage } = await import("@/lib/firebase");
        const { ref, uploadBytes, getDownloadURL } = await import(
          "firebase/storage"
        );
        const imageRef = ref(storage, `blogs/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      } catch (err) {
        toast.error("Image upload failed!");
        setUploading(false);
        return;
      }
    }

    // Send update to backend
    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          image: imageUrl,
        }),
      });
      if (res.ok) {
        toast.success("Blog updated!");
        router.push(`/blog/${slug}`);
      } else {
        toast.error("Update failed!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
    setUploading(false);
  };

  if (status === "loading" || loading)
    return <LoadingSpinner message="Loading blog..." size="large" />;

  if (!session) return <div>Please log in to edit blogs.</div>;
  if (!canEdit) return <div>You do not have permission to edit this blog.</div>;

  return (
    <div className="min-h-screen">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Edit Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
              required
            />
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Main Image Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-32 mt-2 rounded object-cover"
                />
              )}
            </div>
            {/* Tiptap rich text editor */}
            <TiptapEditor value={description} onChange={setDescription} />
            <Button type="submit" className="mt-4" disabled={uploading}>
              {uploading ? "Updating..." : "Update Blog"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
