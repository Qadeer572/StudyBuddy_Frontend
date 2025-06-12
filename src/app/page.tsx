'use client'
import {useRouter} from "next/navigation";


export default function Home() {

  const router=useRouter();
  const handleButtonClick = () => {
    router.replace('/login');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      {/* Logo */}
      <div className="pt-6 pl-6">
        <img 
          src="/logo.jpeg" 
          alt="StudyBuddy Logo" 
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-white"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          
          {/* Hero Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
              StudyBuddy
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
          </div>

          {/* Introduction */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 leading-relaxed">
              Your Ultimate Study Companion
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Transform your learning journey with StudyBuddy - the intelligent platform designed to boost your productivity, 
              organize your study materials, and help you achieve academic excellence. Stay focused, stay organized, stay busy learning.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center pt-8">
            <button  onClick={handleButtonClick}   className="group relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-4 px-8 sm:py-5 sm:px-12 md:py-6 md:px-16 rounded-full shadow-2xl hover:shadow-blue-400/25 transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 border border-white/20">
              <span className="relative z-10 text-lg sm:text-xl md:text-2xl">
                Start Learning
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 animate-pulse"></div>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-200 mb-2">Smart Organization</h3>
              <p className="text-gray-300 text-sm">Keep all your study materials organized and easily accessible</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-200 mb-2">Boost Productivity</h3>
              <p className="text-gray-300 text-sm">Advanced tools to maximize your learning efficiency</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-md hover:shadow-lg hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-200 mb-2">Track Progress</h3>
              <p className="text-gray-300 text-sm">Monitor your learning journey and celebrate achievements</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-8 text-gray-400 text-sm">
            <p>Join thousands of students already improving their study habits</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 right-20 w-20 h-20 bg-indigo-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
    </div>
  );
}
