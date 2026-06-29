"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Mencegah hydration mismatch error di Next.js
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => setTheme('dark')}
        className={`px-3 py-1 text-sm rounded ${
          theme === 'dark' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
        }`}
      >
        tema gelap
      </button>
      <button
        onClick={() => setTheme('light')}
        className={`px-3 py-1 text-sm rounded ${
          theme === 'light' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
        }`}
      >
        tema terang
      </button>
      <button
        onClick={() => setTheme('colourful')}
        className={`px-3 py-1 text-sm rounded ${
          theme === 'colourful' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
        }`}
      >
        tema colourfull
      </button>
    </div>
  )
}