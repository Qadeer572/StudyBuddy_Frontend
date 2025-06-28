'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const apiRoute = 'https://studybuddys-454c3f01f785.herokuapp.com/login/';
    // const apiRoute = 'http://127.0.0.1:8000/login/';
    try {
      const res = await fetch(apiRoute, {
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
        localStorage.setItem('token', data.token);
        router.push('/Home');
      } else {
        setMessage(data.error || 'Login failed');
        setMessageType('error');
      }
    } catch  {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false); // Reset loading state after request completes
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

      <form onSubmit={loginHandler} className="w-full max-w-sm">
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
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? (
              <span className="flex items-center justify成人中心">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0l4 4-4 4z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              'Login'
            )}
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