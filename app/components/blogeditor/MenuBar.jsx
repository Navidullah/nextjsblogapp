/*import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  LucideStrikethrough,
  Quote,
} from "lucide-react";
import { BsParagraph } from "react-icons/bs";
import React, { useRef } from "react";
import { Toggle } from "@/components/ui/toggle";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }
  const fileInputRef = useRef();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const Options = [
    {
      icon: <Heading1 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <BsParagraph className="size-7" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Bold className="size-7" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-7" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <LucideStrikethrough className="size-7" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <Highlighter className="size-7" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <List className="size-7" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-7" />, // Ordered List
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },

    {
      icon: <AlignLeft className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive("textAlign", { textAlign: "left" }),
    },
    {
      icon: <AlignRight className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive("textAlign", { textAlign: "right" }),
    },
    {
      icon: <AlignCenter className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive("textAlign", { textAlign: "center" }),
    },
    {
      icon: <AlignJustify className="size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive("textAlign", { textAlign: "justify" }),
    },
    {
      icon: <Quote className="size-7" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
    {
      icon: <ImageIcon className="size-7" />,
      onClick: handleImageClick,
      pressed: false,
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 flex flex-wrap gap-5">
      {/* Hidden file input for image upload *
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onClick={option.onClick}
          className={option.pressed ? "bg-gray-300 dark:bg-gray-700" : ""}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
*/
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  LucideStrikethrough,
  Quote,
} from "lucide-react";
import { BsParagraph } from "react-icons/bs";
import React, { useRef } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase"; // Your firebase config
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuBar = ({ editor }) => {
  if (!editor) return null;
  const fileInputRef = useRef();

  // ---- UPDATED IMAGE UPLOAD ----
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    toast.info("Uploading image...");
    try {
      const imageRef = ref(
        storage,
        `blog-content-images/${Date.now()}_${file.name}`
      );
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);
      editor.chain().focus().setImage({ src: imageUrl }).run();
      toast.success("Image uploaded!");
    } catch (err) {
      toast.error("Failed to upload image.");
    }
  };

  const handleImageClick = () => fileInputRef.current.click();

  const Options = [
    {
      icon: <Heading1 className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <BsParagraph className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().setParagraph().run(),
      pressed: editor.isActive("paragraph"),
    },
    {
      icon: <Bold className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <LucideStrikethrough className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      pressed: editor.isActive("strike"),
    },
    {
      icon: <Highlighter className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <List className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <AlignLeft className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive("textAlign", { textAlign: "left" }),
    },
    {
      icon: <AlignRight className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive("textAlign", { textAlign: "right" }),
    },
    {
      icon: <AlignCenter className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive("textAlign", { textAlign: "center" }),
    },
    {
      icon: <AlignJustify className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      pressed: editor.isActive("textAlign", { textAlign: "justify" }),
    },
    {
      icon: <Quote className="size-4 md:size-5 xl:size-7" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
    {
      icon: <ImageIcon className="size-4 md:size-5 xl:size-7" />,
      onClick: handleImageClick,
      pressed: false,
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 flex flex-wrap gap-5">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onClick={option.onClick}
          className={option.pressed ? "bg-gray-300 dark:bg-gray-700" : ""}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
