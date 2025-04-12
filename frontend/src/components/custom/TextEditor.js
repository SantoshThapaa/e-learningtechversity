'use client';

import React from 'react';
import { useEffect } from "react";
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Underline, AlignCenter, List, Pilcrow } from 'lucide-react';

export const TextEditor = ({ defaultValue, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: defaultValue || '<p>Start writing here...</p>',
  });

  useEffect(() => {
    if (editor) {
      editor.on('update', () => {
        onChange(editor.getHTML());  
      });
    }
  }, [editor, onChange]);
  if (!editor) return null;

  return (
    <div className="border rounded-md bg-white">
      <div className="flex items-center gap-2 p-2 border-b">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-1">
          <Bold className="w-4 h-4" />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-1">
          <Italic className="w-4 h-4" />
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-1">
          <List className="w-4 h-4" />
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()} className="p-1">
          <Pilcrow className="w-4 h-4" />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="p-1">
          <AlignCenter className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} className="min-h-[200px] p-4 outline-none" />
    </div>
  );
};
