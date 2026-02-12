import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
    Home, Lightbulb, Book, Compass, Users, Heart, 
    LogOut, Sparkles, X, Menu 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar({ user, theme, setTheme, onLogout }) {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const menuItems = [
        { id: "dashboard", name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
        { id: "quest", name: "Quest", icon: <Lightbulb size={20} />, path: "/quest" },
        { id: "journal", name: "Journal", icon: <Book size={20} />, path: "/journal" },
        { id: "discover", name: "Discover", icon: <Compass size={20} />, path: "/discover" },
        { id: "community", name: "Community", icon: <Users size={20} />, path: "/community" },
        { id: "wellness", name: "Wellness", icon: <Heart size={20} />, path: "/wellness" },
    ];

    const sidebarContent = (
        <>
            <div className="p-4 mb-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-white flex items-center">
                    <Sparkles className="mr-2" /> SparkTeen
                </h1>
                <button onClick={() => setMobileOpen(false)} className="md:hidden text-white">
                    <X size={20} />
                </button>
            </div>
            
            <div className="flex items-center p-3 mb-6 mx-2 rounded-lg bg-indigo-700 dark:bg-gray-700">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-600 mr-3" />
                <div className="flex-1">
                    <p className="font-medium text-white">{user.name}</p>
                    <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                        <p className="text-indigo-200 dark:text-gray-400 text-xs">Level {user.level} Explorer</p>
                    </div>
                </div>
            </div>
            
            <nav className="space-y-1 flex-1 px-2">
                {menuItems.map(item => (
                    <Link 
                        key={item.id} 
                        to={item.path} 
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${location.pathname.startsWith(item.path) ? "bg-white text-indigo-700 shadow-md" : "text-indigo-200 hover:bg-indigo-700"}`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
            
            <div className="p-2 mt-4">
                <div className="mb-4 p-3 rounded-lg bg-indigo-700 dark:bg-gray-700 flex items-center justify-between">
                    <span className="text-white">Dark Mode</span>
                    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-600 transition-colors">
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                
                <button 
                    onClick={onLogout}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg text-indigo-200 hover:bg-indigo-700 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            <div className="md:hidden p-4">
                <button onClick={() => setMobileOpen(true)} className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                    <Menu className="text-gray-600 dark:text-gray-300" />
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-800 to-purple-800 flex flex-col"
                        >
                            {sidebarContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-b from-indigo-800 to-purple-800 text-white min-h-screen">
                {sidebarContent}
            </div>
        </>
    );
}

export default Sidebar;
