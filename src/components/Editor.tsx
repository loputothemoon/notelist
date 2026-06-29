"use client"

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import 'react-quill-new/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

interface EditorProps {
  noteId?: string;
  initialTitle?: string;
  initialContent?: string;
}

export default function Editor({ noteId, initialTitle = '', initialContent = '' }: EditorProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [loading, setLoading] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  }

  // Fungsi untuk mengubah judul menjadi slug
  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')        // Ganti spasi dengan -
      .replace(/[^\w\-]+/g, '')    // Hapus karakter non-word selain -
      .replace(/\-\-+/g, '-');     // Ganti multiple - dengan single -
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Judul catatan tidak boleh kosong!')
      return
    }

    try {
      setLoading(true)
      const slug = generateSlug(title)

      if (noteId) {
        // UPDATE (Edit)
        const { error } = await supabase
          .from('notes')
          .update({ title, content, slug })
          .eq('id', noteId)

        if (error) throw error
        alert('Catatan berhasil diperbarui!')
      } else {
        // INSERT (Catatan Baru)
        const { error } = await supabase
          .from('notes')
          .insert([{ title, content, slug }])

        if (error) throw error
        alert('Catatan baru sukses disimpan!')
      }
      
      router.push('/')
      router.refresh()
    } catch (error: any) {
      alert('Gagal menyimpan: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setTitle('')
    setContent('')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-slate-50/50 dark:bg-slate-800/50">
        <input 
          type="text"
          placeholder="Tulis judul catatan di sini..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
        />
        
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button 
            onClick={handleClear}
            className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
          >
            Kosongkan
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-all active:scale-95"
          >
            {loading ? 'Menyimpan...' : (noteId ? 'Perbarui Note' : 'Simpan Note')}
          </button>
        </div>
      </div>

      <div className="modern-quill bg-white dark:bg-slate-900">
        <ReactQuill 
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
      </div>
    </div>
  )
}