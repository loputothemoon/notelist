"use client"

import { useState } from "react"
import { login, signup } from "./actions"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      if (isSignUp) {
        await signup(formData)
        alert("Pendaftaran berhasil! Silakan cek email kamu untuk verifikasi jika diperlukan.")
      } else {
        await login(formData)
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan, silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="w-full max-w-md">
        {/* Logo / Nama Aplikasi */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Lopu Notes
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {isSignUp ? "Buat akun baru untuk mulai mencatat" : "Masuk untuk mengakses catatan digitalmu"}
          </p>
        </div>

        {/* Kartu Formulir Utama */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-700/80 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium rounded-xl text-center">
                {error}
              </div>
            )}

            {/* Input Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-sm"
              />
            </div>

            {/* Input Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label htmlFor="password" className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Kata Sandi
                </label>
                {!isSignUp && (
                  <a href="#" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                    Lupa sandi?
                  </a>
                )}
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-sm"
              />
            </div>

            {/* Tombol Aksi Utama */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition-all active:scale-[0.98] mt-2"
            >
              {loading ? "Memproses..." : isSignUp ? "Daftar Akun" : "Masuk Sekarang"}
            </button>
          </form>

          {/* Pembatas Transparan */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-800 px-3 text-slate-400 dark:text-slate-500 font-medium">
                Atau
              </span>
            </div>
          </div>

          {/* Toggle Menu Bawah */}
          <div className="text-center text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              {isSignUp ? "Sudah punya akun? " : "Belum memiliki akun? "}
            </span>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
              }}
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
            >
              {isSignUp ? "Masuk di sini" : "Buat akun baru"}
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}