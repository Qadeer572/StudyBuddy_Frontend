'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const Card = ({
    title,
    desc,
    emoji,
    route,
    gradient,
    glowColor,
  }: {
    title: string;
    desc: string;
    emoji: string;
    route: string;
    gradient: string;
    glowColor: string;
  }) => (
    <div
      onClick={() => router.push(route)}
      className={`group cursor-pointer relative overflow-hidden rounded-3xl p-6 w-80 h-48 shadow-2xl hover:shadow-${glowColor} hover:scale-110 transition-all duration-500 transform hover:-rotate-2 ${gradient}`}
      style={{
        background: `linear-gradient(135deg, ${gradient})`,
        boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)`,
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-6 left-6 w-1 h-1 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
      </div>
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between text-white">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl group-hover:scale-125 transition-transform duration-300 filter drop-shadow-lg">
            {emoji}
          </span>
          <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        
        <p className="text-sm text-gray-100/90 leading-relaxed font-medium">
          {desc}
        </p>
        
        {/* Hover arrow indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-5 h-5 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
    </div>
  );

  const cards = [
    {
      title: "Study Planner",
      desc: "Master your time with intelligent scheduling and personalized study plans.",
      emoji: "📅",
      route: "/studyPlanner",
      gradient: "from-purple-600 via-purple-700 to-indigo-800",
      glowColor: "purple-500/50",
    },
    {
      title: "Flashcards",
      desc: "Accelerate learning with smart flashcards and spaced repetition.",
      emoji: "🧠",
      route: "/flashCard",
      gradient: "from-pink-500 via-rose-600 to-red-700",
      glowColor: "pink-500/50",
    },
    {
      title: "Group Study",
      desc: "Connect, collaborate, and conquer challenges together with your peers.",
      emoji: "👥",
      route: "/groupStudy",
      gradient: "from-emerald-500 via-teal-600 to-cyan-700",
      glowColor: "emerald-500/50",
    },
    {
      title: "Analytics",
      desc: "Visualize your progress with detailed insights and performance metrics.",
      emoji: "📊",
      route: "/analytics",
      gradient: "from-blue-500 via-indigo-600 to-purple-700",
      glowColor: "blue-500/50",
    },
    {
      title: "Pomodoro Timer",
      desc: "Maximize productivity with focused work sessions and strategic breaks.",
      emoji: "⏱️",
      route: "/promordoTimer",
      gradient: "from-orange-500 via-amber-600 to-yellow-600",
      glowColor: "orange-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-bounce"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 animate-pulse">
            StudyHub
          </h1>
          <p className="text-xl text-gray-300 font-light max-w-2xl">
            Transform your learning journey with powerful tools designed for academic excellence
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Card {...card} />
            </div>
          ))}
        </div>
        
        {/* Footer accent */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Choose your path to success</span>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}