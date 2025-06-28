'use client'
import {useRouter} from "next/navigation";
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleButtonClick = () => {
    router.replace('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
        }}
      />
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" />

      {/* Header */}
      <div className="relative z-10 pt-8 pl-8">
        <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" />
            <img 
              src="/logo.jpeg" 
              alt="StudyBuddy Logo" 
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-2xl border-2 border-white/30 backdrop-blur-sm hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto space-y-12">
          
          {/* Hero Title with Staggered Animation */}
          <div className={`space-y-6 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-blue-300 via-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent leading-tight tracking-tight">
                StudyBuddy
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg blur opacity-20 animate-pulse" />
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg animate-shimmer" />
            </div>
          </div>

          {/* Subtitle */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 leading-relaxed">
              Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ultimate</span> Study Companion
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300/90 leading-relaxed max-w-4xl mx-auto font-light">
              Transform your learning journey with StudyBuddy - the intelligent platform designed to 
              <span className="text-blue-300 font-medium"> boost your productivity</span>, 
              organize your study materials, and help you achieve 
              <span className="text-purple-300 font-medium"> academic excellence</span>.
            </p>
          </div>

          {/* CTA Button */}
          <div className={`flex justify-center pt-12 transform transition-all duration-1000 delay-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <button 
              onClick={handleButtonClick}   
              className="group relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold py-6 px-16 sm:py-7 sm:px-20 md:py-8 md:px-24 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 ease-out transform hover:scale-110 hover:-translate-y-2 border border-white/30 backdrop-blur-sm overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide">
                🚀 Start Learning
              </span>
            </button>
          </div>

          {/* Enhanced Features Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 transform transition-all duration-1000 delay-900 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {[
              { icon: "📚", title: "Smart Organization", desc: "AI-powered organization system that adapts to your learning style" },
              { icon: "⚡", title: "Boost Productivity", desc: "Advanced tools and techniques to maximize your learning efficiency" },
              { icon: "🎯", title: "Track Progress", desc: "Real-time analytics and insights to monitor your academic journey" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-white/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className={`pt-16 transform transition-all duration-1000 delay-1100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">50K+</div>
                  <div className="text-gray-300">Active Students</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">98%</div>
                  <div className="text-gray-300">Success Rate</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">24/7</div>
                  <div className="text-gray-300">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Decorative Elements */}
      <div className="fixed top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
      <div className="fixed top-20 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-1000" />
      <div className="fixed bottom-20 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-500" />
      <div className="fixed bottom-10 right-10 w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-1500" />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}