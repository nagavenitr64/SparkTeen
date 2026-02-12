import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useParams, useNavigate } from "react-router-dom";
import {
    User, Book, Compass, ClipboardList, Heart,
    TrendingUp, LogOut, Home, Lightbulb, Menu, X,
    Smile, Trophy, Star, Search, ArrowLeft, ArrowRight, Check, Plus, 
    Target, Bell, Send, MoreHorizontal, Bookmark, Users, ThumbsUp, MessageCircle, Share,
    MessageSquare, ChevronRight, Calendar, Clock, Award, Map, Camera, Video,
    Brain, Activity, LogIn, Sparkles, Gem, Zap, CameraIcon, Headphones
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import components
import Sidebar from "./components/Sidebar";
import WellnessChatbot from "./components/WellnessChatbot";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import QuestPage from "./components/QuestPage";
import TestPage from "./components/TestPage";
import TestResultsPage from "./components/TestResultsPage";
import JournalPage from "./components/JournalPage";
import DiscoverPage from "./components/DiscoverPage";
import CareerDetailPage from "./components/CareerDetailPage";
import CommunityPage from "./components/CommunityPage";
import WellnessPage from "./components/WellnessPage";
import ARCareerExplorer from "./components/ARCareerExplorer";
import SentimentAnalysis from "./components/SentimentAnalysis";

// #############################################################################
// ##### 0. MAIN APP COMPONENT #################################################
// #############################################################################
function App() {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState([]);
    const [wellnessChatOpen, setWellnessChatOpen] = useState(false);

    // Sample user data - in a real app, this would come from authentication
    const sampleUser = {
        name: "Meowmeowcat",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUIdFWUnaJMMp2smZCy21b5dFix-i3s-eD-g&s",
        completedTests: ['mbti', 'skills', 'riasec'],
        interests: ['design', 'technology'],
        points: 1250,
        level: 3,
        achievements: ['first_test', 'journal_streak', 'community_contributor']
    };

    const handleLogin = () => {
        setUser(sampleUser);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className={theme}>
            <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                    {!user ? (
                        <LoginPage onLogin={handleLogin} theme={theme} setTheme={setTheme} />
                    ) : (
                        <>
                            {/* Wellness Chatbot Button (Floating) */}
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setWellnessChatOpen(true)}
                                className="fixed bottom-6 right-6 z-40 bg-indigo-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                            >
                                <MessageSquare size={24} />
                            </motion.button>

                            {/* Wellness Chatbot Modal */}
                            <AnimatePresence>
                                {wellnessChatOpen && (
                                    <WellnessChatbot onClose={() => setWellnessChatOpen(false)} />
                                )}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                <Routes>
                                    <Route path="/" element={<Navigate to="/dashboard" />} />
                                    <Route path="/dashboard" element={<Dashboard user={user} notifications={notifications} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/quest" element={<QuestPage user={user} notifications={notifications} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/quest/:testId" element={<TestPage user={user} setUser={setUser} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/quest/:testId/results" element={<TestResultsPage user={user} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/journal" element={<JournalPage user={user} notifications={notifications} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/discover" element={<DiscoverPage user={user} notifications={notifications} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/discover/:careerId" element={<CareerDetailPage user={user} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/community" element={<CommunityPage user={user} notifications={notifications} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/wellness" element={<WellnessPage user={user} notifications={notifications} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/wellness/ar-career-explorer" element={<ARCareerExplorer user={user} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="/wellness/sentiment-analysis" element={<SentimentAnalysis user={user} theme={theme} setTheme={setTheme} onLogout={handleLogout} />} />
                                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                                </Routes>
                            </AnimatePresence>
                        </>
                    )}
                </div>
            </Router>
        </div>
    );
}

export default App;
