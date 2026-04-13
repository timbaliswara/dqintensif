"use client";

import * as React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Underline as UnderlineIcon,
  Unlink,
  Heading2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  draftKey?: string;
};

function ToolbarButton({
  pressed,
  onClick,
  disabled,
  children,
  label,
}: {
  pressed?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      type="button"
      variant={pressed ? "secondary" : "outline"}
      size="icon-sm"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="rounded-xl"
    >
      {children}
    </Button>
  );
}

export function RichTextEditor({
  name,
  defaultValue,
  placeholder,
  className,
  draftKey,
}: Props) {
  const [html, setHtml] = React.useState(defaultValue ?? "");
  const restoredRef = React.useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          rel: "noreferrer noopener",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder ?? "Tulis pengumuman di sini…",
      }),
    ],
    content: defaultValue ?? "",
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] rounded-2xl border bg-background p-3 text-sm leading-7 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 rich-content",
      },
    },
    onUpdate({ editor }) {
      setHtml(editor.getHTML());
    },
  });

  React.useEffect(() => {
    // Keep hidden input in sync even before first update.
    if (!editor) return;
    setHtml(editor.getHTML());
  }, [editor]);

  React.useEffect(() => {
    if (!editor) return;
    if (!draftKey) return;
    if (restoredRef.current) return;
    restoredRef.current = true;
    try {
      const raw = localStorage.getItem(`dqs_admin_draft:${draftKey}`);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      const saved = parsed?.[name];
      if (typeof saved !== "string" || !saved.trim()) return;
      editor.commands.setContent(saved, false);
      setHtml(saved);
    } catch {
      // ignore
    }
  }, [draftKey, editor, name]);

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Masukkan link (https://…)", prev ?? "");
    if (url === null) return;
    const next = url.trim();
    if (!next) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: next }).run();
  }

  if (!editor) {
    return (
      <div className={cn("rounded-2xl border bg-muted/20 p-4 text-sm", className)}>
        Memuat editor…
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <input data-admin-controlled="1" type="hidden" name={name} value={html} />

      <div className="flex flex-wrap gap-2 rounded-2xl border bg-muted/20 p-2">
        <ToolbarButton
          label="Bold"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          pressed={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Strike"
          pressed={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="size-4" />
        </ToolbarButton>

        <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

        <ToolbarButton
          label="Heading"
          pressed={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Ordered list"
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          pressed={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="size-4" />
        </ToolbarButton>

        <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

        <ToolbarButton
          label="Link"
          pressed={editor.isActive("link")}
          onClick={setLink}
        >
          <Link2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Unlink"
          disabled={!editor.isActive("link")}
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <Unlink className="size-4" />
        </ToolbarButton>

        <div className="mx-1 hidden h-6 w-px bg-border sm:block" />

        <ToolbarButton
          label="Undo"
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Redo"
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />
      <div className="text-xs text-muted-foreground">
        Tips: gunakan judul yang jelas, poin bullet untuk ringkasan, dan blok quote
        untuk catatan “Konfirmasi admin”.
      </div>
    </div>
  );
}
