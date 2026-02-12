wellnessChatbot.js


import React, { useState } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

function WellnessChatbot({ onClose }) {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm Spark, your wellness companion. I'm here to help you navigate setbacks and challenges. What's on your mind?", sender: "bot" }
    ]);
    const [inputText, setInputText] = useState("");

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        
        // Add user message
        const userMessage = { id: messages.length + 1, text: inputText, sender: "user" };
        setMessages([...messages, userMessage]);
        setInputText("");
        
        // Simulate bot response after a short delay
        setTimeout(() => {
            const responses = [
                "It's completely normal to feel that way. Many successful people faced similar challenges.",
                "Remember that failure is just a stepping stone to success. What did you learn from this experience?",
                "It sounds like you're going through a tough time. Would you like to try a quick breathing exercise?",
                "I'm here to listen. Sometimes just talking about our struggles can make them feel more manageable.",
                "What's one small step you could take right now to move forward?",
                "It's okay to not have everything figured out. Growth happens gradually, not all at once.",
                "Many famous people faced rejection before finding success. J.K. Rowling was rejected by 12 publishers!",
                "Let's focus on what you can control right now. What's one positive action you could take?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            const botMessage = { id: messages.length + 2, text: randomResponse, sender: "bot" };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col border border-gray-200 dark:border-gray-700"
        >
            <div className="p-4 bg-indigo-600 text-white rounded-t-2xl flex justify-between items-center">
                <h3 className="font-semibold">Wellness Companion</h3>
                <button onClick={onClose} className="text-white">
                    <X size={18} />
                </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map(message => (
                    <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}>
                        <div className={`inline-block p-3 rounded-2xl max-w-xs ${message.sender === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-l-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="bg-indigo-600 text-white p-2 rounded-r-lg"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default WellnessChatbot;
