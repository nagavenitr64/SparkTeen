import { useNavigate } from "react-router-dom";
import { ArrowLeft, CameraIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function ARCareerExplorer({ user, theme, setTheme, onLogout }) {
    const navigate = useNavigate();
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="wellness" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto w-full">
                    <button onClick={() => navigate("/wellness")} className="flex items-center text-indigo-600 dark:text-indigo-400 mb-6">
                        <ArrowLeft size={16} className="mr-1" /> Back to Wellness
                    </button>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-2xl mb-4">
                            <CameraIcon size={32} />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">AR Career Explorer</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">Visualize yourself in different careers using augmented reality</p>
                        
                        <div className="mt-8 bg-gray-100 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                            <p className="text-gray-500 dark:text-gray-400">AR camera view would appear here</p>
                        </div>
                        
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100" alt="UX Designer" className="w-full h-16 object-cover rounded mb-2" />
                                <p className="text-sm font-medium text-gray-800 dark:text-white">UX Designer</p>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100" alt="Software Developer" className="w-full h-16 object-cover rounded mb-2" />
                                <p className="text-sm font-medium text-gray-800 dark:text-white">Software Developer</p>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=100" alt="Graphic Designer" className="w-full h-16 object-cover rounded mb-2" />
                                <p className="text-sm font-medium text-gray-800 dark:text-white">Graphic Designer</p>
                            </div>
                            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=100" alt="Teacher" className="w-full h-16 object-cover rounded mb-2" />
                                <p className="text-sm font-medium text-gray-800 dark:text-white">Teacher</p>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-3">How it works:</h3>
                            <ol className="text-left list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                                <li>Allow camera access when prompted</li>
                                <li>Select a career to visualize</li>
                                <li>Point your camera at a flat surface</li>
                                <li>See yourself in that career through AR</li>
                                <li>Take photos to save for later</li>
                            </ol>
                        </div>
                        
                        <button className="w-full mt-8 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                            Start AR Experience
                        </button>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default ARCareerExplorer;
