"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Mulai menulis catatanmu di sini...</p>',
  })

  if (!editor) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar Sederhana */}
      <div className="flex gap-2 border-b pb-2 dark:border-gray-700">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">I</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">H1</button>
      </div>
      
      {/* Area Editor */}
      <EditorContent 
        editor={editor} 
        className="prose dark:prose-invert max-w-none min-h-[500px] p-4 border rounded" 
      />
    </div>
  )
}