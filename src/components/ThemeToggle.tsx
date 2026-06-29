"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
      <button 
        onClick={() => setTheme("light")}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
          theme === "light" 
            ? "bg-white shadow-sm text-slate-800" 
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        Terang
      </button>
      <button 
        onClick={() => setTheme("dark")}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
          theme === "dark" 
            ? "bg-slate-800 shadow-sm text-white" 
            : "text-slate-500 dark:text-slate-400 hover:text-slate-200"
        }`}
      >
        Gelap
      </button>
      <button 
        onClick={() => setTheme("colourful")}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
          theme === "colourful" 
            ? "bg-white/30 shadow-sm text-black font-bold" 
            : "text-slate-500 dark:text-slate-400 hover:text-slate-200"
        }`}
      >
        Warna
      </button>
    </div>
  )
}