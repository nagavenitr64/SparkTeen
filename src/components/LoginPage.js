loginPage.js

import React from "react";
import { LogIn, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function LoginPage({ onLogin, theme, setTheme }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center">
                        <Sparkles className="mr-2 text-indigo-600" /> SparkTeen
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">Discover your path, embrace your future</p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input 
                            type="email" 
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your email"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                        <input 
                            type="password" 
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your password"
                        />
                    </div>
                    
                    <button 
                        onClick={onLogin}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
                    >
                        <LogIn size={18} className="mr-2" /> Sign In
                    </button>
                    
                    <div className="text-center">
                        <button className="text-indigo-600 dark:text-indigo-400 text-sm">
                            Create a new account
                        </button>
                    </div>
                </div>
                
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
                    <div className="flex items-center">
                        <span className="text-gray-600 dark:text-gray-300 mr-2">Dark Mode</span>
                        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors">
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default LoginPage;
