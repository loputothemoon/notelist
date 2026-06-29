import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'

export default async function NoteList() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select('*').order('created_at', { ascending: false })

  if (!notes || notes.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
        Belum ada catatan. Yuk buat yang baru!
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note) => (
        <Link 
          key={note.id} 
          href={`/editor/${note.slug || note.id}`}
          className="group block p-5 bg-white dark:bg-slate-800/80 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700/50 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-slate-700"
        >
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {note.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {new Date(note.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </Link>
      ))}
    </div>
  )
}