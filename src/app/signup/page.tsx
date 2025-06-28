'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const router = useRouter();

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    // const apiRoute = 'http://127.0.0.1:8000/signup/';
    const apiRoute = 'https://studybuddys-454c3f01f785.herokuapp.com/signup/';
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

    try {
      const res = await fetch(apiRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || 'Registration successful');
        setMessageType('success');
        router.push('/login');
      } else {
        setMessage(data.error || 'Registration failed');
        setMessageType('error');
      }

      console.log('Django response:', data);
    } catch{
       
        setMessage('Request timed out. Please try again.');
       
       setMessageType('error');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full sm:max-w-[16rem] md:max-w-sm">
        {/* Message shown above the form */}
        {message && (
          <div
            className={`mb-4 p-3 rounded text-sm font-medium text-center ${
              messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={signupHandler}>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">Registration</h1>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <span className="flex items-center justify-center">
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
                'Register'
              )}
            </button>

            <p className="mt-4 text-center text-gray-400">
              Already have an account?{' '}
              <span
                onClick={() => router.push('/login')}
                className="text-blue-400 cursor-pointer hover:underline"
              >
                login here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}