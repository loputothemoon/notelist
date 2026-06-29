import Link from 'next/link'
import NoteList from '@/components/NoteList'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Lopu Notes</h1>
            <p className="text-sm text-slate-500 mt-1">Daftar riwayat catatanmu.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <Link 
              href="/editor" 
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm text-sm font-semibold transition-all"
            >
              + Catatan Baru
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <NoteList />
        </div>

      </div>
    </main>
  )
}