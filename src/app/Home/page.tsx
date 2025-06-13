'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const Card = ({
    title,
    desc,
    emoji,
    route,
  }: {
    title: string;
    desc: string;
    emoji: string;
    route: string;
  }) => (
    <div
      onClick={() => router.push(route)}
      className="cursor-pointer bg-white/10 backdrop-blur-md rounded-2xl p-4 w-80 h-40 shadow-md hover:shadow-blue-400 hover:scale-105 transition-transform duration-300 text-gray-200"
    >
      <div className="flex flex-col h-full justify-between">
        <h2 className="text-lg font-semibold">{emoji} {title}</h2>
        <p className="text-sm text-gray-300">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <Card title="Study Planner" desc="Plan your daily or weekly study schedule." emoji="📅" route="/planner" />
        <Card title="Flashcards" desc="Memorize key concepts quickly." emoji="🧠" route="/flashcards" />
        <Card title="Group Study" desc="Collaborate with your study group." emoji="👥" route="/groupstudy" />
        <Card title="Analytics" desc="Track your progress over time." emoji="📊" route="/analytics" />
        <Card title="Pomodoro Timer" desc="Boost focus with timed sessions." emoji="⏱️" route="/pomodoro" />
        <Card title="Notes" desc="Organize your study materials." emoji="📝" route="/notes" />
      </div>
    </div>
  );
}
