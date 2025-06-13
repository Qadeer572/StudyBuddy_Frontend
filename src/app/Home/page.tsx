'use client'
import React from "react";
import { useRouter } from "next/navigation";

export default function StudyBuddyHomePage() {
  const router = useRouter();

  const handleLogin = () => {
    // Redirect to login page
    router.push("/login");
  };

  const handleSignup = () => {
    // Redirect to signup page
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-lg sm:max-w-sm md:max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-200 mb-6">Welcome to StudyBuddy</h1>
        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="w-full bg-gradient-to-r from-green-500 to-yellow-600 hover:from-green-400 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-green-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}