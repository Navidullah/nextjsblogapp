import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import History from "@tiptap/extension-history";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
//import Twitter from "@tiptap/extension-twitter";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2 } from "lucide-react";

export default function BlogEditor({ value, onChange }) {
  const fileInputRef = useRef();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ history: false }),
      History,
      Underline,
      Strike,
      Code,
      CodeBlock,
      Blockquote,
      Link.configure({ openOnClick: false }),
      Image,
      HorizontalRule,
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: {
          class: "mx-auto my-4 rounded-md",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Toolbar handlers
  const addImage = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        editor?.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const setLink = () => {
    const url = prompt("Enter the URL");
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const setYouTube = () => {
    const url = prompt("Paste a YouTube video URL:");
    if (url) {
      editor?.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  const setTwitter = () => {
    const url = prompt("Paste a Tweet URL:");
    if (url) {
      editor?.chain().focus().setTwitterTweet({ src: url }).run();
    }
  };

  return (
    <div>
      {editor && (
        <div className="flex flex-wrap gap-2 mb-2">
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant="outline"
            className={editor.isActive("bold") ? "bg-gray-200" : ""}
          >
            B
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant="outline"
            className={editor.isActive("italic") ? "bg-gray-200" : ""}
          >
            I
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            variant="outline"
            className={editor.isActive("underline") ? "bg-gray-200" : ""}
          >
            U
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            variant="outline"
            className={editor.isActive("strike") ? "bg-gray-200" : ""}
          >
            S
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            variant="outline"
            className={
              editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
            }
          >
            H1
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            variant="outline"
            className={
              editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
            }
          >
            H2
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            variant="outline"
            className={
              editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
            }
          >
            H3
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            variant="outline"
            className={editor.isActive("codeBlock") ? "bg-gray-200" : ""}
          >
            Code Block
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            variant="outline"
            className={editor.isActive("code") ? "bg-gray-200" : ""}
          >
            Inline Code
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            variant="outline"
            className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
          >
            Quote
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            variant="outline"
            className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
          >
            • List
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            variant="outline"
            className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
          >
            1. List
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={setLink}
            variant="outline"
            className={editor.isActive("link") ? "bg-gray-200" : ""}
          >
            Link
          </Button>
          <Button type="button" size="sm" onClick={addImage} variant="outline">
            Insert Image
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={setYouTube}
            variant="outline"
          >
            YouTube
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={setTwitter}
            variant="outline"
          >
            Tweet
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            variant="outline"
          >
            HR
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            variant="outline"
          >
            <Undo2 size={16} />
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            variant="outline"
          >
            <Redo2 size={16} />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </div>
      )}
      <div className="border rounded min-h-[250px] px-2 py-3 bg-white dark:bg-zinc-900">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
