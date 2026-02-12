careerdetailpage.js


import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Video, Book, Bookmark, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function CareerDetailPage({ user, theme, setTheme, onLogout }) {
    const { careerId } = useParams();
    const navigate = useNavigate();
    
    const careerData = {
        1: {
            title: "UX Designer",
            category: "Technology",
            description: "UX Designers create meaningful and enjoyable experiences for users of digital products. They focus on understanding user needs, designing intuitive interfaces, and improving the overall user experience.",
            salary: "$75,000 - $110,000",
            growth: "15% (Much faster than average)",
            education: "Bachelor's degree in Design, Computer Science, or related field",
            skills: ["User Research", "Wireframing", "Prototyping", "UI Design", "Usability Testing", "Communication"],
            dayInLife: [
                "Conduct user research and interviews",
                "Create wireframes and prototypes",
                "Collaborate with developers and product managers",
                "Test designs with real users",
                "Iterate based on feedback"
            ],
            companies: ["Google", "Apple", "Facebook", "Adobe", "Netflix", "Startups"],
            resources: [
                { type: "Video", title: "Day in the Life of a UX Designer", link: "#" },
                { type: "Course", title: "Introduction to UX Design", link: "#" },
                { type: "Article", title: "How to Build a UX Portfolio", link: "#" }
            ]
        },
        2: {
            title: "Content Creator",
            category: "Design & Creative",
            description: "Content Creators develop engaging content across various platforms like YouTube, Instagram, TikTok, and blogs. They combine creativity with strategy to build audiences and create meaningful connections.",
            salary: "$45,000 - $85,000",
            growth: "12% (Faster than average)",
            education: "Varied paths - many are self-taught or learn through online courses",
            skills: ["Content Strategy", "Video Production", "Writing", "SEO", "Social Media", "Storytelling"],
            dayInLife: [
                "Brainstorm content ideas",
                "Film and edit videos",
                "Engage with audience on social media",
                "Analyze performance metrics",
                "Collaborate with brands or other creators"
            ],
            companies: ["Self-employed", "Media Companies", "Brands as in-house creators"],
            resources: [
                { type: "Video", title: "How to Start a YouTube Channel", link: "#" },
                { type: "Course", title: "Content Creation Masterclass", link: "#" },
                { type: "Article", title: "Monetizing Your Content", link: "#" }
            ]
        },
        3: {
            title: "Career Counselor",
            category: "Education",
            description: "Career Counselors help individuals understand their skills, interests, and values to make informed career decisions. They provide guidance, resources, and support throughout the career exploration process.",
            salary: "$50,000 - $70,000",
            growth: "8% (As fast as average)",
            education: "Master's degree in Counseling or related field typically required",
            skills: ["Active Listening", "Assessment Interpretation", "Career Coaching", "Resource Knowledge", "Empathy"],
            dayInLife: [
                "Conduct career assessments",
                "Provide one-on-one counseling sessions",
                "Develop career development workshops",
                "Stay updated on job market trends",
                "Connect clients with resources and opportunities"
            ],
            companies: ["Schools", "Universities", "Career Centers", "Private Practice"],
            resources: [
                { type: "Video", title: "What Does a Career Counselor Do?", link: "#" },
                { type: "Course", title: "Introduction to Career Development", link: "#" },
                { type: "Article", title: "Getting Certified as a Career Counselor", link: "#" }
            ]
        },
        4: {
            title: "Graphic Designer",
            category: "Design & Creative",
            description: "Graphic Designers create visual concepts to communicate ideas that inspire, inform, and captivate consumers. They develop the overall layout and production design for various applications.",
            salary: "$45,000 - $75,000",
            growth: "5% (Slower than average)",
            education: "Bachelor's degree in Graphic Design or related field",
            skills: ["Adobe Creative Suite", "Typography", "Layout Design", "Branding", "Color Theory", "Communication"],
            dayInLife: [
                "Meet with clients to understand needs",
                "Create design concepts and mockups",
                "Select colors, images, and typefaces",
                "Present designs to clients for feedback",
                "Prepare final designs for print or digital publication"
            ],
            companies: ["Design Agencies", "In-house design teams", "Freelance", "Publishing houses"],
            resources: [
                { type: "Video", title: "Graphic Design Portfolio Review", link: "#" },
                { type: "Course", title: "Advanced Photoshop Techniques", link: "#" },
                { type: "Article", title: "Building a Career in Graphic Design", link: "#" }
            ]
        }
    };
    
    const career = careerData[careerId] || careerData[1];
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="discover" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto w-full">
                    <button onClick={() => navigate("/discover")} className="flex items-center text-indigo-600 dark:text-indigo-400 mb-6">
                        <ArrowLeft size={16} className="mr-1" /> Back to Discover
                    </button>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden"
                    >
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{career.title}</h1>
                                    <p className="text-indigo-600 dark:text-indigo-400 mt-1">{career.category}</p>
                                </div>
                                <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                                    92% match
                                </div>
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 mt-4">{career.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Salary Range</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{career.salary}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Job Growth</h3>
                                    <p className="text-green-600 dark:text-green-400">{career.growth}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Education Required</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{career.education}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Top Companies</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{career.companies.join(", ")}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 p-6 md:p-8">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Key Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {career.skills.map((skill, index) => (
                                    <span key={index} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 p-6 md:p-8">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">A Day in the Life</h2>
                            <ul className="space-y-2">
                                {career.dayInLife.map((item, index) => (
                                    <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
                                        <Check size={16} className="mr-2 mt-1 text-green-500 flex-shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="border-t border-gray-200 dark:border-gray-700 p-6 md:p-8">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Learning Resources</h2>
                            <div className="space-y-3">
                                {career.resources.map((resource, index) => (
                                    <div key={index} className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className={`p-2 rounded mr-3 ${resource.type === "Video" ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300" : resource.type === "Course" ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" : "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"}`}>
                                            {resource.type === "Video" ? <Video size={16} /> : resource.type === "Course" ? <Book size={16} /> : <Bookmark size={16} />}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800 dark:text-white">{resource.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{resource.type}</p>
                                        </div>
                                        <button className="ml-auto text-indigo-600 dark:text-indigo-400 text-sm font-medium">View</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    
                    <div className="mt-6 flex justify-between">
                        <button 
                            onClick={() => navigate("/quest")}
                            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            Take Assessment
                        </button>
                        <button 
                            onClick={() => navigate("/community")}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                        >
                            Connect with Professionals
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CareerDetailPage;
