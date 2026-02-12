import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    Heart, CameraIcon, Brain, Activity, 
    Video, Book, Headphones, Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function WellnessPage({ user, notifications, theme, setTheme, onLogout }) {
    const navigate = useNavigate();
    
    const wellnessTools = [
        { 
            id: "ar-career-explorer", 
            title: "AR Career Explorer", 
            description: "Visualize yourself in different careers using augmented reality", 
            icon: <CameraIcon size={24} />, 
            color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300"
        },
        { 
            id: "sentiment-analysis", 
            title: "Sentiment Analysis", 
            description: "Analyze your journal entries to understand your emotional patterns", 
            icon: <Brain size={24} />, 
            color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
        },
        { 
            id: "meditation", 
            title: "Guided Meditation", 
            description: "Reduce stress and improve focus with guided meditation sessions", 
            icon: <Activity size={24} />, 
            color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
        },
        { 
            id: "breathing", 
            title: "Breathing Exercises", 
            description: "Simple breathing techniques to manage anxiety and stress", 
            icon: <Heart size={24} />, 
            color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
        }
    ];
    
    const handleToolClick = (toolId) => {
        navigate(`/wellness/${toolId}`);
    };
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="wellness" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Wellness Center</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Tools and resources to support your mental health and career journey</p>
                        </div>
                        
                        <div className="flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full">
                            <Heart size={18} className="mr-2" />
                            <span className="font-medium">Self-care matters</span>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mt-8"
                >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Wellness Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {wellnessTools.map(tool => (
                            <div 
                                key={tool.id} 
                                onClick={() => handleToolClick(tool.id)}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start">
                                    <div className={`p-3 rounded-xl ${tool.color} mr-4`}>
                                        {tool.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{tool.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{tool.description}</p>
                                    </div>
                                </div>
                                <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                                    Try Now
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Wellness Tips</h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                                <h3 className="font-medium text-gray-800 dark:text-white">Manage Career Anxiety</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">It's normal to feel uncertain about your future. Remember that career paths are rarely linear.</p>
                            </div>
                            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                <h3 className="font-medium text-gray-800 dark:text-white">Practice Self-Compassion</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Be kind to yourself when facing setbacks. Everyone experiences challenges in their career journey.</p>
                            </div>
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                                <h3 className="font-medium text-gray-800 dark:text-white">Set Healthy Boundaries</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Balance career exploration with rest and other important aspects of your life.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Resources</h2>
                        <div className="space-y-4">
                            <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded mr-3">
                                    <Video size={16} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-white">Mindfulness for Students</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Video • 15 min</p>
                                </div>
                                <button className="ml-auto text-indigo-600 dark:text-indigo-400 text-sm font-medium">Watch</button>
                            </div>
                            
                            <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded mr-3">
                                    <Book size={16} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-white">Coping with Career Stress</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Article • 8 min read</p>
                                </div>
                                <button className="ml-auto text-indigo-600 dark:text-indigo-400 text-sm font-medium">Read</button>
                            </div>
                            
                            <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded mr-3">
                                    <Headphones size={16} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-white">Guided Relaxation</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Audio • 20 min</p>
                                </div>
                                <button className="ml-auto text-indigo-600 dark:text-indigo-400 text-sm font-medium">Listen</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Crisis Resources</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">If you're experiencing a mental health crisis, please reach out to these resources:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                            <h3 className="font-medium text-gray-800 dark:text-white">National Suicide Prevention Lifeline</h3>
                            <p className="text-red-600 dark:text-red-400 font-medium">988</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Available 24/7</p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                            <h3 className="font-medium text-gray-800 dark:text-white">Crisis Text Line</h3>
                            <p className="text-blue-600 dark:text-blue-400 font-medium">Text HOME to 741741</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Available 24/7</p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

export default WellnessPage;
