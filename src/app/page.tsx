// src/app/page.tsx
import ThemeToggle from "@/components/ThemeToggle";
import NoteList from "@/components/NoteList"; 
import Editor from "@/components/Editor";

export default function Dashboard() {
  return (
    // Kita tambahkan h-screen dan overflow-hidden agar layout tidak "pecah" ke bawah
    <main className="h-screen w-full flex overflow-hidden bg-white dark:bg-gray-900">
      
      {/* Panel Kiri: List Note - Lebar tetap 350px */}
      <aside className="w-[350px] border-r border-gray-200 dark:border-gray-700 flex flex-col p-4">
        <h1 className="text-xl font-bold mb-4 dark:text-white">Daftar Catatan</h1>
        <ThemeToggle />
        <button className="w-full bg-purple-600 text-white py-2 rounded mb-4 hover:bg-purple-700">
          + Tambah Note
        </button>
        <div className="flex-1 overflow-y-auto">
          <NoteList />
        </div>
      </aside>

      {/* Panel Kanan: Editor - Mengisi sisa ruang (flex-1) */}
      <section className="flex-1 overflow-y-auto p-8">
        <Editor />
      </section>
      
    </main>
  );
}