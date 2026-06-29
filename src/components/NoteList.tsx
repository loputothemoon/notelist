import { createClient } from '@/utils/supabase/server'

export default async function NoteList() {
  const supabase = await createClient()
  const { data: notes } = await supabase.from('notes').select('*').order('created_at', { ascending: false })

  return (
    <div className="flex flex-col gap-3">
      {notes?.map((note) => (
        <div key={note.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
          <h2 className="font-semibold dark:text-white">{note.title}</h2>
          <p className="text-xs text-gray-500">{new Date(note.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  )
}