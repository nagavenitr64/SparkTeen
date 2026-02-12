import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Lightbulb, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function TestResultsPage({ user, theme, setTheme, onLogout }) {
    const { testId } = useParams();
    const navigate = useNavigate();
    
    const testResults = {
        mbti: {
            title: "MBTI Personality Assessment",
            type: "INFP",
            name: "The Mediator",
            description: "You are imaginative, open-minded, and curious. You value authenticity and enjoy exploring new ideas and possibilities. INFPs are often passionate about their values and strive to make the world a better place.",
            strengths: ["Empathetic", "Creative", "Idealistic", "Passionate", "Open-minded"],
            challenges: ["Overly idealistic", "Difficulty with criticism", "Tendency to procrastinate"],
            careers: ["Writer", "Psychologist", "Artist", "Counselor", "Social Worker", "Graphic Designer"],
            famousExamples: ["J.R.R. Tolkien", "William Shakespeare", "Julia Roberts", "John Lennon"],
            tips: [
                "Find work that aligns with your values",
                "Look for environments that allow creative expression",
                "Consider careers that help people or contribute to social good"
            ]
        },
        riasec: {
            title: "RIASEC Career Interest Assessment",
            type: "AIS",
            name: "Artistic, Investigative, Social",
            description: "You enjoy creative expression, problem-solving, and helping others. You likely thrive in environments that allow you to use both your analytical and creative skills while making a positive impact.",
            strengths: ["Creative", "Analytical", "Empathetic", "Curious", "Problem-solving"],
            careers: ["Graphic Designer", "Psychologist", "Architect", "Teacher", "UX Designer", "Social Researcher"],
            workEnvironments: ["Creative studios", "Research facilities", "Educational institutions", "Non-profit organizations"],
            tips: [
                "Look for roles that combine creativity with problem-solving",
                "Consider careers that allow you to help others while using your skills",
                "Find workplaces that value both innovation and social impact"
            ]
        },
        values: {
            title: "Values Assessment",
            type: "Creativity & Impact",
            name: "Innovator with Purpose",
            description: "You value creative freedom and making a positive impact on the world. You seek work that allows you to express yourself while contributing to something larger than yourself.",
            coreValues: ["Creativity", "Purpose", "Autonomy", "Growth", "Impact"],
            careers: ["Social Entrepreneur", "UX Designer", "Environmental Scientist", "Non-profit Director", "Content Creator", "Sustainability Consultant"],
            workEnvironment: "Flexible, mission-driven organizations that value innovation and social responsibility",
            tips: [
                "Prioritize organizations with strong social or environmental missions",
                "Look for roles that offer autonomy and creative freedom",
                "Consider social entrepreneurship or impact-focused careers"
            ]
        },
        skills: {
            title: "Skills Inventory Assessment",
            type: "Creative & Analytical",
            name: "Creative Problem-Solver",
            description: "You excel at both creative thinking and logical analysis. You can generate innovative ideas and also develop practical solutions to implement them.",
            topSkills: ["Design Thinking", "Problem Solving", "Communication", "Adaptability", "Research", "Visual Design"],
            skillAreas: {
                creative: 85,
                analytical: 75,
                social: 70,
                technical: 60
            },
            careers: ["UX/UI Designer", "Marketing Manager", "Software Developer", "Product Manager", "Data Analyst", "Content Strategist"],
            tips: [
                "Look for roles that bridge creative and analytical functions",
                "Develop both your technical and soft skills",
                "Consider careers in technology, marketing, or product development"
            ]
        },
        ikigai: {
            title: "Ikigai Assessment",
            type: "Creative Guide",
            name: "The Inspirational Creator",
            description: "You find purpose in creating meaningful experiences that help others grow. Your ikigai lies at the intersection of your creativity, passion for helping others, and ability to communicate complex ideas simply.",
            elements: {
                passion: "Creating and inspiring",
                mission: "Helping others discover their potential",
                vocation: "Teaching and guiding",
                profession: "Creative direction and communication"
            },
            careers: ["Creative Director", "Life Coach", "Content Creator", "Educator", "Curriculum Developer", "Mentor"],
            tips: [
                "Focus on roles that allow you to both create and teach",
                "Consider building a personal brand around your expertise",
                "Look for opportunities to mentor others in your field"
            ]
        }
    };

    const results = testResults[testId] || testResults.mbti;
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="quest" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-4xl mx-auto w-full">
                    <button onClick={() => navigate("/quest")} className="flex items-center text-indigo-600 dark:text-indigo-400 mb-6">
                        <ArrowLeft size={16} className="mr-1" /> Back to Quest
                    </button>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-2xl mb-4">
                                <Trophy size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{results.title}</h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2">Congratulations on completing the assessment!</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="md:col-span-2">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Your Result: {results.type}</h2>
                                <h3 className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-4">{results.name}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{results.description}</p>
                            </div>
                            <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-xl">
                                <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Key Insights</h4>
                                <ul className="space-y-2">
                                    {results.tips.map((tip, index) => (
                                        <li key={index} className="flex items-start text-sm text-indigo-700 dark:text-indigo-300">
                                            <Lightbulb size={16} className="mr-2 mt-0.5 flex-shrink-0" /> {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Strengths & Characteristics</h3>
                                <div className="flex flex-wrap gap-2">
                                    {results.strengths?.map((strength, index) => (
                                        <span key={index} className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">
                                            {strength}
                                        </span>
                                    ))}
                                    {results.coreValues?.map((value, index) => (
                                        <span key={index} className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm px-3 py-1 rounded-full">
                                            {value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Recommended Career Paths</h3>
                                <ul className="space-y-2">
                                    {results.careers.slice(0, 4).map((career, index) => (
                                        <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                                            <Check size={16} className="mr-2 text-green-500" /> {career}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        
                        {results.skillAreas && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Skill Profile</h3>
                                <div className="space-y-3">
                                    {Object.entries(results.skillAreas).map(([skill, value]) => (
                                        <div key={skill}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{skill}</span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{value}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div 
                                                    className="bg-indigo-600 h-2 rounded-full" 
                                                    style={{ width: `${value}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div className="flex justify-between mt-8">
                            <button 
                                onClick={() => navigate("/discover")}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg font-medium transition-colors"
                            >
                                Explore Careers
                            </button>
                            <button 
                                onClick={() => navigate("/quest")}
                                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                            >
                                Back to Assessments
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default TestResultsPage;
