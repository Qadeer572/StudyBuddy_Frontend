// src/app/login/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div>
       <form action="">
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">Login to StudyBuddy</h1>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              Login
            </button>
            <p className="mt-4 text-center text-gray-400">Dont have an account?{' '}<span
                onClick={() => router.push('/register')}
                className="text-blue-400 cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          </div>
        </div>
       </form>
    </div>
  );
}