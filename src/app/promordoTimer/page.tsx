'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Settings, BarChart3, StickyNote, Timer, Clock, Target, TrendingUp, CalendarDays, Volume2, VolumeX, Trash2 } from 'lucide-react';

type SessionType = 'work' | 'shortBreak' | 'longBreak';

interface Session {
  id: number;
  date: string;
  completed: number;
  target: number;
  workMinutes: number;
}

interface Distraction {
  id: number;
  text: string;
  timestamp: Date;
}

interface Settings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  autoStart: boolean;
  soundEnabled: boolean;
}

export default function Home() {
  // Settings state
  const [settings, setSettings] = useState<Settings>({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    autoStart: true,
    soundEnabled: true,
  });

  // Timer state
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [sessionType, setSessionType] = useState<SessionType>('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<{ play: () => void } | null>(null);

  // Session data (dummy data)
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: 1,
      date: new Date().toISOString().split('T')[0],
      completed: 4,
      target: 8,
      workMinutes: 100,
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      completed: 6,
      target: 8,
      workMinutes: 150,
    },
    {
      id: 3,
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      completed: 3,
      target: 6,
      workMinutes: 75,
    },
  ]);

  // Distraction notes (dummy data)
  const [distractions, setDistractions] = useState<Distraction[]>([
    { id: 1, text: 'Check email about project deadline', timestamp: new Date() },
    { id: 2, text: 'Research React hooks optimization', timestamp: new Date(Date.now() - 300000) },
  ]);

  const [currentSession, setCurrentSession] = useState({
    completed: 0,
    target: 8,
    workMinutes: 0,
  });

  // UI state
  const [activeTab, setActiveTab] = useState('timer');
  const [distractionText, setDistractionText] = useState('');
  const [newDistraction, setNewDistraction] = useState('');

  const sessionDurations = {
    work: settings.workDuration * 60,
    shortBreak: settings.shortBreakDuration * 60,
    longBreak: settings.longBreakDuration * 60,
  };

  const currentDuration = sessionDurations[sessionType];
  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;

  // Initialize audio
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create a simple beep sound using Web Audio API
      const createBeepSound = () => {
        const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      };
      
      audioRef.current = { play: createBeepSound };
    }
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSessionComplete();
    }
  }, [timeLeft]);

  const handleSessionComplete = () => {
    setIsRunning(false);
    
    if (settings.soundEnabled && audioRef.current) {
      audioRef.current.play();
    }

    if (sessionType === 'work') {
      completePomodoro();
      setCompletedSessions(prev => prev + 1);
      
      const nextSessionType = (completedSessions + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      setSessionType(nextSessionType);
      setTimeLeft(sessionDurations[nextSessionType]);
    } else {
      setSessionType('work');
      setTimeLeft(sessionDurations.work);
    }

    if (settings.autoStart) {
      setTimeout(() => setIsRunning(true), 1000);
    }
  };

  const completePomodoro = () => {
    setCurrentSession(prev => ({
      ...prev,
      completed: prev.completed + 1,
      workMinutes: prev.workMinutes + settings.workDuration,
    }));

    setSessions(prev => {
      const today = new Date().toISOString().split('T')[0];
      const existingSession = prev.find(s => s.date === today);
      
      if (existingSession) {
        return prev.map(s => 
          s.date === today 
            ? { ...s, completed: s.completed + 1, workMinutes: s.workMinutes + settings.workDuration }
            : s
        );
      } else {
        return [{
          id: prev.length + 1,
          date: today,
          completed: 1,
          target: 8,
          workMinutes: settings.workDuration,
        }, ...prev];
      }
    });
  };

  const addDistraction = (text: string) => {
    const newDistractionItem = {
      id: distractions.length + 1,
      text,
      timestamp: new Date(),
    };
    setDistractions([newDistractionItem, ...distractions]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getSessionColor = () => {
    switch (sessionType) {
      case 'work':
        return 'from-red-500 to-orange-500';
      case 'shortBreak':
        return 'from-green-500 to-emerald-500';
      case 'longBreak':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-red-500 to-orange-500';
    }
  };

  const getSessionLabel = () => {
    switch (sessionType) {
      case 'work':
        return 'Focus Time';
      case 'shortBreak':
        return 'Short Break';
      case 'longBreak':
        return 'Long Break';
      default:
        return 'Focus Time';
    }
  };

  const handleAddDistraction = () => {
    if (distractionText.trim()) {
      addDistraction(distractionText.trim());
      setDistractionText('');
    }
  };

  const handleAddDistractionFromNotes = () => {
    if (newDistraction.trim()) {
      addDistraction(newDistraction.trim());
      setNewDistraction('');
    }
  };

  const updateSetting = (key: keyof Settings, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetToDefaults = () => {
    setSettings({
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      autoStart: true,
      soundEnabled: true,
    });
  };

  // Stats calculations
  const totalSessions = sessions.reduce((sum, session) => sum + session.completed, 0);
  const totalMinutes = sessions.reduce((sum, session) => sum + session.workMinutes, 0);
  const averageCompletion = sessions.length > 0 
    ? (sessions.reduce((sum, session) => sum + (session.completed / session.target), 0) / sessions.length) * 100
    : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTimeDisplay = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDateStamp = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Focus Flow</h1>
          <p className="text-gray-300">Boost your productivity with the Pomodoro Technique</p>
        </div>

        {/* Tabs */}
        <div className="w-full mb-8">
          <div className="grid w-full grid-cols-4 bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-lg p-1 shadow-sm">
            {[
              { id: 'timer', label: 'Timer', icon: Timer },
              { id: 'stats', label: 'Stats', icon: BarChart3 },
              { id: 'notes', label: 'Notes', icon: StickyNote },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center text-white justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === id
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Timer Tab */}
        {activeTab === 'timer' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-8">
                  <div className="text-center space-y-6">
                    <div className="space-y-2">
                      <div className={`inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getSessionColor()}`}>
                        {getSessionLabel()}
                      </div>
                      <div className="text-6xl font-bold text-white font-mono">
                        {formatTime(timeLeft)}
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 bg-gradient-to-r ${getSessionColor()}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-center gap-4">
                      {!isRunning ? (
                        <button 
                          onClick={() => setIsRunning(true)}
                          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
                        >
                          <Play className="w-5 h-5" />
                          Start
                        </button>
                      ) : (
                        <button 
                          onClick={() => setIsRunning(false)}
                          className="flex items-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 rounded-lg font-medium transition-all"
                        >
                          <Pause className="w-5 h-5" />
                          Pause
                        </button>
                      )}
                      
                      <button 
                        onClick={() => {
                          setIsRunning(false);
                          setTimeLeft(currentDuration);
                        }}
                        className="flex items-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-300 hover:border-gray-400 hover:bg-blue-950 rounded-lg font-medium transition-all"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Reset
                      </button>
                    </div>

                    <div className="text-sm text-gray-300">
                      Sessions completed today: <span className="font-semibold">{completedSessions}</span>
                    </div>

                    {sessionType === 'work' && (
                      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 border border-gray-500 rounded-lg p-4">
                        <h4 className="font-medium mb-2 text-gray-300">Quick Distraction Note</h4>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={distractionText}
                            onChange={(e) => setDistractionText(e.target.value)}
                            placeholder="Jot down a quick thought..."
                            className="flex-1 px-3 py-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onKeyPress={(e) => e.key === 'Enter' && handleAddDistraction()}
                          />
                          <button 
                            onClick={handleAddDistraction}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white rounded-md transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Todays Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Completed</span>
                      <span className="font-bold text-lg">{currentSession.completed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Target</span>
                      <span className="font-bold text-lg">{currentSession.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((currentSession.completed / currentSession.target) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-300">
                      Focus time: {currentSession.workMinutes} minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-100">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-300">{totalSessions}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-100">Focus Time</p>
                    <p className="text-2xl font-bold text-gray-300">{formatTimeDisplay(totalMinutes)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-100">Avg. Completion</p>
                    <p className="text-2xl font-bold text-gray-300">{averageCompletion.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-100">Active Days</p>
                    <p className="text-2xl font-bold text-gray-300">{sessions.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Sessions</h3>
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-gray-300">
                        {formatDate(session.date)}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.completed >= session.target 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {session.completed}/{session.target} sessions
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-300">
                        {formatTimeDisplay(session.workMinutes)}
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full"
                          style={{ width: `${(session.completed / session.target) * 100}%` }}
                        />
                      </div>
                      <div className="text-sm font-medium">
                        {Math.round((session.completed / session.target) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Capture Distractions</h3>
              <p className="text-sm text-gray-300 mb-4">
                Write down thoughts that pop up during focus sessions to review later.
              </p>
              <div className="space-y-4">
                <textarea
                  value={newDistraction}
                  onChange={(e) => setNewDistraction(e.target.value)}
                  placeholder="What's on your mind? (e.g., 'Check email about project deadline', 'Research React hooks')"
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button 
                  onClick={handleAddDistractionFromNotes}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white rounded-lg font-medium transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Distraction
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Recent Distractions</h3>
                <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {distractions.length} notes
                </div>
              </div>
              
              {distractions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-2">
                    <Clock className="h-12 w-12 mx-auto" />
                  </div>
                  <p className="text-gray-500">No distractions captured yet</p>
                  <p className="text-sm text-gray-400">
                    Add your first distraction note above
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {distractions.map((distraction) => (
                    <div 
                      key={distraction.id}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-gray-300 mb-2">{distraction.text}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-200">
                          <Clock className="h-3 w-3" />
                          <span>{formatDateStamp(distraction.timestamp)}</span>
                          <span>•</span>
                          <span>{formatTimestamp(distraction.timestamp)}</span>
                        </div>
                      </div>
                      <button className="text-gray-300 hover:text-red-500 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 border border-blue-200 rounded-xl p-6">
              <h4 className="font-medium mb-2 text-yellow-500">💡 Pro Tips</h4>
              <ul className="text-sm text-yellow-500 space-y-1">
                <li>• Capture distractions quickly during focus sessions</li>
                <li>• Review and act on notes during breaks</li>
                <li>• Use specific, actionable language</li>
                <li>• Delete completed items to keep the list clean</li>
              </ul>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Session Durations</h3>
                <button 
                  onClick={resetToDefaults}
                  className="flex items-center gap-2 px-4 py-2 border bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 border-gray-300 text-white hover:bg-gray-50 rounded-lg text-sm transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Defaults
                </button>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium">Work Duration</label>
                    <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {settings.workDuration} minutes
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={settings.workDuration}
                    onChange={(e) => updateSetting('workDuration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm text-gray-300">
                    The focused work period. Recommended: 25 minutes
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium">Short Break</label>
                    <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {settings.shortBreakDuration} minutes
                    </div>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    step="1"
                    value={settings.shortBreakDuration}
                    onChange={(e) => updateSetting('shortBreakDuration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm text-gray-300">
                    Quick break after each work session. Recommended: 5 minutes
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-base font-medium">Long Break</label>
                    <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {settings.longBreakDuration} minutes
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="30"
                    step="5"
                    value={settings.longBreakDuration}
                    onChange={(e) => updateSetting('longBreakDuration', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-sm text-gray-300">
                    Extended break after 4 work sessions. Recommended: 15 minutes
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-6">Behavior</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-base font-medium">Auto-start Sessions</label>
                    <p className="text-sm text-gray-300">
                      Automatically start the next session after a break
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoStart}
                      onChange={(e) => updateSetting('autoStart', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <label className="text-base font-medium flex items-center gap-2">
                      {settings.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      Sound Notifications
                    </label>
                    <p className="text-sm text-gray-300">
                      Play a sound when sessions start and end
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.soundEnabled}
                      onChange={(e) => updateSetting('soundEnabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 via-blue-800 to-indigo-900 border border-red-200 rounded-xl p-6">
              <h4 className="font-medium mb-3 text-yellow-500">🍅 About the Pomodoro Technique</h4>
              <div className="text-sm text-yellow-500 space-y-2">
                <p>The Pomodoro Technique is a time management method that uses a timer to break work into intervals:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Work for 25 minutes (1 Pomodoro)</li>
                  <li>Take a 5-minute break</li>
                  <li>After 4 Pomodoros, take a longer 15-30 minute break</li>
                </ul>
                <p>This technique helps maintain focus while preventing burnout.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}