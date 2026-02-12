
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    User, Compass, Heart, Target, Brain, 
    Check, Trophy, Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function QuestPage({ user, notifications, theme, setTheme, onLogout }) {
    const assessments = [
        { 
            id: "mbti", 
            title: "Personality Assessment (MBTI)", 
            description: "Discover your personality type and see how it influences your choices.", 
            icon: <User size={24} />, 
            completed: user.completedTests.includes('mbti'), 
            time: "15 min", 
            required: true,
            results: user.completedTests.includes('mbti') ? {
                type: "INFP",
                name: "The Mediator",
                description: "You are imaginative, open-minded, and curious. You value authenticity and enjoy exploring new ideas.",
                strengths: ["Empathetic", "Creative", "Idealistic", "Passionate"],
                careers: ["Writer", "Psychologist", "Artist", "Counselor"]
            } : null
        },
        { 
            id: "riasec", 
            title: "Career Interest (RIASEC)", 
            description: "Identify careers that match your core interests and passions.", 
            icon: <Compass size={24} />, 
            completed: user.completedTests.includes('riasec'), 
            time: "10 min", 
            required: true,
            results: user.completedTests.includes('riasec') ? {
                type: "AIS",
                name: "Artistic, Investigative, Social",
                description: "You enjoy creative expression, problem-solving, and helping others.",
                strengths: ["Creative", "Analytical", "Empathetic", "Curious"],
                careers: ["Graphic Designer", "Psychologist", "Architect", "Teacher"]
            } : null
        },
        { 
            id: "values", 
            title: "Values Assessment", 
            description: "Find out what truly matters to you in a work environment.", 
            icon: <Heart size={24} />, 
            completed: user.completedTests.includes('values'), 
            time: "5 min", 
            required: true,
            results: user.completedTests.includes('values') ? {
                type: "Creativity & Impact",
                name: "Innovator with Purpose",
                description: "You value creative freedom and making a positive impact on the world.",
                strengths: ["Innovative", "Purpose-driven", "Adaptable", "Visionary"],
                careers: ["Social Entrepreneur", "UX Designer", "Environmental Scientist", "Non-profit Director"]
            } : null
        },
        { 
            id: "skills", 
            title: "Skills Inventory", 
            description: "Discover your natural talents and skills you've already developed.", 
            icon: <Target size={24} />, 
            completed: user.completedTests.includes('skills'), 
            time: "15 min", 
            required: true,
            results: user.completedTests.includes('skills') ? {
                type: "Creative & Analytical",
                name: "Creative Problem-Solver",
                description: "You excel at both creative thinking and logical analysis.",
                strengths: ["Design Thinking", "Problem Solving", "Communication", "Adaptability"],
                careers: ["UX/UI Designer", "Marketing Manager", "Software Developer", "Product Manager"]
            } : null
        },
        { 
            id: "ikigai", 
            title: "Ikigai Assessment", 
            description: "Discover your purpose at the intersection of passion, mission, vocation, and profession.", 
            icon: <Brain size={24} />, 
            completed: user.completedTests.includes('ikigai'), 
            time: "20 min", 
            required: false,
            results: user.completedTests.includes('ikigai') ? {
                type: "Creative Guide",
                name: "The Inspirational Creator",
                description: "You find purpose in creating meaningful experiences that help others grow.",
                strengths: ["Visionary", "Empathetic", "Creative", "Inspirational"],
                careers: ["Creative Director", "Life Coach", "Content Creator", "Educator"]
            } : null
        },
    ];

    const navigate = useNavigate();
    
    const handleStartTest = (testId) => {
        navigate(`/quest/${testId}`);
    };

    const handleViewResults = (testId) => {
        navigate(`/quest/${testId}/results`);
    };

    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="quest" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Self-Discovery Quest</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Complete these assessments to unlock personalized career insights.</p>
                        </div>
                        
                        <div className="flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full">
                            <Trophy size={18} className="mr-2" />
                            <span className="font-medium">{user.points} points</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                            <strong>Note:</strong> Complete all required assessments to unlock your personalized career matches and earn bonus points!
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {assessments.map((test, index) => (
                        <motion.div
                            key={test.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col"
                        >
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-xl ${test.completed ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"}`}>{test.icon}</div>
                                {test.completed && (
                                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full flex items-center">
                                        <Check size={12} className="mr-1" /> Completed
                                    </div>
                                )}
                                {test.required && !test.completed && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full flex items-center">
                                        Required
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-4">{test.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 flex-1">{test.description}</p>
                            <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <span>{test.time}</span>
                                {test.required && <span className="text-xs text-indigo-600 dark:text-indigo-400">Required</span>}
                            </div>
                            
                            {test.completed ? (
                                <div className="mt-4">
                                    <div className="flex items-center text-sm text-green-600 dark:text-green-400 mb-2">
                                        <Check size={14} className="mr-1" /> Completed
                                    </div>
                                    <button 
                                        onClick={() => handleViewResults(test.id)}
                                        className="w-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 py-2 rounded-lg font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                                    >
                                        View Results
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    onClick={() => handleStartTest(test.id)}
                                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                                >
                                    Start Assessment
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default QuestPage;
