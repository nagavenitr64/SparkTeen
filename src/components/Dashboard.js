import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Compass, Target, Book, Users, Video, Bookmark, 
  Check, Trophy, Sparkles, TrendingUp, Calendar,
  ArrowRight, Star, Zap, Heart, Award, Clock,
  ChevronRight, BarChart3, Brain, Coffee, MessageSquare,
  Search, Bell, Menu, X, Moon, Sun, Activity,
  Flame, Gift, Crown, Shield, Play, Pause,
  TrendingDown, Rocket, Eye, User, Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

function Dashboard({ user, notifications, theme, setTheme, onLogout, updateUser }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState("");
  const [focusTimer, setFocusTimer] = useState({ 
    active: false, 
    time: 1500, // 25 minutes in seconds
    progress: 0,
    interval: null 
  });

  // Enhanced dashboard data with dynamic calculation
  const [dashboardData, setDashboardData] = useState({
    questProgress: 0,
    careerMatches: 0,
    journalEntries: 0,
    communityFriends: 0,
    completedTests: 0,
    totalRequiredTests: 4,
    weeklyStreak: 0,
    monthlyGoals: 0,
    learningMinutes: 0,
    skillLevel: 1,
    points: 0,
    level: 1
  });

  // Stats data - will be calculated dynamically
  const [statsData, setStatsData] = useState([]);

  // User goals with dynamic data
  const [userGoals, setUserGoals] = useState([]);

  // Quick actions
  const quickActions = [
    {
      icon: <Play size={18} />,
      label: "Focus Session",
      description: "25min deep work",
      color: "from-green-500 to-emerald-600",
      path: null,
      action: "focus"
    },
    {
      icon: <Book size={18} />,
      label: "Quick Journal",
      description: "5min reflection",
      color: "from-blue-500 to-cyan-600",
      path: "/journal",
      action: "navigate"
    },
    {
      icon: <Target size={18} />,
      label: "Daily Quest",
      description: "Earn 50 XP",
      color: "from-purple-500 to-pink-600",
      path: "/quest",
      action: "navigate"
    },
    {
      icon: <Users size={18} />,
      label: "Community",
      description: "Connect & learn",
      color: "from-orange-500 to-red-600",
      path: "/community",
      action: "navigate"
    }
  ];

  // Initialize dashboard with real user data
  useEffect(() => {
    initializeDashboard();
    setTimeOfDay(getTimeOfDay());
    
    const timeInterval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 3600000); // Update every hour
    
    return () => {
      clearInterval(timeInterval);
      if (focusTimer.interval) {
        clearInterval(focusTimer.interval);
      }
    };
  }, [user]); // Add user as dependency

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  const initializeDashboard = async () => {
    setIsLoading(true);
    
    try {
      // Load user data from localStorage or props
      const savedData = localStorage.getItem('sparkDashboardData');
      const userData = user || JSON.parse(localStorage.getItem('sparkUserData') || '{}');
      const goalsData = localStorage.getItem('sparkUserGoals');
      const journalEntries = JSON.parse(localStorage.getItem('sparkJournalEntries') || '[]');
      
      // Calculate dynamic values based on actual user data
      const completedTests = userData.completedTests?.length || 0;
      const journalEntriesCount = journalEntries.length || 0;
      const careerMatches = userData.careerMatches?.length || 0;
      const communityFriends = userData.communityFriends?.length || 0;
      const userPoints = userData.points || 0;
      const userLevel = userData.level || 1;
      
      // Calculate quest progress
      const questProgress = Math.min(100, (completedTests / 4) * 100);
      
      // Update dashboard data
      const updatedDashboardData = {
        questProgress,
        careerMatches,
        journalEntries: journalEntriesCount,
        communityFriends,
        completedTests,
        totalRequiredTests: 4,
        weeklyStreak: userData.streak || 0,
        monthlyGoals: userData.monthlyGoals || 0,
        learningMinutes: userData.learningMinutes || 0,
        skillLevel: userLevel,
        points: userPoints,
        level: userLevel
      };
      
      setDashboardData(updatedDashboardData);

      // Update stats with real data
      const updatedStatsData = [
        { 
          label: "Quest Progress", 
          value: `${questProgress}%`, 
          icon: <Compass size={20} />, 
          color: "bg-indigo-500",
          key: "questProgress"
        },
        { 
          label: "Career Matches", 
          value: careerMatches.toString(), 
          icon: <Target size={20} />, 
          color: "bg-green-500",
          key: "careerMatches"
        },
        { 
          label: "Journal Entries", 
          value: journalEntriesCount.toString(), 
          icon: <Book size={20} />, 
          color: "bg-blue-500",
          key: "journalEntries"
        },
        { 
          label: "Community", 
          value: communityFriends.toString(), 
          icon: <Users size={20} />, 
          color: "bg-purple-500",
          key: "communityFriends"
        }
      ];
      
      setStatsData(updatedStatsData);

      // Load or initialize goals
      if (goalsData) {
        setUserGoals(JSON.parse(goalsData));
      } else {
        // Initialize default goals based on user progress
        const defaultGoals = [
          { 
            id: 1, 
            title: "Complete personality assessment", 
            type: "quest", 
            progress: completedTests > 0 ? 1 : 0, 
            target: 1, 
            xp: 50,
            completed: completedTests > 0
          },
          { 
            id: 2, 
            title: "Write first journal entry", 
            type: "journal", 
            progress: journalEntriesCount > 0 ? 1 : 0, 
            target: 1, 
            xp: 30,
            completed: journalEntriesCount > 0
          },
          { 
            id: 3, 
            title: "Explore career matches", 
            type: "discover", 
            progress: careerMatches > 0 ? 1 : 0, 
            target: 1, 
            xp: 25,
            completed: careerMatches > 0
          },
          { 
            id: 4, 
            title: "Complete focus session", 
            type: "focus", 
            progress: 0, 
            target: 1, 
            xp: 40,
            completed: false
          }
        ];
        setUserGoals(defaultGoals);
        localStorage.setItem('sparkUserGoals', JSON.stringify(defaultGoals));
      }
      
      // Simulate loading for better UX
      setTimeout(() => setIsLoading(false), 800);
      
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      setIsLoading(false);
    }
  };

  // Focus timer functionality
  const startFocusTimer = () => {
    if (focusTimer.active) return;

    const timerInterval = setInterval(() => {
      setFocusTimer(prev => {
        if (prev.time <= 1) {
          clearInterval(timerInterval);
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 3000);
          
          // Award points for completed focus session
          const userData = JSON.parse(localStorage.getItem('sparkUserData') || '{}');
          const updatedUserData = {
            ...userData,
            points: (userData.points || 0) + 25,
            learningMinutes: (userData.learningMinutes || 0) + 25
          };
          localStorage.setItem('sparkUserData', JSON.stringify(updatedUserData));
          
          // Update parent component if updateUser function exists
          if (updateUser) {
            updateUser(updatedUserData);
          }
          
          // Update dashboard data
          setDashboardData(prev => ({
            ...prev,
            points: prev.points + 25,
            learningMinutes: prev.learningMinutes + 25
          }));
          
          return { 
            active: false, 
            time: 1500, 
            progress: 100,
            interval: null 
          };
        }
        
        const newTime = prev.time - 1;
        const progress = ((1500 - newTime) / 1500) * 100;
        
        return { 
          ...prev, 
          time: newTime, 
          progress,
          interval: timerInterval 
        };
      });
    }, 1000);

    setFocusTimer(prev => ({
      ...prev,
      active: true,
      interval: timerInterval
    }));
  };

  const stopFocusTimer = () => {
    if (focusTimer.interval) {
      clearInterval(focusTimer.interval);
    }
    setFocusTimer({
      active: false,
      time: 1500,
      progress: 0,
      interval: null
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Goal completion - fixed and dynamic
  const completeGoal = (goalId) => {
    setUserGoals(prevGoals => 
      prevGoals.map(goal => {
        if (goal.id === goalId) {
          const newProgress = goal.progress + 1;
          const completed = newProgress >= goal.target;
          
          // Award XP when goal is completed
          if (completed && !goal.completed) {
            const userData = JSON.parse(localStorage.getItem('sparkUserData') || '{}');
            const updatedUserData = {
              ...userData,
              points: (userData.points || 0) + goal.xp
            };
            localStorage.setItem('sparkUserData', JSON.stringify(updatedUserData));
            
            // Update parent component
            if (updateUser) {
              updateUser(updatedUserData);
            }
            
            // Update dashboard
            setDashboardData(prev => ({
              ...prev,
              points: prev.points + goal.xp
            }));
          }
          
          return { 
            ...goal, 
            progress: newProgress,
            completed: completed 
          };
        }
        return goal;
      })
    );

    // Save goals to localStorage
    const updatedGoals = userGoals.map(goal => 
      goal.id === goalId 
        ? { ...goal, progress: Math.min(goal.target, goal.progress + 1) }
        : goal
    );
    localStorage.setItem('sparkUserGoals', JSON.stringify(updatedGoals));
  };

  // Handle quick action clicks
  const handleQuickAction = (action) => {
    if (action.action === "focus") {
      startFocusTimer();
    } else if (action.action === "navigate" && action.path) {
      navigate(action.path);
    }
  };

  // Refresh dashboard data
  const refreshDashboard = () => {
    initializeDashboard();
  };

  // Dynamic data for other sections
  const upcomingEvents = [
    { 
      id: 1, 
      title: "UX Design Workshop", 
      date: "Tomorrow", 
      time: "4:00 PM", 
      type: "workshop",
      attendees: 23,
      capacity: 30
    },
    { 
      id: 2, 
      title: "Tech Career Fair", 
      date: "Sep 15", 
      time: "10:00 AM", 
      type: "event",
      attendees: 147,
      capacity: 200
    },
    { 
      id: 3, 
      title: "Mentor Session", 
      date: "Today", 
      time: "3:30 PM", 
      type: "mentoring",
      attendees: 1,
      capacity: 1
    }
  ];

  const careerMatches = [
    {
      id: 1,
      title: "UX Designer",
      match: 92,
      description: "Create user-friendly digital experiences",
      icon: <Target size={18} />,
      color: "green"
    },
    {
      id: 2,
      title: "Content Creator",
      match: 88,
      description: "Engage audiences through creative content",
      icon: <MessageSquare size={18} />,
      color: "blue"
    },
    {
      id: 3,
      title: "Career Counselor",
      match: 85,
      description: "Guide others in their career journeys",
      icon: <Users size={18} />,
      color: "purple"
    }
  ];

  const wellnessActivities = [
    { 
      id: 1, 
      title: "Breathing Exercise", 
      duration: "5 min", 
      icon: <Activity size={16} />,
      description: "Calm your mind and focus"
    },
    { 
      id: 2, 
      title: "Quick Reflection", 
      duration: "3 min", 
      icon: <Brain size={16} />,
      description: "Journal your thoughts"
    },
    { 
      id: 3, 
      title: "Mindful Break", 
      duration: "2 min", 
      icon: <Coffee size={16} />,
      description: "Reset and recharge"
    }
  ];

  const getMatchColor = (match) => {
    if (match >= 90) return "text-green-600 dark:text-green-400";
    if (match >= 80) return "text-blue-600 dark:text-blue-400";
    if (match >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-600 dark:text-gray-400";
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <Sidebar currentPage="dashboard" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
        <main className="flex-1 p-8 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Preparing Your Dashboard
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Loading your personalized insights...
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Sidebar currentPage="dashboard" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300 relative overflow-hidden">
        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 2 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 rounded-3xl shadow-2xl text-center"
              >
                <Trophy size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Focus Session Complete! 🎉</h3>
                <p className="text-yellow-100">+25 XP • Great work!</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div className="mb-4 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-gray-800 dark:text-white"
            >
              Good {timeOfDay}, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{user?.name || 'Explorer'}!</span> 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 dark:text-gray-300 mt-2 flex items-center"
            >
              <Sparkles size={16} className="mr-2 text-amber-500" /> 
              {dashboardData.points === 0 
                ? "Start your career journey today!" 
                : `You have ${dashboardData.points} XP - keep going!`}
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center space-x-4"
          >
            {/* Focus Timer */}
            {focusTimer.active && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-2xl shadow-lg flex items-center gap-3"
              >
                <div className="flex items-center gap-2">
                  <Activity size={16} />
                  <span className="font-mono font-bold">{formatTime(focusTimer.time)}</span>
                </div>
                <button 
                  onClick={stopFocusTimer}
                  className="text-white/80 hover:text-white"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
            
            <div className="hidden md:flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Level {dashboardData.level} Explorer</span>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-2xl shadow-md">
              <Trophy size={18} className="mr-2" />
              <span className="font-medium">{dashboardData.points} Points</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction(action)}
              className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all text-left group`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  {action.icon}
                </div>
              </div>
              <h3 className="font-semibold text-white text-sm">{action.label}</h3>
              <p className="text-white/80 text-xs mt-1">{action.description}</p>
            </motion.button>
          ))}
        </motion.div>

        {/* Clean Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsData.map((stat, index) => (
            <motion.div 
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => {
                // Navigate to relevant page based on stat
                if (stat.key === 'questProgress') navigate('/quest');
                else if (stat.key === 'journalEntries') navigate('/journal');
                else if (stat.key === 'careerMatches') navigate('/discover');
                else if (stat.key === 'communityFriends') navigate('/community');
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">{stat.label}</h3>
                <div className={`p-2 ${stat.color} text-white rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Progress & Goals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-2 space-y-6"
          >
            {/* Enhanced Quest Progress */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Career Quest</h2>
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                    {dashboardData.completedTests}/{dashboardData.totalRequiredTests} completed
                  </div>
                  <button 
                    onClick={() => navigate("/quest")}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Rocket size={16} />
                    {dashboardData.completedTests === 0 ? 'Start Quest' : 'Continue'}
                  </button>
                </div>
              </div>
              
              {/* Enhanced Progress Visualization */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Foundation Phase</span>
                  <span className="text-sm font-bold text-indigo-600">{dashboardData.questProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${dashboardData.questProgress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full shadow-lg"
                  />
                </div>
                
                {/* Progress Milestones */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  {['Discovery', 'Assessment', 'Matching', 'Action'].map((phase, index) => (
                    <div key={phase} className={`p-2 rounded-lg ${
                      index < dashboardData.completedTests 
                        ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                        : index === dashboardData.completedTests
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}>
                      <div className="text-xs font-semibold">{phase}</div>
                      <div className="text-lg font-bold">
                        {index < dashboardData.completedTests ? '✓' : index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Goals Tracking */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Goals</h2>
                <button 
                  onClick={() => navigate("/progress")}
                  className="text-indigo-600 dark:text-indigo-400 text-sm font-medium flex items-center"
                >
                  View all <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {userGoals.map((goal, index) => (
                  <motion.div 
                    key={goal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div 
                        onClick={() => completeGoal(goal.id)}
                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                          goal.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : goal.progress > 0
                            ? 'bg-blue-500 border-blue-500 text-white'
                            : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                        }`}
                      >
                        {goal.completed ? (
                          <Check size={14} />
                        ) : goal.progress > 0 ? (
                          <div className="text-xs font-bold">{goal.progress}</div>
                        ) : null}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                          {goal.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                goal.completed 
                                  ? 'bg-green-500'
                                  : 'bg-gradient-to-r from-blue-400 to-cyan-500'
                              }`}
                              style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {goal.progress}/{goal.target}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-amber-600 dark:text-amber-400">
                        +{goal.xp} XP
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {goal.type}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Clean Sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Upcoming Events */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <motion.div 
                    key={event.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className={`p-2 rounded mr-3 ${
                      event.type === "workshop" 
                        ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300" 
                        : event.type === "event" 
                        ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
                        : "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
                    }`}>
                      <Calendar size={16} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-white">{event.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.date} • {event.time}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{event.attendees}/{event.capacity}</span>
                      </div>
                    </div>
                    <button className="text-indigo-600 dark:text-indigo-400 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition-colors">
                      RSVP
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Career Matches Preview */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Career Matches</h2>
                <div className="text-sm font-medium text-green-600 dark:text-green-400">
                  <TrendingUp size={16} className="inline mr-1" /> 
                  {dashboardData.careerMatches > 0 ? 'New' : 'Discover'}
                </div>
              </div>
              
              <div className="space-y-4">
                {careerMatches.map((career, index) => (
                  <motion.div 
                    key={career.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                    onClick={() => navigate("/discover")}
                  >
                    <div className={`w-10 h-10 ${
                      career.color === 'green' ? 'bg-green-500' :
                      career.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                    } rounded-full flex items-center justify-center text-white mr-3`}>
                      {career.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 dark:text-white">{career.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{career.description}</p>
                      <div className="flex items-center mt-1">
                        <div className={`w-full ${
                          career.color === 'green' ? 'bg-green-100 dark:bg-green-800' :
                          career.color === 'blue' ? 'bg-blue-100 dark:bg-blue-800' : 'bg-purple-100 dark:bg-purple-800'
                        } rounded-full h-1.5 mr-2`}>
                          <div className={`${
                            career.color === 'green' ? 'bg-green-500' :
                            career.color === 'blue' ? 'bg-blue-500' : 'bg-purple-500'
                          } h-1.5 rounded-full`} style={{ width: `${career.match}%` }}></div>
                        </div>
                        <span className={`text-xs font-medium ${getMatchColor(career.match)}`}>
                          {career.match}%
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate("/discover")}
                className="w-full mt-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2.5 px-4 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                Explore More Careers <ChevronRight size={16} className="ml-2" />
              </button>
            </div>

            {/* Enhanced Wellness Card */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              
              <div className="relative">
                <h2 className="text-xl font-semibold mb-2">Mindful Break</h2>
                <p className="text-indigo-100 mb-4">Take a moment for your wellbeing</p>
                
                <div className="space-y-3 mb-4">
                  {wellnessActivities.map((activity) => (
                    <motion.div 
                      key={activity.id}
                      whileHover={{ x: 5 }}
                      className="flex items-center justify-between bg-white/10 p-3 rounded-lg cursor-pointer backdrop-blur-sm hover:bg-white/15 transition-colors"
                      onClick={() => navigate("/wellness")}
                    >
                      <div className="flex items-center">
                        {activity.icon}
                        <div className="ml-2">
                          <span className="text-sm flex-1">{activity.title}</span>
                          <p className="text-xs text-indigo-200">{activity.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs opacity-80 mr-2">{activity.duration}</span>
                        <Play size={12} className="opacity-70" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <button 
                  onClick={() => navigate("/wellness")}
                  className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-2.5 px-5 rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  Start Wellness Activity
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
