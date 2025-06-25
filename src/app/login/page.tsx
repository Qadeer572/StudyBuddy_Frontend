'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const loginHanlder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const apiRout = ' https://studybuddys-454c3f01f785.herokuapp.com/login/';
    //const apiRout = ' http://127.0.0.1:8000/login/';
    const res = await fetch(apiRout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await res.json();
  
    if (data.status) {
      setMessage(data.message || 'Login successful');
      setMessageType('success');
      localStorage.setItem("token", data.token);
      router.push('/Home');
    } else {
      setMessage(data.error || 'Login failed');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex flex-col items-center justify-center px-4">
      {message && (
        <div
          className={`mb-4 w-full max-w-sm rounded-lg px-4 py-3 text-sm text-center font-medium 
            ${messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={loginHanlder} className="w-full max-w-sm">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">
            Login to StudyBuddy
          </h1>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />
            <input
              type="password"
              name="password"
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
          <p className="mt-4 text-center text-gray-400">
            Don’t have an account?{' '}
            <span
              onClick={() => router.push('/signup')}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Register here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
