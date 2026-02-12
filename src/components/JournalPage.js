// JournalPage.js - ENHANCED VERSION WITH SENTIMENT ANALYSIS
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Book, Smile, Lightbulb, Brain, Sparkles, TrendingUp, 
    BarChart3, Filter, Activity, Heart, Calendar,
    Plus, Search, Edit3, Trash2, Download, Share2,
    MessageCircle, Target, Zap, Clock, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

// Enhanced ML Sentiment Analyzer
class AdvancedSentimentAnalyzer {
    constructor() {
        this.positiveWords = new Set([
            'happy', 'joy', 'love', 'excited', 'great', 'good', 'amazing', 'wonderful', 
            'fantastic', 'excellent', 'positive', 'awesome', 'brilliant', 'fabulous',
            'perfect', 'outstanding', 'superb', 'terrific', 'marvelous', 'delighted',
            'pleased', 'content', 'satisfied', 'thrilled', 'ecstatic', 'blissful',
            'cheerful', 'jubilant', 'elated', 'grateful', 'thankful', 'blessed',
            'optimistic', 'hopeful', 'confident', 'proud', 'accomplished', 'successful',
            'achieved', 'progress', 'improved', 'better', 'best', 'win', 'victory',
            'peace', 'calm', 'relaxed', 'serene', 'tranquil', 'comfortable', 'proud',
            'motivated', 'inspired', 'energized', 'refreshed', 'renewed', 'hopeful'
        ]);
        
        this.negativeWords = new Set([
            'sad', 'unhappy', 'angry', 'mad', 'frustrated', 'annoyed', 'irritated',
            'disappointed', 'depressed', 'miserable', 'terrible', 'awful', 'horrible',
            'bad', 'worse', 'worst', 'hate', 'dislike', 'detest', 'despise',
            'anxious', 'nervous', 'worried', 'stressed', 'overwhelmed', 'burned out',
            'tired', 'exhausted', 'fatigued', 'drained', 'weary', 'sleepy',
            'pain', 'hurt', 'suffering', 'agony', 'distress', 'anguish',
            'fear', 'scared', 'afraid', 'terrified', 'frightened', 'panicked',
            'lonely', 'alone', 'isolated', 'abandoned', 'rejected', 'excluded',
            'failure', 'failed', 'mistake', 'error', 'wrong', 'incorrect',
            'stupid', 'dumb', 'idiot', 'foolish', 'silly', 'ridiculous', 'hopeless'
        ]);
        
        this.intensifiers = {
            'very': 1.3, 'extremely': 1.5, 'really': 1.2, 'so': 1.2, 'too': 1.1,
            'quite': 1.1, 'pretty': 1.1, 'fairly': 1.05, 'somewhat': 0.9,
            'slightly': 0.8, 'a bit': 0.8, 'a little': 0.8, 'not': -1,
            'never': -1.2, 'always': 1.1, 'constantly': 1.1
        };

        this.emotionPatterns = {
            joy: ['happy', 'joy', 'excited', 'thrilled', 'delighted', 'ecstatic'],
            gratitude: ['grateful', 'thankful', 'appreciate', 'blessed', 'fortunate'],
            anxiety: ['anxious', 'nervous', 'worried', 'stressed', 'overwhelmed'],
            sadness: ['sad', 'depressed', 'miserable', 'heartbroken', 'down'],
            anger: ['angry', 'mad', 'frustrated', 'irritated', 'annoyed'],
            fear: ['scared', 'afraid', 'terrified', 'frightened', 'panicked'],
            contentment: ['content', 'satisfied', 'peaceful', 'calm', 'relaxed']
        };
    }

    analyze(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        let positiveScore = 0;
        let negativeScore = 0;
        let intensity = 1;
        let emotions = new Set();
        
        // Advanced analysis with context awareness
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const prevWord = words[i - 1];
            const nextWord = words[i + 1];
            
            // Check for intensifiers and negations
            if (this.intensifiers[word]) {
                intensity *= this.intensifiers[word];
                continue;
            }
            
            // Check for emotion patterns
            Object.entries(this.emotionPatterns).forEach(([emotion, patterns]) => {
                if (patterns.includes(word)) {
                    emotions.add(emotion);
                }
            });
            
            // Enhanced positive/negative scoring with context
            if (this.positiveWords.has(word)) {
                // Check for negations
                if (prevWord === 'not' || prevWord === 'never') {
                    negativeScore += intensity * 0.7;
                } else {
                    positiveScore += intensity;
                }
                intensity = 1;
            }
            
            if (this.negativeWords.has(word)) {
                // Check for negations
                if (prevWord === 'not' || prevWord === 'never') {
                    positiveScore += intensity * 0.5;
                } else {
                    negativeScore += intensity;
                }
                intensity = 1;
            }
        }
        
        // Calculate advanced metrics
        const totalScore = positiveScore + negativeScore;
        let sentiment, confidence, moodScore;
        
        if (totalScore === 0) {
            sentiment = 'neutral';
            confidence = 0.5;
            moodScore = 0.5;
        } else {
            const ratio = positiveScore / totalScore;
            if (ratio > 0.7) {
                sentiment = 'very positive';
                confidence = Math.min(0.95, ratio);
                moodScore = 0.7 + (ratio * 0.3);
            } else if (ratio > 0.6) {
                sentiment = 'positive';
                confidence = Math.min(0.9, ratio);
                moodScore = 0.5 + (ratio * 0.4);
            } else if (ratio > 0.4) {
                sentiment = 'neutral';
                confidence = 0.7;
                moodScore = 0.4 + (ratio * 0.3);
            } else if (ratio > 0.3) {
                sentiment = 'negative';
                confidence = Math.min(0.8, 1 - ratio);
                moodScore = ratio * 0.6;
            } else {
                sentiment = 'very negative';
                confidence = Math.min(0.9, 1 - ratio);
                moodScore = ratio * 0.4;
            }
        }
        
        // Extract topics and keywords
        const topics = this.extractTopics(text);
        const keywords = this.extractKeywords(text, Array.from(emotions));
        
        return {
            sentiment,
            confidence: Math.round(confidence * 100) / 100,
            moodScore: Math.round(moodScore * 100) / 100,
            positiveScore,
            negativeScore,
            emotions: Array.from(emotions),
            topics,
            keywords,
            wordCount: words.length,
            analysisTime: new Date().toISOString()
        };
    }
    
    extractTopics(text) {
        const topics = [];
        const lowerText = text.toLowerCase();
        
        const topicPatterns = {
            'career': /\b(job|work|career|profession|occupation|employment|boss|colleague|office|meeting|project|deadline|promotion|salary|interview)\b/,
            'learning': /\b(learn|study|education|knowledge|course|skill|training|lesson|school|college|university|homework|assignment|exam)\b/,
            'design': /\b(design|creative|art|ux|ui|graphic|visual|layout|typography|color|illustration|sketch|prototype|portfolio)\b/,
            'technology': /\b(tech|technology|code|programming|software|digital|computer|app|application|website|web|mobile|ai|ml|data)\b/,
            'goals': /\b(goal|future|plan|aspiration|dream|ambition|target|objective|purpose|mission|vision|achievement|success)\b/,
            'relationships': /\b(friend|family|relationship|social|connection|love|partner|parent|child|sibling|community|network|dating)\b/,
            'health': /\b(health|exercise|fitness|wellness|mental|physical|therapy|doctor|hospital|medicine|treatment|recovery|diet)\b/,
            'finance': /\b(money|finance|financial|budget|save|spend|investment|debt|loan|income|salary|wealth|rich|poor|payment)\b/,
            'hobbies': /\b(hobby|interest|game|sport|music|movie|book|travel|food|cooking|photography|gardening|craft)\b/,
            'personal growth': /\b(grow|development|improve|progress|change|transform|evolve|mature|learn|reflect|meditate|mindfulness)\b/
        };
        
        Object.entries(topicPatterns).forEach(([topic, pattern]) => {
            if (pattern.test(lowerText)) {
                topics.push(topic);
            }
        });
        
        return topics.length > 0 ? topics : ['personal reflection'];
    }
    
    extractKeywords(text, emotions) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'was', 'were']);
        
        // Get unique words that are meaningful
        const meaningfulWords = words
            .filter(word => word.length > 3 && !stopWords.has(word))
            .slice(0, 10);
        
        // Add emotions as keywords
        return [...new Set([...meaningfulWords, ...emotions])].slice(0, 8);
    }
}

const sentimentAnalyzer = new AdvancedSentimentAnalyzer();

function JournalPage({ user, theme, setTheme, onLogout }) {
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState("");
    const [currentMood, setCurrentMood] = useState("happy");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false); // Set to false since no initial entries
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [viewMode, setViewMode] = useState("grid");

    // Enhanced mood icons with more options
    const moodIcons = {
        happy: { icon: "😊", label: "Happy", color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900", gradient: "from-yellow-400 to-orange-400" },
        sad: { icon: "😢", label: "Sad", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900", gradient: "from-blue-400 to-indigo-400" },
        excited: { icon: "🎉", label: "Excited", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900", gradient: "from-orange-400 to-red-400" },
        inspired: { icon: "💡", label: "Inspired", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900", gradient: "from-purple-400 to-pink-400" },
        thoughtful: { icon: "🤔", label: "Thoughtful", color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900", gradient: "from-indigo-400 to-blue-400" },
        tired: { icon: "😴", label: "Tired", color: "text-gray-500", bg: "bg-gray-100 dark:bg-gray-900", gradient: "from-gray-400 to-gray-600" },
        grateful: { icon: "🙏", label: "Grateful", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900", gradient: "from-green-400 to-emerald-400" },
        motivated: { icon: "💪", label: "Motivated", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900", gradient: "from-red-400 to-pink-400" },
        anxious: { icon: "😰", label: "Anxious", color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900", gradient: "from-amber-400 to-orange-400" },
        peaceful: { icon: "😌", label: "Peaceful", color: "text-teal-500", bg: "bg-teal-100 dark:bg-teal-900", gradient: "from-teal-400 to-cyan-400" }
    };

    // Load entries - starts with empty array
    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        try {
            // Load only from localStorage, no initial entries
            const savedEntries = localStorage.getItem('sparkJournalEntries');
            const localEntries = savedEntries ? JSON.parse(savedEntries) : [];
            
            setEntries(localEntries);
            calculateStats(localEntries);
        } catch (error) {
            console.error('Failed to load entries:', error);
            calculateStats([]);
        }
    };

    const calculateStats = (entries) => {
        if (entries.length === 0) {
            setStats(null);
            return;
        }

        const totalEntries = entries.length;
        const last7Days = entries.filter(entry => {
            const entryDate = new Date(entry.timestamp || entry.date);
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            return entryDate >= weekAgo;
        });

        // Enhanced sentiment analysis
        const sentimentCounts = {
            'very positive': 0,
            'positive': 0,
            'neutral': 0,
            'negative': 0,
            'very negative': 0
        };

        let totalMoodScore = 0;
        const topicFrequency = {};
        const emotionFrequency = {};
        const moodFrequency = {};

        entries.forEach(entry => {
            // Count sentiments
            const sentiment = entry.analysis?.sentiment || 'neutral';
            sentimentCounts[sentiment] = (sentimentCounts[sentiment] || 0) + 1;
            
            // Accumulate mood scores
            totalMoodScore += entry.analysis?.moodScore || 0.5;
            
            // Count topics
            (entry.analysis?.topics || []).forEach(topic => {
                topicFrequency[topic] = (topicFrequency[topic] || 0) + 1;
            });
            
            // Count emotions
            (entry.analysis?.emotions || []).forEach(emotion => {
                emotionFrequency[emotion] = (emotionFrequency[emotion] || 0) + 1;
            });
            
            // Count moods
            moodFrequency[entry.mood] = (moodFrequency[entry.mood] || 0) + 1;
        });

        const positivityRate = ((sentimentCounts['very positive'] + sentimentCounts['positive']) / totalEntries) * 100;
        const averageMood = totalMoodScore / totalEntries;

        // Calculate writing consistency
        const entriesByDate = {};
        entries.forEach(entry => {
            const date = new Date(entry.timestamp || entry.date).toDateString();
            entriesByDate[date] = (entriesByDate[date] || 0) + 1;
        });
        const consistency = Object.keys(entriesByDate).length / Math.max(1, totalEntries / 7);

        setStats({
            totalEntries,
            entriesLast7Days: last7Days.length,
            positivityRate,
            averageMood,
            sentimentDistribution: sentimentCounts,
            topTopics: Object.entries(topicFrequency)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([topic]) => topic),
            topEmotions: Object.entries(emotionFrequency)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([emotion]) => emotion),
            mostFrequentMood: Object.entries(moodFrequency).sort(([,a], [,b]) => b - a)[0]?.[0] || 'happy',
            writingConsistency: Math.min(100, consistency * 100),
            averageEntryLength: entries.reduce((sum, entry) => sum + (entry.content?.length || 0), 0) / totalEntries
        });
    };

    const handleAnalyze = async () => {
        if (!newEntry.trim()) return;
        
        setIsAnalyzing(true);
        try {
            const analysisResult = await sentimentAnalyzer.analyze(newEntry);
            setAnalysis(analysisResult);
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleAddEntry = async () => {
        if (!newEntry.trim()) return;
        
        let entryAnalysis = analysis;
        if (!entryAnalysis) {
            setIsAnalyzing(true);
            try {
                entryAnalysis = await sentimentAnalyzer.analyze(newEntry);
            } catch (error) {
                console.error("Analysis failed:", error);
            } finally {
                setIsAnalyzing(false);
            }
        }
        
        const newEntryObj = {
            id: `journal-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            content: newEntry,
            mood: currentMood,
            analysis: entryAnalysis,
            source: 'journal',
            timestamp: new Date().toISOString(),
            title: generateTitle(newEntry),
            wordCount: newEntry.split(/\s+/).length
        };
        
        // Update local state
        const updatedEntries = [newEntryObj, ...entries];
        setEntries(updatedEntries);
        calculateStats(updatedEntries);
        
        // Save to localStorage
        localStorage.setItem('sparkJournalEntries', JSON.stringify(updatedEntries));
        
        // Reset form
        setNewEntry("");
        setAnalysis(null);
        setCurrentMood("happy");
    };

    const generateTitle = (content) => {
        const sentences = content.split(/[.!?]+/);
        const firstSentence = sentences[0].trim();
        return firstSentence.length > 50 ? firstSentence.substring(0, 50) + '...' : firstSentence;
    };

    const deleteEntry = (entryId) => {
        const updatedEntries = entries.filter(entry => entry.id !== entryId);
        setEntries(updatedEntries);
        localStorage.setItem('sparkJournalEntries', JSON.stringify(updatedEntries));
        calculateStats(updatedEntries);
        setSelectedEntry(null);
    };

    const filteredEntries = entries.filter(entry => {
        const matchesFilter = filter === "all" || entry.analysis?.topics?.includes(filter);
        const matchesSearch = searchQuery === "" || 
            entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (entry.analysis?.topics || []).some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
        
        return matchesFilter && matchesSearch;
    });

    const getSentimentColor = (sentiment) => {
        switch(sentiment) {
            case 'very positive': return 'text-green-600 dark:text-green-400';
            case 'positive': return 'text-blue-600 dark:text-blue-400';
            case 'neutral': return 'text-yellow-600 dark:text-yellow-400';
            case 'negative': return 'text-orange-600 dark:text-orange-400';
            case 'very negative': return 'text-red-600 dark:text-red-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    const getMoodLevel = (score) => {
        if (score >= 0.8) return { label: "Excellent", color: "text-green-600", bg: "bg-green-100 dark:bg-green-900" };
        if (score >= 0.6) return { label: "Good", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900" };
        if (score >= 0.4) return { label: "Okay", color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-900" };
        if (score >= 0.2) return { label: "Low", color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900" };
        return { label: "Very Low", color: "text-red-600", bg: "bg-red-100 dark:bg-red-900" };
    };

    const exportData = () => {
        const data = {
            entries: entries,
            stats: stats,
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `journal-export-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Fixed function to navigate to sentiment analysis
    const navigateToSentimentAnalysis = () => {
        navigate("/sentiment-analysis");
    };

    return (
        <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-purple-900/20">
            <Sidebar currentPage="journal" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            
            <main className="flex-1 p-4 md:p-8">
                {/* Enhanced Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                                    <Book className="text-white" size={24} />
                                </div>
                                Reflection Journal
                            </h1>
                            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                                Document your journey with AI-powered insights and sentiment analysis
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            <button 
                                onClick={navigateToSentimentAnalysis}
                                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center gap-2 text-sm font-medium shadow-lg hover:shadow-xl"
                            >
                                <Brain size={18} />
                                View Analysis
                            </button>
                            <button 
                                onClick={exportData}
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-2xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-750 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
                            >
                                <Download size={16} />
                                Export
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Enhanced Stats Overview - Only show if there are entries */}
                {stats && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
                    >
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalEntries}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Entries</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.entriesLast7Days}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">This Week</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.positivityRate.toFixed(0)}%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Positivity</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className={`text-2xl font-bold ${getMoodLevel(stats.averageMood).color}`}>
                                {getMoodLevel(stats.averageMood).label}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Mood</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.writingConsistency.toFixed(0)}%</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Consistency</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 capitalize">
                                {stats.mostFrequentMood}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Common Mood</div>
                        </div>
                    </motion.div>
                )}

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* New Entry Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="xl:col-span-3 space-y-6"
                    >
                        {/* Writing Area */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                    <Edit3 size={24} className="text-purple-500" />
                                    New Journal Entry
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock size={16} />
                                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                            
                            {/* Mood Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                                    How are you feeling right now?
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {Object.entries(moodIcons).map(([mood, data]) => (
                                        <motion.button
                                            key={mood}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setCurrentMood(mood)}
                                            className={`flex flex-col items-center p-4 rounded-2xl transition-all border-2 min-w-20 ${
                                                currentMood === mood 
                                                    ? `${data.bg} border-purple-500 shadow-lg scale-105` 
                                                    : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                                            }`}
                                        >
                                            <span className="text-3xl mb-2">{data.icon}</span>
                                            <span className={`text-xs font-medium capitalize ${
                                                currentMood === mood ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {data.label}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Text Area */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        What's on your mind today?
                                    </label>
                                    <span className="text-xs text-gray-500">
                                        {newEntry.length} characters • {newEntry.split(/\s+/).filter(word => word.length > 0).length} words
                                    </span>
                                </div>
                                <textarea
                                    value={newEntry}
                                    onChange={(e) => setNewEntry(e.target.value)}
                                    placeholder="Write about your day, thoughts, feelings, achievements, challenges, or anything that's on your mind. The more you write, the better insights you'll get! ✨"
                                    className="w-full h-48 p-5 border border-gray-300 dark:border-gray-600 rounded-2xl dark:bg-gray-700 dark:text-white resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg leading-relaxed transition-all"
                                />
                            </div>
                            
                            {/* Analysis Preview */}
                            {analysis && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
                                >
                                    <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2 text-lg">
                                        <Brain size={20} /> AI Insights Preview
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-blue-600 dark:text-blue-400">Sentiment:</span>
                                                <span className={getSentimentColor(analysis.sentiment) + " font-semibold"}>
                                                    {analysis.sentiment}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-blue-600 dark:text-blue-400">Confidence:</span>
                                                <span className="font-semibold">{(analysis.confidence * 100).toFixed(0)}%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-blue-600 dark:text-blue-400">Mood Score:</span>
                                                <span className={getMoodLevel(analysis.moodScore).color + " font-semibold"}>
                                                    {getMoodLevel(analysis.moodScore).label}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-blue-600 dark:text-blue-400">Word Count:</span>
                                                <span className="font-semibold">{analysis.wordCount}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div>
                                                <span className="text-blue-600 dark:text-blue-400">Detected Emotions:</span>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {analysis.emotions.slice(0, 3).map(emotion => (
                                                        <span key={emotion} className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded-full text-xs capitalize">
                                                            {emotion}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 lg:col-span-3 space-y-2">
                                            <span className="text-blue-600 dark:text-blue-400">Topics:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.topics.map(topic => (
                                                    <span key={topic} className="px-3 py-1 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button 
                                    onClick={handleAnalyze}
                                    disabled={!newEntry.trim() || isAnalyzing}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-blue-400 disabled:to-cyan-400 text-white py-4 px-6 rounded-2xl font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Brain size={20} />
                                            Analyze Entry
                                        </>
                                    )}
                                </button>
                                <button 
                                    onClick={handleAddEntry}
                                    disabled={!newEntry.trim()}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-400 text-white py-4 px-6 rounded-2xl font-semibold transition-all disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg"
                                >
                                    Save Entry
                                </button>
                            </div>
                        </div>

                        {/* Entries Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                                <MessageCircle size={24} className="text-purple-500" />
                                Your Journal Entries
                                <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-2">
                                    ({filteredEntries.length} entries)
                                </span>
                            </h3>
                            
                            <div className="flex flex-wrap gap-3">
                                {/* Search */}
                                <div className="relative">
                                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search entries..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                
                                {/* Filter */}
                                <select 
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="all">All Topics</option>
                                    <option value="career">Career</option>
                                    <option value="learning">Learning</option>
                                    <option value="design">Design</option>
                                    <option value="technology">Technology</option>
                                    <option value="goals">Goals</option>
                                    <option value="relationships">Relationships</option>
                                    <option value="health">Health</option>
                                    <option value="personal growth">Personal Growth</option>
                                    <option value="hobbies">Hobbies</option>
                                </select>

                                {/* View Toggle */}
                                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`px-3 py-1 rounded-lg transition-all ${
                                            viewMode === "grid" 
                                                ? "bg-white dark:bg-gray-600 shadow-sm" 
                                                : "text-gray-500 dark:text-gray-400"
                                        }`}
                                    >
                                        Grid
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`px-3 py-1 rounded-lg transition-all ${
                                            viewMode === "list" 
                                                ? "bg-white dark:bg-gray-600 shadow-sm" 
                                                : "text-gray-500 dark:text-gray-400"
                                        }`}
                                    >
                                        List
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Entries Grid/List */}
                        <AnimatePresence>
                            {filteredEntries.length === 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
                                >
                                    <Book size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                                    <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No entries yet</h3>
                                    <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
                                        Start writing your first journal entry to begin your self-reflection journey. Your entries will be automatically analyzed for insights!
                                    </p>
                                </motion.div>
                            ) : viewMode === "grid" ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredEntries.map(entry => (
                                        <JournalEntryCard 
                                            key={entry.id}
                                            entry={entry}
                                            moodIcons={moodIcons}
                                            getSentimentColor={getSentimentColor}
                                            getMoodLevel={getMoodLevel}
                                            onSelect={setSelectedEntry}
                                            onDelete={deleteEntry}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredEntries.map(entry => (
                                        <JournalEntryList 
                                            key={entry.id}
                                            entry={entry}
                                            moodIcons={moodIcons}
                                            getSentimentColor={getSentimentColor}
                                            getMoodLevel={getMoodLevel}
                                            onSelect={setSelectedEntry}
                                            onDelete={deleteEntry}
                                        />
                                    ))}
                                </div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    
                    {/* Enhanced Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Prompts */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
                        >
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Lightbulb className="text-yellow-500" size={20} />
                                Writing Prompts
                            </h3>
                            <div className="space-y-3">
                                {[
                                    "What made me feel grateful today? 🙏",
                                    "What challenge did I overcome recently? 💪",
                                    "What am I looking forward to? 🌟",
                                    "What lesson did I learn this week? 📚",
                                    "How have I grown as a person? 🌱",
                                    "What brings me joy in my daily life? 😊"
                                ].map((prompt, index) => (
                                    <motion.div 
                                        key={index}
                                        whileHover={{ scale: 1.02 }}
                                        className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl cursor-pointer hover:shadow-md transition-all border border-blue-100 dark:border-blue-800"
                                        onClick={() => setNewEntry(prev => prev + " " + prompt)}
                                    >
                                        <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                                            {prompt}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Enhanced Insights - Only show if there are entries */}
                        {stats && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
                            >
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <TrendingUp className="text-green-500" size={20} />
                                    Your Insights
                                </h3>
                                <div className="space-y-4">
                                    {/* Sentiment Distribution */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600 dark:text-gray-400">Positive Entries</span>
                                            <span className="font-semibold text-green-600">{stats.positivityRate.toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all" 
                                                style={{ width: `${stats.positivityRate}%` }}
                                            />
                                        </div>
                                    </div>
                                    
                                    {/* Writing Consistency */}
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600 dark:text-gray-400">Writing Consistency</span>
                                            <span className="font-semibold text-purple-600">{stats.writingConsistency.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div 
                                                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all" 
                                                style={{ width: `${stats.writingConsistency}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Top Topics */}
                                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Top Topics</div>
                                        <div className="flex flex-wrap gap-2">
                                            {stats.topTopics.map((topic, index) => (
                                                <span 
                                                    key={topic}
                                                    className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Top Emotions */}
                                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Common Emotions</div>
                                        <div className="flex flex-wrap gap-2">
                                            {stats.topEmotions.map((emotion, index) => (
                                                <span 
                                                    key={emotion}
                                                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium capitalize"
                                                >
                                                    {emotion}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Integration Status */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-3xl border border-green-200 dark:border-green-700"
                        >
                            <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                                <Zap size={18} className="text-green-600" />
                                AI Integration Active
                            </h4>
                            <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
                                Your journal entries are automatically analyzed for sentiment, emotions, and patterns. Data is synchronized with your chatbot conversations for comprehensive insights.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Entry Detail Modal */}
            <AnimatePresence>
                {selectedEntry && (
                    <EntryDetailModal 
                        entry={selectedEntry}
                        moodIcons={moodIcons}
                        getSentimentColor={getSentimentColor}
                        getMoodLevel={getMoodLevel}
                        onClose={() => setSelectedEntry(null)}
                        onDelete={deleteEntry}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

// Journal Entry Card Component
const JournalEntryCard = ({ entry, moodIcons, getSentimentColor, getMoodLevel, onSelect, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => onSelect(entry)}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${moodIcons[entry.mood]?.bg} shadow-sm`}>
                        <span className="text-2xl">{moodIcons[entry.mood]?.icon}</span>
                    </div>
                    <div>
                        <div className="font-semibold text-gray-800 dark:text-white capitalize">
                            {moodIcons[entry.mood]?.label}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(entry.timestamp || entry.date).toLocaleDateString()}
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(entry.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                >
                    <Trash2 size={16} />
                </button>
            </div>
            
            {/* Content Preview */}
            <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {entry.content}
                </p>
            </div>
            
            {/* Analysis Tags */}
            <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(entry.analysis?.sentiment)} bg-opacity-20`}>
                    {entry.analysis?.sentiment}
                </span>
                {(entry.analysis?.topics || []).slice(0, 2).map(topic => (
                    <span key={topic} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                        {topic}
                    </span>
                ))}
                {entry.source && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                        {entry.source}
                    </span>
                )}
            </div>
        </motion.div>
    );
};

// Journal Entry List Component
const JournalEntryList = ({ entry, moodIcons, getSentimentColor, getMoodLevel, onSelect, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => onSelect(entry)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <div className={`p-3 rounded-xl ${moodIcons[entry.mood]?.bg} shadow-sm`}>
                        <span className="text-2xl">{moodIcons[entry.mood]?.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="font-semibold text-gray-800 dark:text-white capitalize">
                                {moodIcons[entry.mood]?.label}
                            </div>
                            <span className={`text-xs font-medium ${getSentimentColor(entry.analysis?.sentiment)}`}>
                                {entry.analysis?.sentiment}
                            </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                            {entry.content}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(entry.timestamp || entry.date).toLocaleDateString()}
                            </span>
                            {(entry.analysis?.topics || []).slice(0, 2).map(topic => (
                                <span key={topic} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(entry.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-all"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </motion.div>
    );
};

// Entry Detail Modal Component
const EntryDetailModal = ({ entry, moodIcons, getSentimentColor, getMoodLevel, onClose, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-2xl ${moodIcons[entry.mood]?.bg} shadow-lg`}>
                                <span className="text-3xl">{moodIcons[entry.mood]?.icon}</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white capitalize">
                                    {moodIcons[entry.mood]?.label}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {new Date(entry.timestamp || entry.date).toLocaleDateString('en-US', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onDelete(entry.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <Eye size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                            {entry.content}
                        </p>
                    </div>

                    {/* Analysis */}
                    {entry.analysis && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-4 text-lg flex items-center gap-2">
                                <Brain size={20} />
                                AI Analysis
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-blue-600 dark:text-blue-400">Sentiment:</span>
                                        <span className={getSentimentColor(entry.analysis.sentiment) + " font-semibold"}>
                                            {entry.analysis.sentiment}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-600 dark:text-blue-400">Confidence:</span>
                                        <span className="font-semibold">{(entry.analysis.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-600 dark:text-blue-400">Mood Score:</span>
                                        <span className={getMoodLevel(entry.analysis.moodScore).color + " font-semibold"}>
                                            {getMoodLevel(entry.analysis.moodScore).label} ({(entry.analysis.moodScore * 100).toFixed(0)}%)
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-blue-600 dark:text-blue-400">Word Count:</span>
                                        <span className="font-semibold">{entry.analysis.wordCount}</span>
                                    </div>
                                    <div>
                                        <span className="text-blue-600 dark:text-blue-400">Detected Emotions:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {entry.analysis.emotions.map(emotion => (
                                                <span key={emotion} className="px-2 py-1 bg-blue-200 dark:bg-blue-800 rounded-full text-xs capitalize">
                                                    {emotion}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <span className="text-blue-600 dark:text-blue-400">Topics:</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {entry.analysis.topics.map(topic => (
                                            <span key={topic} className="px-3 py-1 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                                {topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {entry.analysis.keywords && entry.analysis.keywords.length > 0 && (
                                    <div className="md:col-span-2">
                                        <span className="text-blue-600 dark:text-blue-400">Key Phrases:</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {entry.analysis.keywords.map((keyword, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-xs">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default JournalPage;
