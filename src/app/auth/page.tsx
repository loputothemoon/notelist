import { login, signup } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-white">Masuk / Daftar</h1>
        
        {searchParams?.error && (
          <p className="text-sm text-red-500 bg-red-100 p-2 rounded">{searchParams.error}</p>
        )}

        <label className="flex flex-col gap-1 dark:text-gray-300">
          Email:
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded border p-2 text-black"
          />
        </label>
        <label className="flex flex-col gap-1 dark:text-gray-300">
          Password:
          <input
            id="password"
            name="password"
            type="password"
            required
            className="rounded border p-2 text-black"
          />
        </label>
        
        <div className="flex gap-2 mt-4">
          <button
            formAction={login}
            className="flex-1 rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Masuk
          </button>
          <button
            formAction={signup}
            className="flex-1 rounded border border-blue-600 py-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
          >
            Daftar
          </button>
        </div>
      </form>
    </div>
  )
}