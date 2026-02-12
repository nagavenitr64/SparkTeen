import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

function TestPage({ user, setUser, theme, setTheme, onLogout }) {
    const { testId } = useParams();
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    
    // Sample questions for each test
    const tests = {
        mbti: {
            title: "Personality Assessment (MBTI)",
            description: "Discover your personality type",
            questions: [
                "You usually prefer to spend time with others rather than alone.",
                "You often think about theoretical concepts and abstract ideas.",
                "You make decisions based more on logic than on personal values.",
                "You prefer planned activities over spontaneous ones."
            ],
            options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
        },
        riasec: {
            title: "Career Interest (RIASEC)",
            description: "Identify careers that match your interests",
            questions: [
                "I enjoy working with tools and machinery.",
                "I like analyzing data and solving complex problems.",
                "I am creative and enjoy artistic activities.",
                "I enjoy helping and teaching others."
            ],
            options: ["Not at all like me", "Not like me", "Neutral", "Like me", "Very much like me"]
        },
        values: {
            title: "Values Assessment",
            description: "Find out what matters to you",
            questions: [
                "Having a high income is important to me.",
                "I value work-life balance more than career advancement.",
                "Making a positive impact on society is crucial to me.",
                "Job security is more important than taking risks."
            ],
            options: ["Not important", "Slightly important", "Moderately important", "Very important", "Extremely important"]
        },
        skills: {
            title: "Skills Inventory",
            description: "Discover your natural talents",
            questions: [
                "I am good at solving complex problems.",
                "I can easily express my ideas in writing.",
                "I am skilled at working with my hands.",
                "I can lead a group effectively."
            ],
            options: ["Beginner", "Basic", "Intermediate", "Advanced", "Expert"]
        },
        ikigai: {
            title: "Ikigai Assessment",
            description: "Discover your purpose at the intersection of passion, mission, vocation, and profession",
            questions: [
                "What activities make you lose track of time?",
                "What problems in the world do you feel drawn to solve?",
                "What skills do you have that people would pay for?",
                "What needs in the world align with your skills and passions?"
            ],
            options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
        }
    };
    
    const test = tests[testId] || tests.mbti;
    
    const handleAnswer = (answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);
        
        if (currentQuestion < test.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Test completed
            if (!user.completedTests.includes(testId)) {
                const newUser = {
                    ...user,
                    completedTests: [...user.completedTests, testId],
                    points: user.points + 200
                };
                setUser(newUser);
            }
            
            // Navigate to results page
            navigate(`/quest/${testId}/results`);
        }
    };
    
    const progress = ((currentQuestion + 1) / test.questions.length) * 100;
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="quest" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-3xl mx-auto w-full bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
                    <button onClick={() => navigate("/quest")} className="flex items-center text-indigo-600 dark:text-indigo-400 mb-6">
                        <ArrowLeft size={16} className="mr-1" /> Back to Quest
                    </button>
                    
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{test.title}</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{test.description}</p>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-6">
                        <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Question {currentQuestion + 1} of {test.questions.length}
                    </p>
                    
                    <div className="mt-8">
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                            {test.questions[currentQuestion]}
                        </h2>
                        
                        <div className="space-y-3 mt-6">
                            {test.options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TestPage;
