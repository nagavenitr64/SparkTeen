import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    Zap, Sparkles, TrendingUp, Heart, Book, Target, 
    Search, Video, Map, Sparkles as SparklesIcon 
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function DiscoverPage({ user, notifications, theme, setTheme, onLogout }) {
    const navigate = useNavigate();
    
    const careerCategories = [
        { id: "technology", name: "Technology", icon: <Zap size={20} />, count: 24 },
        { id: "design", name: "Design & Creative", icon: <Sparkles size={20} />, count: 18 },
        { id: "business", name: "Business", icon: <TrendingUp size={20} />, count: 22 },
        { id: "healthcare", name: "Healthcare", icon: <Heart size={20} />, count: 15 },
        { id: "education", name: "Education", icon: <Book size={20} />, count: 12 },
        { id: "trades", name: "Skilled Trades", icon: <Target size={20} />, count: 16 }
    ];
    
    const recommendedCareers = [
        { id: 1, title: "UX Designer", category: "Technology", description: "Create meaningful digital experiences", salary: "$75,000 - $110,000", growth: "15%", match: 92 },
        { id: 2, title: "Content Creator", category: "Design & Creative", description: "Develop engaging content across platforms", salary: "$45,000 - $85,000", growth: "12%", match: 88 },
        { id: 3, title: "Career Counselor", category: "Education", description: "Help others find their career path", salary: "$50,000 - $70,000", growth: "8%", match: 85 },
        { id: 4, title: "Graphic Designer", category: "Design & Creative", description: "Create visual concepts to communicate ideas", salary: "$45,000 - $75,000", growth: "5%", match: 82 }
    ];
    
    const handleCareerClick = (careerId) => {
        navigate(`/discover/${careerId}`);
    };
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="discover" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Career Discovery</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Explore careers that match your interests, skills, and personality</p>
                        </div>
                        
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search careers..." 
                                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8"
                >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Career Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {careerCategories.map(category => (
                            <div key={category.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-center cursor-pointer hover:shadow-md transition-shadow">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-xl mb-2">
                                    {category.icon}
                                </div>
                                <h3 className="font-medium text-gray-800 dark:text-white">{category.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{category.count} careers</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Recommended For You</h2>
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">View all</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendedCareers.map(career => (
                            <div 
                                key={career.id} 
                                onClick={() => handleCareerClick(career.id)}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{career.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{career.category}</p>
                                    </div>
                                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                                        {career.match}% match
                                    </div>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-300 mt-3">{career.description}</p>
                                
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Salary Range</p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-white">{career.salary}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Job Growth</p>
                                        <p className="text-sm font-medium text-green-600 dark:text-green-400">{career.growth} (5 yrs)</p>
                                    </div>
                                </div>
                                
                                <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                    Explore Career
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Career Exploration Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-lg mb-2">
                                <Video size={24} />
                            </div>
                            <h3 className="font-medium text-gray-800 dark:text-white">Career Videos</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Watch day-in-the-life videos</p>
                        </div>
                        
                        <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg text-center cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 rounded-lg mb-2">
                                <Map size={24} />
                            </div>
                            <h3 className="font-medium text-gray-800 dark:text-white">Career Pathways</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Explore education requirements</p>
                        </div>
                        
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg text-center cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 rounded-lg mb-2">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="font-medium text-gray-800 dark:text-white">Job Outlook</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">See growth projections</p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

export default DiscoverPage;
