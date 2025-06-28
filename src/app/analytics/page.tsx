'use client';

import React, { useState} from 'react';
import { 
  BarChart, 
  PieChart, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Brain, 
  Target,
  Download,
  Award,
  Activity,
  Zap,
  Calendar,
  Trophy,
  Flame
} from 'lucide-react';

// Dummy data
const studyTimeData = {
  daily: [
    { day: 'Mon', time: 2.5, subject: 'Math' },
    { day: 'Tue', time: 3.2, subject: 'Physics' },
    { day: 'Wed', time: 1.8, subject: 'Chemistry' },
    { day: 'Thu', time: 4.1, subject: 'Biology' },
    { day: 'Fri', time: 2.9, subject: 'Math' },
    { day: 'Sat', time: 5.2, subject: 'Physics' },
    { day: 'Sun', time: 3.7, subject: 'Chemistry' }
  ],
  weekly: [
    { week: 'Week 1', time: 18.5 },
    { week: 'Week 2', time: 22.3 },
    { week: 'Week 3', time: 19.7 },
    { week: 'Week 4', time: 25.1 }
  ],
  bySubject: [
    { subject: 'Mathematics', time: 45.2, color: '#8B5CF6' },
    { subject: 'Physics', time: 38.7, color: '#06B6D4' },
    { subject: 'Chemistry', time: 29.3, color: '#F59E0B' },
    { subject: 'Biology', time: 33.8, color: '#EF4444' }
  ]
};

const progressData = [
  { subject: 'Mathematics', completed: 85, total: 120, color: '#8B5CF6' },
  { subject: 'Physics', completed: 72, total: 95, color: '#06B6D4' },
  { subject: 'Chemistry', completed: 58, total: 88, color: '#F59E0B' },
  { subject: 'Biology', completed: 91, total: 105, color: '#EF4444' }
];

const flashcardData = {
  learned: 247,
  pending: 83,
  reviewing: 29,
  mastered: 195
};

const quizPerformance = [
  { date: '2024-01-01', accuracy: 78 },
  { date: '2024-01-02', accuracy: 82 },
  { date: '2024-01-03', accuracy: 75 },
  { date: '2024-01-04', accuracy: 88 },
  { date: '2024-01-05', accuracy: 91 },
  { date: '2024-01-06', accuracy: 85 },
  { date: '2024-01-07', accuracy: 93 }
];

const weeklyStats = {
  totalStudyTime: 23.4,
  sessionsCompleted: 18,
  averageAccuracy: 87,
  streakDays: 12
};

export default function AnalyticsDashboard() {
  const [timeFilter, setTimeFilter] = useState('weekly');

  // Calculate max values for chart scaling
  const maxDailyTime = Math.max(...studyTimeData.daily.map(d => d.time));

  const exportData = (format: string) => {
    const data = {
      studyTime: studyTimeData,
      progress: progressData,
      flashcards: flashcardData,
      quizPerformance: quizPerformance
    };
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'study-analytics.json';
      a.click();
    } else if (format === 'csv') {
      const csvContent = [
        'Day,Study Time (hours),Subject',
        ...studyTimeData.daily.map(d => `${d.day},${d.time},${d.subject}`)
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'study-data.csv';
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-2xl shadow-2xl">
                  <Activity className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Study Analytics
                </h1>
                <p className="mt-2 text-gray-300 text-lg">Transform your learning journey with powerful insights</p>
              </div>
            </div>
            <div className="mt-6 sm:mt-0 flex items-center gap-4">
              <div className="relative">
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none pr-10"
                >
                  <option value="daily" className="text-gray-900">Daily View</option>
                  <option value="weekly" className="text-gray-900">Weekly View</option>
                  <option value="monthly" className="text-gray-900">Monthly View</option>
                </select>
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => exportData('json')}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1"
                >
                  <Download className="h-4 w-4 group-hover:animate-bounce" />
                  JSON
                </button>
                <button 
                  onClick={() => exportData('csv')}
                  className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-1"
                >
                  <Download className="h-4 w-4 group-hover:animate-bounce" />
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Study Time</p>
                <p className="text-3xl font-bold text-white mt-1">{weeklyStats.totalStudyTime}h</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-sm text-green-400 font-medium">+12% from last week</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Sessions Completed</p>
                <p className="text-3xl font-bold text-white mt-1">{weeklyStats.sessionsCompleted}</p>
                <div className="flex items-center mt-2">
                  <Target className="h-4 w-4 text-blue-400 mr-1" />
                  <p className="text-sm text-blue-400 font-medium">+5 from last week</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-2 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Average Accuracy</p>
                <p className="text-3xl font-bold text-white mt-1">{weeklyStats.averageAccuracy}%</p>
                <div className="flex items-center mt-2">
                  <Trophy className="h-4 w-4 text-yellow-400 mr-1" />
                  <p className="text-sm text-yellow-400 font-medium">+3% improvement</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                <Award className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-red-500/20 hover:-translate-y-2 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">Study Streak</p>
                <p className="text-3xl font-bold text-white mt-1">{weeklyStats.streakDays}</p>
                <div className="flex items-center mt-2">
                  <Flame className="h-4 w-4 text-red-400 mr-1" />
                  <p className="text-sm text-red-400 font-medium">days in a row</p>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Study Time Chart */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <BarChart className="h-6 w-6 text-white" />
                </div>
                Daily Study Time
              </h3>
              <div className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">Last 7 days</div>
            </div>
            <div className="space-y-5">
              {studyTimeData.daily.map((day, index) => (
                <div key={day.day} className="flex items-center gap-6 group">
                  <div className="w-14 text-sm font-semibold text-gray-300">{day.day}</div>
                  <div className="flex-1 relative">
                    <div className="h-10 bg-white/5 rounded-xl overflow-hidden border border-white/10">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl transition-all duration-1000 flex items-center justify-end pr-4 shadow-lg"
                        style={{ 
                          width: `${(day.time / maxDailyTime) * 100}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      >
                        <span className="text-sm text-white font-bold">{day.time}h</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400 w-20 text-right">{day.subject}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                  <PieChart className="h-6 w-6 text-white" />
                </div>
                Subject Progress
              </h3>
            </div>
            <div className="space-y-6">
              {progressData.map((subject, index) => {
                const percentage = Math.round((subject.completed / subject.total) * 100);
                return (
                  <div key={subject.subject} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">{subject.subject}</span>
                      <span className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                        {subject.completed}/{subject.total} ({percentage}%)
                      </span>
                    </div>
                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden border border-white/20">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 shadow-lg"
                        style={{ 
                          width: `${percentage}%`,
                          background: `linear-gradient(90deg, ${subject.color}, ${subject.color}AA)`,
                          animationDelay: `${index * 300}ms`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Flashcard Stats */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                Flashcard Stats
              </h3>
            </div>
            <div className="space-y-4">
              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full shadow-lg"></div>
                  <span className="text-lg font-semibold text-white">Mastered</span>
                </div>
                <span className="text-2xl font-bold text-green-400">{flashcardData.mastered}</span>
              </div>
              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full shadow-lg"></div>
                  <span className="text-lg font-semibold text-white">Learned</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">{flashcardData.learned}</span>
              </div>
              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg"></div>
                  <span className="text-lg font-semibold text-white">Reviewing</span>
                </div>
                <span className="text-2xl font-bold text-yellow-400">{flashcardData.reviewing}</span>
              </div>
              <div className="group flex items-center justify-between p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-pink-400 rounded-full shadow-lg"></div>
                  <span className="text-lg font-semibold text-white">Pending</span>
                </div>
                <span className="text-2xl font-bold text-red-400">{flashcardData.pending}</span>
              </div>
            </div>
          </div>

          {/* Quiz Performance Trend */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                Quiz Performance Trend
              </h3>
              <div className="text-sm text-gray-300 bg-white/10 px-3 py-1 rounded-full">Last 7 days</div>
            </div>
            <div className="relative h-64 bg-white/5 rounded-xl p-4 border border-white/10">
              <svg className="w-full h-full" viewBox="0 0 400 180">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    x2="380"
                    y1={140 - (y * 1.0)}
                    y2={140 - (y * 1.0)}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                ))}
                {/* Y-axis labels */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <text
                    key={y}
                    x="35"
                    y={145 - (y * 1.0)}
                    textAnchor="end"
                    className="text-xs fill-gray-400"
                  >
                    {y}%
                  </text>
                ))}
                {/* Performance line with gradient */}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="50%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                  </linearGradient>
                </defs>
                {/* Area under the curve */}
                <path
                  d={`M 60 140 ${quizPerformance.map((point, index) => 
                    `L ${60 + (index * 45)} ${140 - (point.accuracy * 1.0)}`
                  ).join(' ')} L 375 140 Z`}
                  fill="url(#areaGradient)"
                />
                {/* Performance line */}
                <polyline
                  points={quizPerformance.map((point, index) => 
                    `${60 + (index * 45)},${140 - (point.accuracy * 1.0)}`
                  ).join(' ')}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="4"
                  className="drop-shadow-lg"
                />
                {/* Data points with glow effect */}
                {quizPerformance.map((point, index) => (
                  <g key={index}>
                    <circle
                      cx={60 + (index * 45)}
                      cy={140 - (point.accuracy * 1.0)}
                      r="8"
                      fill="rgba(139, 92, 246, 0.3)"
                      className="animate-pulse"
                    />
                    <circle
                      cx={60 + (index * 45)}
                      cy={140 - (point.accuracy * 1.0)}
                      r="4"
                      fill="#8B5CF6"
                      className="drop-shadow-lg"
                    />
                  </g>
                ))}
              </svg>
            </div>
            <div className="flex justify-between mt-6 text-sm text-gray-400">
              {quizPerformance.map((point, index) => (
                <span key={index} className="font-medium">Day {index + 1}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              Study Time by Subject
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studyTimeData.bySubject.map((subject, index) => (
              <div key={subject.subject} className="group text-center p-8 rounded-2xl bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 hover:-translate-y-2 transition-all duration-500 shadow-xl">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={subject.color}
                      strokeWidth="8"
                      strokeDasharray={`${(subject.time / 50) * 251} 251`}
                      className="transition-all duration-1000 drop-shadow-lg"
                      style={{ animationDelay: `${index * 300}ms` }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {subject.time}h
                    </span>
                    <span className="text-xs text-gray-400 mt-1">This week</span>
                  </div>
                </div>
                <h4 className="font-bold text-xl text-white mb-2">{subject.subject}</h4>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(subject.time / 50) * 100}%`,
                      backgroundColor: subject.color,
                      animationDelay: `${index * 400}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}