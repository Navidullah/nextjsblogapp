/*"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  {
    ssr: false,
  }
);

export default function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Tiptap HTML
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // main image file
  const [preview, setPreview] = useState(""); // preview of main image

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !image) {
      alert("All fields are required.");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("author", session.user.name || "");
    formData.append("authorImage", session.user.image || "");
    formData.append("authorEmail", session.user.email || "");

    const res = await fetch("/api/blogs", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Failed to publish blog!");
    }
  };

  if (status === "loading")
    return (
      <LoadingSpinner message="Loading editor, please wait..." size="large" />
    );
  if (!session) return <div>Please log in to write a blog.</div>;

  return (
    <div className="min-h-screen">
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Write a New Blog</CardTitle>
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
            {/* Main Image Upload 
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImage}
                required
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-32 mt-2 rounded object-cover"
                />
              )}
            </div>
            {/* Tiptap rich text editor *
            <TiptapEditor value={description} onChange={setDescription} />
            <Button type="submit" className="mt-4">
              Publish
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
*/
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
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
import { storage } from "@/lib/firebase"; // <-- your Firebase setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
/*
const DocxUploader = dynamic(
  () => import("../components/wordfile/DocxUploader"),
  { ssr: false }
);*/

export default function WritePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const editorRef = useRef(null); // For auto-scrolling to editor

  const handleMainImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };
  /*
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (
      file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      toast.error("Only .docx files are allowed.");
      return;
    }

    setUploadedFileName(file.name);
    toast.info("Processing Word file...");

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const arrayBuffer = reader.result;
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setDescription(result.value);
        toast.success("Word document inserted!");
        setTimeout(() => {
          editorRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 200);
      } catch (err) {
        console.error("DOCX processing error:", err);
        toast.error("Failed to process Word file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.info("Uploading file...");

    // handle .docx or .pdf file logic here
  };
  */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !image) {
      toast.error("All fields are required.");
      return;
    }
    setUploading(true);

    // Upload image to Firebase Storage
    let imageUrl = "";
    try {
      const imageRef = ref(storage, `blogs/${Date.now()}_${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    } catch (error) {
      setUploading(false);
      toast.error("Failed to upload image to Firebase.");
      return;
    }

    // Submit blog data to API
    const blogData = {
      title,
      description,
      category,
      image: imageUrl, // <-- Firebase URL
      author: session.user.name || "",
      authorImage: session.user.image || "",
      authorEmail: session.user.email || "",
    };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      setUploading(false);

      if (res.ok) {
        toast.success("Blog published successfully!");
        router.push("/");
      } else {
        toast.error("Failed to publish blog!");
      }
    } catch (err) {
      setUploading(false);
      toast.error("Something went wrong!");
    }
  };

  if (status === "loading")
    return (
      <LoadingSpinner message="Loading editor, please wait..." size="large" />
    );
  if (!session) return <div>Please log in to write a blog.</div>;

  return (
    <div className="min-h-screen wrapper mt-6">
      <h2 className="text-xl pb-2">
        Note: Dear user if you find difficulty with typing blog in text editor
        you can also write your blog in Ms word format and then upload your blog
        in the text editor. just click on the file icon in the menubar and
        upload your blog.
      </h2>
      <Card className="p-6">
        <CardHeader className="flex flex-wrap gap-4 items-center justify-between">
          <CardTitle>Write a New Blog</CardTitle>
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
            <div className="mb-4">
              <label htmlFor="mainImage" className="block font-medium mb-2">
                Upload Main Image
              </label>

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => document.getElementById("mainImage").click()}
                >
                  📤 Upload Main Image
                </Button>

                {image && (
                  <span className="text-sm text-gray-700">{image.name}</span>
                )}
              </div>

              <input
                id="mainImage"
                type="file"
                accept="image/*"
                onChange={handleMainImage}
                className="hidden"
                required
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-32 mt-4 rounded object-cover border"
                />
              )}
            </div>

            <div id="editor-ref">
              <TiptapEditor value={description} onChange={setDescription} />
            </div>
            <Button type="submit" className="mt-4" disabled={uploading}>
              {uploading ? "Publishing..." : "Publish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
