'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleClick = () => router.push('/planner');

  const Card = ({ title, desc, emoji }: { title: string, desc: string, emoji: string }) => (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-2xl p-4 w-40 sm:w-48 md:w-56 aspect-square bg-white/10 backdrop-blur-md shadow-md hover:shadow-blue-400 hover:scale-105 transition-transform duration-300 text-gray-200"
    >
      <div className="flex flex-col h-full justify-between">
        <h2 className="text-lg font-semibold">{emoji} {title}</h2>
        <p className="text-sm text-gray-300">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 py-12 px-4 justify-center">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        <Card title="Study Planner" desc="Plan your daily or weekly study schedule." emoji="📅" />
        <Card title="Flashcards" desc="Memorize key concepts quickly." emoji="🧠" />
        <Card title="Group Study" desc="Collaborate with your study group." emoji="👥" />
        <Card title="Analytics" desc="Track your progress over time." emoji="📊" />
        <Card title="Pomodoro Timer" desc="Boost focus with timed sessions." emoji="⏱️" />
        <Card title="Notes" desc="Organize your study materials." emoji="📝" />
      </div>
    </div>
  );
}
