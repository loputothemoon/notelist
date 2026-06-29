import Link from 'next/link'
import Editor from '@/components/Editor'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function EditNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  
  // Mencari data di database berdasarkan kolom 'slug'
  const { data: note } = await supabase
    .from('notes')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!note) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-4">
        <div>
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            &larr; Kembali ke Riwayat
          </Link>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <Editor 
            noteId={note.id} 
            initialTitle={note.title} 
            initialContent={note.content} 
          />
        </div>
      </div>
    </main>
  )
}