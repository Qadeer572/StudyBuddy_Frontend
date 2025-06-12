'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const router = useRouter();

  const signupHandler = async () => {
     

    const apiRout = 'http://127.0.0.1:8000/signup/';

    const res = await fetch(apiRout, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      setMessageType('success');
    } else {
      setMessage(data.message || "Something went wrong");
      setMessageType('error');
    }

    console.log("Django response:", data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full sm:max-w-[16rem] md:max-w-sm">
        {/* ✅ Message shown above the form */}
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
            >
              Register
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
