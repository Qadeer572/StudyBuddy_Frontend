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
  //Calendar,
 // Filter,
  Award,
  Activity,
  //Users,
  Zap
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
    { subject: 'Mathematics', time: 45.2, color: '#3B82F6' },
    { subject: 'Physics', time: 38.7, color: '#10B981' },
    { subject: 'Chemistry', time: 29.3, color: '#F59E0B' },
    { subject: 'Biology', time: 33.8, color: '#EF4444' }
  ]
};

const progressData = [
  { subject: 'Mathematics', completed: 85, total: 120, color: '#3B82F6' },
  { subject: 'Physics', completed: 72, total: 95, color: '#10B981' },
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
  //const [selectedSubject, setSelectedSubject] = useState('all');

  // Calculate max values for chart scaling
  const maxDailyTime = Math.max(...studyTimeData.daily.map(d => d.time));
  //const maxWeeklyTime = Math.max(...studyTimeData.weekly.map(d => d.time));

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
      // Simple CSV export for study time data
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                Study Analytics
              </h1>
              <p className="mt-2 text-slate-600">Track your learning progress and optimize your study habits</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center gap-3">
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily View</option>
                <option value="weekly">Weekly View</option>
                <option value="monthly">Monthly View</option>
              </select>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => exportData('json')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Export JSON
                </button>
                <button 
                  onClick={() => exportData('csv')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Study Time</p>
                <p className="text-2xl font-bold text-slate-900">{weeklyStats.totalStudyTime}h</p>
                <p className="text-xs text-green-600 mt-1">+12% from last week</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Sessions Completed</p>
                <p className="text-2xl font-bold text-slate-900">{weeklyStats.sessionsCompleted}</p>
                <p className="text-xs text-green-600 mt-1">+5 from last week</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Average Accuracy</p>
                <p className="text-2xl font-bold text-slate-900">{weeklyStats.averageAccuracy}%</p>
                <p className="text-xs text-green-600 mt-1">+3% improvement</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Study Streak</p>
                <p className="text-2xl font-bold text-slate-900">{weeklyStats.streakDays}</p>
                <p className="text-xs text-green-600 mt-1">days in a row</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Study Time Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600" />
                Daily Study Time
              </h3>
              <div className="text-sm text-slate-500">Last 7 days</div>
            </div>
            <div className="space-y-4">
              {studyTimeData.daily.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-slate-600">{day.day}</div>
                  <div className="flex-1 relative">
                    <div className="h-8 bg-slate-100 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg transition-all duration-700 flex items-center justify-end pr-2"
                        style={{ width: `${(day.time / maxDailyTime) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{day.time}h</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 w-16">{day.subject}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-green-600" />
                Subject Progress
              </h3>
            </div>
            <div className="space-y-4">
              {progressData.map((subject) => {
                const percentage = Math.round((subject.completed / subject.total) * 100);
                return (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">{subject.subject}</span>
                      <span className="text-sm text-slate-500">{subject.completed}/{subject.total} ({percentage}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: subject.color 
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
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Flashcard Stats
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Mastered</span>
                </div>
                <span className="text-lg font-bold text-green-600">{flashcardData.mastered}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Learned</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{flashcardData.learned}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Reviewing</span>
                </div>
                <span className="text-lg font-bold text-yellow-600">{flashcardData.reviewing}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-slate-700">Pending</span>
                </div>
                <span className="text-lg font-bold text-red-600">{flashcardData.pending}</span>
              </div>
            </div>
          </div>

          {/* Quiz Performance Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-600" />
                Quiz Performance Trend
              </h3>
              <div className="text-sm text-slate-500">Last 7 days</div>
            </div>
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 400 150">
                {/* Grid lines */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="40"
                    x2="380"
                    y1={120 - (y * 0.8)}
                    y2={120 - (y * 0.8)}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                ))}
                {/* Y-axis labels */}
                {[0, 25, 50, 75, 100].map((y) => (
                  <text
                    key={y}
                    x="35"
                    y={125 - (y * 0.8)}
                    textAnchor="end"
                    className="text-xs fill-slate-400"
                  >
                    {y}%
                  </text>
                ))}
                {/* Performance line */}
                <polyline
                  points={quizPerformance.map((point, index) => 
                    `${60 + (index * 45)},${120 - (point.accuracy * 0.8)}`
                  ).join(' ')}
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  className="drop-shadow-sm"
                />
                {/* Data points */}
                {quizPerformance.map((point, index) => (
                  <circle
                    key={index}
                    cx={60 + (index * 45)}
                    cy={120 - (point.accuracy * 0.8)}
                    r="4"
                    fill="#4f46e5"
                    className="drop-shadow-sm"
                  />
                ))}
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="flex justify-between mt-4 text-xs text-slate-500">
              {quizPerformance.map((point, index) => (
                <span key={index}>Day {index + 1}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              Study Time by Subject
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyTimeData.bySubject.map((subject) => (
              <div key={subject.subject} className="text-center p-6 rounded-lg border border-slate-200 hover:shadow-md transition-shadow">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      fill="none"
                      stroke={subject.color}
                      strokeWidth="8"
                      strokeDasharray={`${(subject.time / 50) * 201} 201`}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold" style={{ color: subject.color }}>
                      {subject.time}h
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{subject.subject}</h4>
                <p className="text-sm text-slate-500">This week</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}