"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Blockquote from "@tiptap/extension-blockquote";
import { Placeholder } from "@tiptap/extensions";
import React from "react";
import MenuBar from "./MenuBar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "@tiptap/extension-link";

const TiptapEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      FontSize,
      TextStyle,
      Blockquote,
      Image,
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-500 font-semibold hover:underline",
        },
        openOnClick: false, // disable opening in new tab
        linkOnPaste: false, // optional: disable auto-links from pasted text
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md py-2 px-3 tiptap",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
