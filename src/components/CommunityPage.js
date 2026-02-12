import React from "react";
import { 
    Users, MessageCircle, Calendar, Sparkles, 
    Check, Book, Video, Bookmark 
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function CommunityPage({ user, notifications, theme, setTheme, onLogout }) {
    const groups = [
        { id: 1, name: "Future Designers", members: 243, icon: <Sparkles size={20} />, description: "For aspiring UX/UI and graphic designers" },
        { id: 2, name: "Tech Career Seekers", members: 187, icon: <Book size={20} />, description: "Exploring careers in technology" },
        { id: 3, name: "Creative Content Crew", members: 156, icon: <Video size={20} />, description: "Content creators and social media enthusiasts" },
        { id: 4, name: "Career Change Support", members: 204, icon: <Bookmark size={20} />, description: "Support for those navigating career transitions" }
    ];
    
    const discussions = [
        { id: 1, group: "Future Designers", title: "Portfolio feedback needed!", author: "Jamie L.", comments: 12, time: "2 hours ago" },
        { id: 2, group: "Tech Career Seekers", title: "Best programming language to learn in 2023?", author: "Marcus T.", comments: 27, time: "5 hours ago" },
        { id: 3, group: "Creative Content Crew", title: "How do you deal with creative block?", author: "Sofia R.", comments: 8, time: "1 day ago" },
        { id: 4, group: "Career Change Support", title: "From accounting to UX design - my journey", author: "Alex K.", comments: 15, time: "2 days ago" }
    ];
    
    const mentors = [
        { id: 1, name: "Sarah Chen", role: "Senior UX Designer", company: "Google", expertise: ["UX Design", "Product Strategy"], available: true },
        { id: 2, name: "Michael Torres", role: "Content Director", company: "Netflix", expertise: ["Content Strategy", "Video Production"], available: true },
        { id: 3, name: "Jessica Williams", role: "Career Coach", company: "Self-employed", expertise: ["Career Transition", "Interview Prep"], available: false },
        { id: 4, name: "David Kim", role: "Software Engineer", company: "Microsoft", expertise: ["Web Development", "Python"], available: true }
    ];
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="community" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Community</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">Connect with others on similar career journeys</p>
                        </div>
                        
                        <div className="flex items-center bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-full">
                            <Users size={18} className="mr-2" />
                            <span className="font-medium">1,243 members</span>
                        </div>
                    </div>
                </motion.div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Discussions</h2>
                        
                        <div className="space-y-4">
                            {discussions.map(discussion => (
                                <div key={discussion.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900 px-2 py-1 rounded-full">{discussion.group}</span>
                                            <h3 className="font-medium text-gray-800 dark:text-white mt-2">{discussion.title}</h3>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <MessageCircle size={14} className="mr-1" /> {discussion.comments}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-3">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">by {discussion.author}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{discussion.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="w-full mt-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg font-medium transition-colors">
                            View All Discussions
                        </button>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Groups You Might Like</h2>
                        
                        <div className="space-y-4">
                            {groups.map(group => (
                                <div key={group.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-lg flex items-center justify-center mr-3">
                                            {group.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800 dark:text-white">{group.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{group.description}</p>
                                            <div className="flex items-center mt-2">
                                                <Users size={12} className="text-gray-400 mr-1" />
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{group.members} members</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-4 rounded-lg text-sm font-medium transition-colors">
                                        Join Group
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Career Mentors</h2>
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">View all mentors</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mentors.map(mentor => (
                            <div key={mentor.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="flex items-start">
                                    <img 
                                        src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * 100)}?w=100`} 
                                        alt={mentor.name}
                                        className="w-12 h-12 rounded-full object-cover mr-3"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-gray-800 dark:text-white">{mentor.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.role} • {mentor.company}</p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full ${mentor.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                                {mentor.available ? 'Available' : 'Busy'}
                                            </span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {mentor.expertise.map((skill, index) => (
                                                <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        
                                        <button className={`w-full mt-3 ${mentor.available ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'} text-white py-1 px-4 rounded-lg text-sm font-medium transition-colors`}>
                                            {mentor.available ? 'Request Session' : 'Not Available'}
                                        </button>
                                    </div>
                                </div>
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
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Community Events</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-lg flex items-center justify-center mr-3">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-white">UX Design Workshop</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">October 30, 2023 • 4:00 PM EST</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Learn the fundamentals of UX design with industry experts. Perfect for beginners!</p>
                            <button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-lg text-sm font-medium transition-colors">
                                RSVP Now
                            </button>
                        </div>
                        
                        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex items-center mb-3">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg flex items-center justify-center mr-3">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800 dark:text-white">Career Q&A Session</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">November 5, 2023 • 6:00 PM EST</p>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Get your career questions answered by professionals from various industries.</p>
                            <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-lg text-sm font-medium transition-colors">
                                RSVP Now
                            </button>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}

export default CommunityPage;
