// SentimentAnalysis.js - FIXED VERSION WITH PROPER CHARTS
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
    ArrowLeft, Brain, Lightbulb, Sparkles, TrendingUp, Calendar, 
    Activity, BarChart3, Heart, AlertCircle, User, Target, 
    Compass, Zap, Star, Crown, Gem, BarChart, LineChart, PieChart
} from "lucide-react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

// Chart.js imports with proper registration
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    RadialLinearScale // Add this for radar charts
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

// Register Chart.js components PROPERLY
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    RadialLinearScale // Register radial scale for radar charts
);

function SentimentAnalysis({ user, theme, setTheme, onLogout }) {
    const navigate = useNavigate();
    const [sentimentData, setSentimentData] = useState(null);
    const [personalityData, setPersonalityData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState("week");
    const [activeFramework, setActiveFramework] = useState("mbti");
    
    // Refs for charts to handle cleanup
    const chartRefs = useRef({});

    useEffect(() => {
        loadAllData();
        
        // Cleanup function to destroy charts
        return () => {
            Object.values(chartRefs.current).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                }
            });
        };
    }, [timeRange]);

    const loadAllData = () => {
        try {
            setLoading(true);
            setError(null);
            
            // Load sentiment data
            const sentimentData = loadSentimentData();
            setSentimentData(sentimentData);

            // Load personality data
            const personalityData = loadPersonalityData();
            setPersonalityData(personalityData);

        } catch (error) {
            console.error('Failed to load data:', error);
            setError('Failed to load data. Please try again.');
            setSentimentData(getDefaultSentimentData());
            setPersonalityData(getDefaultPersonalityData());
        } finally {
            setLoading(false);
        }
    };

    // Chart Options and Data Configurations
    const sentimentTrendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#6B7280',
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#6B7280'
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    const emotionDistributionOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#6B7280',
                    usePointStyle: true,
                    padding: 20
                }
            }
        }
    };

    const mbtiRadarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false,
                    stepSize: 20
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: '#6B7280',
                    font: {
                        size: 11
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const riasecBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#6B7280',
                    callback: function(value) {
                        return value + '%';
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#6B7280'
                }
            }
        }
    };

    // Generate Chart Data
    const getSentimentTrendData = () => {
        if (!sentimentData) return { labels: [], datasets: [] };
        
        return {
            labels: sentimentData.trends.map(t => t.day),
            datasets: [
                {
                    label: 'Positive Sentiment',
                    data: sentimentData.trends.map(t => t.sentiment),
                    borderColor: 'rgb(79, 70, 229)',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgb(79, 70, 229)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        };
    };

    const getEmotionDistributionData = () => {
        if (!sentimentData) return { labels: [], datasets: [] };
        
        const colors = [
            'rgba(239, 68, 68, 0.8)',    // red
            'rgba(249, 115, 22, 0.8)',   // orange
            'rgba(245, 158, 11, 0.8)',   // amber
            'rgba(132, 204, 22, 0.8)',   // lime
            'rgba(34, 197, 94, 0.8)',    // green
            'rgba(16, 185, 129, 0.8)',   // emerald
            'rgba(6, 182, 212, 0.8)',    // cyan
            'rgba(59, 130, 246, 0.8)'    // blue
        ];

        return {
            labels: sentimentData.emotions.map(e => e.name),
            datasets: [
                {
                    data: sentimentData.emotions.map(e => e.value),
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace('0.8', '1')),
                    borderWidth: 2,
                    hoverOffset: 15
                }
            ]
        };
    };

    const getMBTIRadarData = () => {
        if (!personalityData || personalityData.frameworks.mbti.length === 0) {
            return { 
                labels: ['Introversion', 'Intuition', 'Feeling', 'Perceiving', 'Thinking', 'Sensing'],
                datasets: [
                    {
                        label: 'Current MBTI',
                        data: [50, 50, 50, 50, 50, 50],
                        backgroundColor: 'rgba(79, 70, 229, 0.2)',
                        borderColor: 'rgb(79, 70, 229)',
                        pointBackgroundColor: 'rgb(79, 70, 229)',
                        pointBorderColor: '#fff'
                    }
                ]
            };
        }

        const currentMBTI = personalityData.frameworks.mbti[personalityData.frameworks.mbti.length - 1];
        
        return {
            labels: ['Introversion', 'Intuition', 'Feeling', 'Perceiving', 'Thinking', 'Sensing'],
            datasets: [
                {
                    label: 'Current MBTI',
                    data: [
                        currentMBTI.dimensions.introversion,
                        currentMBTI.dimensions.intuition,
                        currentMBTI.dimensions.feeling,
                        currentMBTI.dimensions.perceiving,
                        100 - currentMBTI.dimensions.feeling, // Thinking
                        100 - currentMBTI.dimensions.intuition // Sensing
                    ],
                    backgroundColor: 'rgba(79, 70, 229, 0.2)',
                    borderColor: 'rgb(79, 70, 229)',
                    pointBackgroundColor: 'rgb(79, 70, 229)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(79, 70, 229)'
                }
            ]
        };
    };

    const getRIASECBarData = () => {
        if (!personalityData || personalityData.frameworks.riasec.length === 0) {
            return { 
                labels: ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'],
                datasets: [
                    {
                        data: [50, 50, 50, 50, 50, 50],
                        backgroundColor: 'rgba(156, 163, 175, 0.8)',
                        borderColor: 'rgba(156, 163, 175, 1)',
                        borderWidth: 2
                    }
                ]
            };
        }

        const currentRIASEC = personalityData.frameworks.riasec[personalityData.frameworks.riasec.length - 1];
        const riasecTypes = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];
        
        const colors = riasecTypes.map(type => {
            const score = currentRIASEC.scores[type];
            if (score >= 70) return 'rgba(34, 197, 94, 0.8)';    // green
            if (score >= 50) return 'rgba(59, 130, 246, 0.8)';   // blue
            return 'rgba(156, 163, 175, 0.8)';                   // gray
        });

        return {
            labels: riasecTypes,
            datasets: [
                {
                    data: riasecTypes.map(type => currentRIASEC.scores[type]),
                    backgroundColor: colors,
                    borderColor: colors.map(color => color.replace('0.8', '1')),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }
            ]
        };
    };

    const getValuesTimelineData = () => {
        if (!personalityData || personalityData.frameworks.values.length === 0) {
            return { 
                labels: ['Jan', 'Feb', 'Mar'],
                datasets: [
                    {
                        label: 'No Data',
                        data: [50, 50, 50],
                        borderColor: 'rgb(156, 163, 175)',
                        backgroundColor: 'rgba(156, 163, 175, 0.1)',
                        tension: 0.4,
                        fill: false
                    }
                ]
            };
        }

        const values = personalityData.frameworks.values;
        const dates = personalityData.history.map(h => new Date(h.date).toLocaleDateString('en-US', { month: 'short' }));
        
        const datasets = values.slice(0, 4).map((value, index) => {
            const colors = [
                'rgb(239, 68, 68)',    // red
                'rgb(59, 130, 246)',   // blue
                'rgb(34, 197, 94)',    // green
                'rgb(168, 85, 247)'    // purple
            ];

            return {
                label: value.value,
                data: value.history.map(h => h.strength),
                borderColor: colors[index],
                backgroundColor: colors[index].replace('rgb', 'rgba').replace(')', ', 0.1)'),
                tension: 0.4,
                fill: false
            };
        });

        return {
            labels: dates,
            datasets
        };
    };

    const getIkigaiRadarData = () => {
        if (!personalityData || personalityData.frameworks.ikigai.length === 0) {
            return { 
                labels: ['Passion', 'Mission', 'Vocation', 'Profession', 'Balance'],
                datasets: [
                    {
                        label: 'Ikigai Components',
                        data: [50, 50, 50, 50, 50],
                        backgroundColor: 'rgba(168, 85, 247, 0.2)',
                        borderColor: 'rgb(168, 85, 247)',
                        pointBackgroundColor: 'rgb(168, 85, 247)',
                        pointBorderColor: '#fff'
                    }
                ]
            };
        }

        const currentIkigai = personalityData.frameworks.ikigai[personalityData.frameworks.ikigai.length - 1];
        
        return {
            labels: ['Passion', 'Mission', 'Vocation', 'Profession', 'Balance'],
            datasets: [
                {
                    label: 'Ikigai Components',
                    data: [
                        currentIkigai.components.passion,
                        currentIkigai.components.mission,
                        currentIkigai.components.vocation,
                        currentIkigai.components.profession,
                        (currentIkigai.components.passion + currentIkigai.components.mission + 
                         currentIkigai.components.vocation + currentIkigai.components.profession) / 4
                    ],
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    borderColor: 'rgb(168, 85, 247)',
                    pointBackgroundColor: 'rgb(168, 85, 247)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(168, 85, 247)'
                }
            ]
        };
    };

    // Chart component with error boundary
    const ChartWrapper = ({ type, data, options, height = "320px" }) => {
        const chartRef = useRef(null);
        
        const renderChart = () => {
            try {
                switch (type) {
                    case 'line':
                        return <Line ref={chartRef} data={data} options={options} />;
                    case 'bar':
                        return <Bar ref={chartRef} data={data} options={options} />;
                    case 'doughnut':
                        return <Doughnut ref={chartRef} data={data} options={options} />;
                    case 'radar':
                        return <Radar ref={chartRef} data={data} options={options} />;
                    default:
                        return <div className="text-center text-gray-500">Unsupported chart type</div>;
                }
            } catch (error) {
                console.error('Chart rendering error:', error);
                return (
                    <div className="flex items-center justify-center h-full text-red-500">
                        <div className="text-center">
                            <AlertCircle size={32} className="mx-auto mb-2" />
                            <p>Failed to render chart</p>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div style={{ height }} className="w-full">
                {renderChart()}
            </div>
        );
    };

    // Rest of your existing functions (same as before)
    const loadSentimentData = () => {
        const userData = localStorage.getItem('sparkUserData');
        const journalEntries = localStorage.getItem('sparkJournalEntries');
        
        if (!userData && !journalEntries) {
            return getDefaultSentimentData();
        }

        const parsedData = userData ? JSON.parse(userData) : { sentimentHistory: [], moodHistory: [] };
        const parsedEntries = journalEntries ? JSON.parse(journalEntries) : [];

        const allSentiments = [
            ...(parsedData.sentimentHistory || []),
            ...(parsedData.moodHistory || []).map(mood => ({
                timestamp: mood.timestamp,
                sentiment: mood.sentiment || 'neutral',
                moodScore: mood.moodScore || 0.5,
                confidence: 0.9,
                message: mood.message,
                source: 'mood'
            })),
            ...parsedEntries.map(entry => ({
                timestamp: entry.timestamp || entry.date,
                sentiment: entry.analysis?.sentiment || 'neutral',
                moodScore: entry.analysis?.moodScore || 0.5,
                confidence: entry.analysis?.confidence || 0.7,
                message: entry.content,
                source: 'journal'
            }))
        ];

        const filteredSentiments = filterByTimeRange(allSentiments, timeRange);
        
        if (filteredSentiments.length === 0) {
            return getDefaultSentimentData();
        }

        const stats = calculateSentimentStats(filteredSentiments);
        const trends = calculateWeeklyTrends(filteredSentiments);
        const emotions = analyzeEmotionalPatterns(filteredSentiments);
        const insights = generateInsights(stats, trends, emotions);

        return {
            ...stats,
            trends,
            emotions,
            insights,
            totalEntries: filteredSentiments.length,
            timeRange,
            dataSources: getDataSources(allSentiments)
        };
    };

    const loadPersonalityData = () => {
        const userData = localStorage.getItem('sparkUserData');
        const parsedData = userData ? JSON.parse(userData) : {};
        
        const mockPersonalityHistory = [
            { date: '2024-01-01', mbti: 'INFP', riasec: 'AIS', values: ['Creativity', 'Freedom'], ikigai: 'Artistic Expression' },
            { date: '2024-02-01', mbti: 'INFP', riasec: 'ASI', values: ['Creativity', 'Freedom', 'Growth'], ikigai: 'Creative Teaching' },
            { date: '2024-03-01', mbti: 'INFJ', riasec: 'SAI', values: ['Creativity', 'Freedom', 'Growth', 'Impact'], ikigai: 'Mentoring' },
        ];

        const currentPersonality = {
            mbti: parsedData.mbtiResult || 'INFP',
            riasec: parsedData.riasecResult || 'AIS',
            values: Array.isArray(parsedData.valuesResult) ? parsedData.valuesResult : ['Creativity', 'Freedom'],
            skills: Array.isArray(parsedData.skillsResult) ? parsedData.skillsResult : ['Writing', 'Empathy', 'Creative Thinking'],
            ikigai: parsedData.ikigaiResult || 'Creative Expression through Teaching'
        };

        return {
            current: currentPersonality,
            history: mockPersonalityHistory,
            frameworks: {
                mbti: analyzeMBTIEvolution(mockPersonalityHistory),
                riasec: analyzeRIASECEvolution(mockPersonalityHistory),
                values: analyzeValuesEvolution(mockPersonalityHistory),
                ikigai: analyzeIkigaiEvolution(mockPersonalityHistory)
            },
            insights: generatePersonalityInsights(currentPersonality, mockPersonalityHistory)
        };
    };

    // Personality Analysis Functions
    const analyzeMBTIEvolution = (history) => {
        const mbtiChanges = history.map(entry => ({
            date: entry.date,
            type: entry.mbti,
            dimensions: {
                introversion: entry.mbti.includes('I') ? 80 : 20,
                intuition: entry.mbti.includes('N') ? 70 : 30,
                feeling: entry.mbti.includes('F') ? 75 : 25,
                perceiving: entry.mbti.includes('P') ? 65 : 35
            }
        }));
        return mbtiChanges;
    };

    const analyzeRIASECEvolution = (history) => {
        const riasecChanges = history.map(entry => ({
            date: entry.date,
            types: entry.riasec.split(''),
            scores: {
                Realistic: entry.riasec.includes('R') ? 85 : 30,
                Investigative: entry.riasec.includes('I') ? 75 : 25,
                Artistic: entry.riasec.includes('A') ? 90 : 20,
                Social: entry.riasec.includes('S') ? 70 : 40,
                Enterprising: entry.riasec.includes('E') ? 45 : 55,
                Conventional: entry.riasec.includes('C') ? 35 : 65
            }
        }));
        return riasecChanges;
    };

    const analyzeValuesEvolution = (history) => {
        const allValues = [...new Set(history.flatMap(entry => entry.values))];
        const valuesEvolution = allValues.map(value => ({
            value,
            history: history.map(entry => ({
                date: entry.date,
                present: entry.values.includes(value),
                strength: entry.values.includes(value) ? 80 + Math.random() * 20 : 20 + Math.random() * 30
            }))
        }));
        return valuesEvolution;
    };

    const analyzeIkigaiEvolution = (history) => {
        return history.map(entry => ({
            date: entry.date,
            ikigai: entry.ikigai,
            components: {
                passion: 70 + Math.random() * 30,
                mission: 65 + Math.random() * 35,
                vocation: 60 + Math.random() * 40,
                profession: 55 + Math.random() * 45
            }
        }));
    };

    const generatePersonalityInsights = (current, history) => {
        const insights = [];
        
        if (history.length > 1) {
            const first = history[0];
            const last = history[history.length - 1];
            
            if (first.mbti !== last.mbti) {
                insights.push(`Your personality has evolved from ${first.mbti} to ${last.mbti}, showing growth in self-awareness.`);
            }
            
            if (first.riasec !== last.riasec) {
                insights.push(`Your career interests shifted from ${first.riasec} to ${last.riasec}, indicating new passions.`);
            }
            
            const newValues = last.values.filter(v => !first.values.includes(v));
            if (newValues.length > 0) {
                insights.push(`You've developed new core values: ${newValues.join(', ')}`);
            }
        }
        
        insights.push("Regular self-reflection helps you understand how you're growing and changing over time.");
        insights.push("Your evolving personality shows adaptability and openness to new experiences.");
        
        return insights;
    };

    // Helper functions
    const getDataSources = (sentiments) => {
        const sources = {
            journal: sentiments.filter(s => s.source === 'journal').length,
            chatbot: sentiments.filter(s => s.source === 'chat-conversation' || s.source === 'chatbot').length,
            mood: sentiments.filter(s => s.source === 'mood' || s.source === 'mood-tracker').length
        };
        return sources;
    };

    const filterByTimeRange = (sentiments, range) => {
        const now = new Date();
        let cutoffDate;

        switch(range) {
            case 'week':
                cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'month':
                cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'all':
            default:
                return sentiments;
        }

        return sentiments.filter(s => new Date(s.timestamp) >= cutoffDate);
    };

    const calculateSentimentStats = (sentiments) => {
        if (sentiments.length === 0) {
            return {
                overall: 50,
                positive: 0,
                negative: 0,
                neutral: 0,
                averageMood: 0.5,
                stability: "No data"
            };
        }

        const sentimentCounts = {
            'very positive': sentiments.filter(s => s.sentiment === 'very positive').length,
            'positive': sentiments.filter(s => s.sentiment === 'positive').length,
            'neutral': sentiments.filter(s => s.sentiment === 'neutral').length,
            'negative': sentiments.filter(s => s.sentiment === 'negative').length,
            'very negative': sentiments.filter(s => s.sentiment === 'very negative').length
        };

        const positiveEntries = sentimentCounts['very positive'] + sentimentCounts['positive'];
        const negativeEntries = sentimentCounts['very negative'] + sentimentCounts['negative'];
        const neutralEntries = sentimentCounts['neutral'];
        
        const overall = (positiveEntries / sentiments.length) * 100;
        const averageMood = sentiments.reduce((sum, s) => sum + s.moodScore, 0) / sentiments.length;

        const variance = sentiments.reduce((sum, s) => sum + Math.pow(s.moodScore - averageMood, 2), 0) / sentiments.length;
        let stability;
        if (variance < 0.02) stability = "Very Stable";
        else if (variance < 0.05) stability = "Stable";
        else if (variance < 0.1) stability = "Moderate";
        else stability = "Variable";

        return {
            overall: Math.round(overall),
            positive: positiveEntries,
            negative: negativeEntries,
            neutral: neutralEntries,
            sentimentCounts,
            averageMood: Math.round(averageMood * 100) / 100,
            stability
        };
    };

    const calculateWeeklyTrends = (sentiments) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const trends = days.map(day => ({ day, sentiment: 50, count: 0 }));

        if (sentiments.length === 0) return trends;

        const dayData = {};
        sentiments.forEach(sentiment => {
            const date = new Date(sentiment.timestamp);
            const day = days[date.getDay()];
            if (!dayData[day]) {
                dayData[day] = { total: 0, count: 0 };
            }
            dayData[day].total += sentiment.moodScore * 100;
            dayData[day].count++;
        });

        return trends.map(trend => ({
            ...trend,
            sentiment: dayData[trend.day] 
                ? Math.round(dayData[trend.day].total / dayData[trend.day].count)
                : 50,
            count: dayData[trend.day]?.count || 0
        }));
    };

    const analyzeEmotionalPatterns = (sentiments) => {
        const emotionCounts = {};
        sentiments.forEach(sentiment => {
            const emotions = sentiment.analysis?.emotions || [sentiment.sentiment];
            emotions.forEach(emotion => {
                emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
            });
        });

        const total = sentiments.length;
        const emotionPatterns = Object.entries(emotionCounts)
            .map(([emotion, count]) => ({
                name: getEmotionDisplayName(emotion),
                value: Math.round((count / total) * 100),
                rawCount: count
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 8);

        if (emotionPatterns.length < 4) {
            const defaultPatterns = [
                { name: 'Joy & Happiness', value: 25 },
                { name: 'Contentment', value: 20 },
                { name: 'Anxiety & Worry', value: 15 },
                { name: 'Excitement', value: 15 },
                { name: 'Gratitude', value: 10 },
                { name: 'Frustration', value: 8 },
                { name: 'Sadness', value: 5 },
                { name: 'Overwhelm', value: 2 },
            ];
            return defaultPatterns.slice(0, 8);
        }

        return emotionPatterns;
    };

    const getEmotionDisplayName = (emotion) => {
        const emotionMap = {
            'joy': 'Joy & Happiness',
            'happy': 'Joy & Happiness',
            'gratitude': 'Gratitude',
            'excited': 'Excitement',
            'anxious': 'Anxiety & Worry',
            'worried': 'Anxiety & Worry',
            'sad': 'Sadness',
            'angry': 'Frustration',
            'frustrated': 'Frustration',
            'content': 'Contentment',
            'peaceful': 'Contentment',
            'overwhelmed': 'Overwhelm',
            'very positive': 'Joy & Happiness',
            'positive': 'Contentment',
            'neutral': 'Neutral',
            'negative': 'Anxiety & Worry',
            'very negative': 'Sadness'
        };
        return emotionMap[emotion] || emotion.charAt(0).toUpperCase() + emotion.slice(1);
    };

    const generateInsights = (stats, trends, emotions) => {
        const insights = [];

        if (stats.totalEntries < 3) {
            insights.push(
                "Start by adding more journal entries or chatting with Spark to get personalized insights about your emotional patterns."
            );
            return insights;
        }

        if (stats.overall > 70) {
            insights.push("You've been maintaining a very positive outlook recently! This positive mindset can help you tackle challenges more effectively.");
        } else if (stats.overall < 30) {
            insights.push("I notice you've been experiencing more difficult emotions lately. Remember that it's okay to not be okay, and seeking support is a sign of strength.");
        } else {
            insights.push("Your emotional balance shows a healthy mix of experiences. This adaptability is key to emotional resilience.");
        }

        if (stats.stability === "Very Stable") {
            insights.push("Your emotional patterns show remarkable consistency, which can be a sign of good emotional regulation and self-awareness.");
        } else if (stats.stability === "Variable") {
            insights.push("Your emotions have been fluctuating recently. This might be a good time to practice grounding techniques and self-care.");
        }

        if (emotions[0]?.value > 25) {
            insights.push(`Your most prominent emotion is ${emotions[0].name.toLowerCase()}. Recognizing this pattern can help you understand what triggers these feelings.`);
        }

        const trendValues = trends.map(t => t.sentiment);
        const trendChange = trendValues[trendValues.length - 1] - trendValues[0];
        if (Math.abs(trendChange) > 15) {
            if (trendChange > 0) {
                insights.push("Your sentiment has shown significant improvement recently. Celebrate this positive trend!");
            } else {
                insights.push("I notice a shift in your emotional patterns. Consider what might be influencing these changes.");
            }
        }

        insights.push("Based on your tracking history, you're building valuable self-awareness about your emotional landscape.");

        return insights.slice(0, 4);
    };

    const getDefaultSentimentData = () => ({
        overall: 50,
        totalEntries: 0,
        averageMood: 0.5,
        stability: "No data",
        trends: [
            { day: 'Mon', sentiment: 50, count: 0 },
            { day: 'Tue', sentiment: 50, count: 0 },
            { day: 'Wed', sentiment: 50, count: 0 },
            { day: 'Thu', sentiment: 50, count: 0 },
            { day: 'Fri', sentiment: 50, count: 0 },
            { day: 'Sat', sentiment: 50, count: 0 },
            { day: 'Sun', sentiment: 50, count: 0 },
        ],
        emotions: [
            { name: 'Joy & Happiness', value: 25 },
            { name: 'Contentment', value: 20 },
            { name: 'Anxiety & Worry', value: 15 },
            { name: 'Excitement', value: 15 },
            { name: 'Gratitude', value: 10 },
            { name: 'Frustration', value: 8 },
            { name: 'Sadness', value: 5 },
            { name: 'Overwhelm', value: 2 },
        ],
        insights: [
            "Start tracking your moods and journal entries to unlock personalized insights about your emotional patterns",
            "Your first few entries will help establish your baseline mood and sentiment trends"
        ],
        dataSources: {
            journal: 0,
            chatbot: 0,
            mood: 0
        }
    });

    const getDefaultPersonalityData = () => ({
        current: {
            mbti: 'Not assessed',
            riasec: 'Not assessed',
            values: ['Not assessed'],
            skills: ['Not assessed'],
            ikigai: 'Not assessed'
        },
        history: [],
        frameworks: {
            mbti: [],
            riasec: [],
            values: [],
            ikigai: []
        },
        insights: [
            "Complete personality assessments to start tracking your personal growth journey",
            "Your personality evolves over time - tracking helps you understand these changes"
        ]
    });

    const getSentimentColor = (score) => {
        if (score >= 70) return 'text-green-600 dark:text-green-400';
        if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getStabilityColor = (stability) => {
        switch(stability) {
            case 'Very Stable': return 'text-green-600 dark:text-green-400';
            case 'Stable': return 'text-blue-600 dark:text-blue-400';
            case 'Moderate': return 'text-yellow-600 dark:text-yellow-400';
            case 'Variable': return 'text-orange-600 dark:text-orange-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    const refreshData = () => {
        loadAllData();
    };

    // Enhanced Chart Components with error handling
    const MBTIGraph = () => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Brain size={18} className="text-indigo-500" />
                MBTI Personality Radar
            </h4>
            <ChartWrapper 
                type="radar" 
                data={getMBTIRadarData()} 
                options={mbtiRadarOptions}
                height="320px"
            />
            {personalityData.frameworks.mbti.length > 0 && (
                <div className="mt-4 text-center">
                    <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                        Current: {personalityData.frameworks.mbti[personalityData.frameworks.mbti.length - 1].type}
                    </span>
                </div>
            )}
        </div>
    );

    const RIASECGraph = () => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Compass size={18} className="text-blue-500" />
                RIASEC Career Interests
            </h4>
            <ChartWrapper 
                type="bar" 
                data={getRIASECBarData()} 
                options={riasecBarOptions}
                height="320px"
            />
        </div>
    );

    const ValuesGraph = () => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Heart size={18} className="text-red-500" />
                Core Values Evolution
            </h4>
            <ChartWrapper 
                type="line" 
                data={getValuesTimelineData()} 
                options={sentimentTrendOptions}
                height="320px"
            />
        </div>
    );

    const IkigaiGraph = () => (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-purple-500" />
                Ikigai Framework
            </h4>
            <ChartWrapper 
                type="radar" 
                data={getIkigaiRadarData()} 
                options={mbtiRadarOptions}
                height="320px"
            />
        </div>
    );

    const renderFrameworkGraph = () => {
        switch(activeFramework) {
            case 'mbti':
                return <MBTIGraph />;
            case 'riasec':
                return <RIASECGraph />;
            case 'values':
                return <ValuesGraph />;
            case 'ikigai':
                return <IkigaiGraph />;
            default:
                return <MBTIGraph />;
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen w-full">
                <Sidebar currentPage="wellness" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
                <main className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">Analyzing your data...</p>
                    </div>
                </main>
            </div>
        );
    }
    
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar currentPage="wellness" user={user} theme={theme} setTheme={setTheme} onLogout={onLogout} />
            <main className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <button 
                            onClick={() => navigate("/journal")} 
                            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-1" /> Back to Journal
                        </button>
                        
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Time Range:</span>
                                <select 
                                    value={timeRange}
                                    onChange={(e) => setTimeRange(e.target.value)}
                                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="week">Past Week</option>
                                    <option value="month">Past Month</option>
                                    <option value="all">All Time</option>
                                </select>
                            </div>
                            
                            <button
                                onClick={refreshData}
                                className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
                        >
                            <AlertCircle size={20} className="text-red-500" />
                            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                        </motion.div>
                    )}
                    
                    {/* Sentiment Analysis Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 mb-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-2xl mr-4">
                                    <Brain size={24} />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Sentiment & Personality Analysis</h1>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        AI-powered insights from your journey • {sentimentData.totalEntries} entries analyzed
                                    </p>
                                </div>
                            </div>
                            
                            {sentimentData.dataSources && (
                                <div className="flex gap-4 text-sm">
                                    <div className="text-center">
                                        <div className="font-semibold text-blue-600">{sentimentData.dataSources.journal}</div>
                                        <div className="text-gray-500">Journal</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-green-600">{sentimentData.dataSources.chatbot}</div>
                                        <div className="text-gray-500">Chat</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-semibold text-purple-600">{sentimentData.dataSources.mood}</div>
                                        <div className="text-gray-500">Mood</div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className={`text-3xl font-bold ${getSentimentColor(sentimentData.overall)} mb-1`}>
                                            {sentimentData.overall}%
                                        </div>
                                        <div className="text-sm text-blue-800 dark:text-blue-200 font-medium">
                                            Overall Positive Sentiment
                                        </div>
                                    </div>
                                    <TrendingUp className="text-blue-500" size={32} />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-xl border border-green-200 dark:border-green-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-green-600 dark:text-green-300 mb-1">
                                            {sentimentData.totalEntries}
                                        </div>
                                        <div className="text-sm text-green-800 dark:text-green-200 font-medium">
                                            Total Entries Analyzed
                                        </div>
                                    </div>
                                    <Sparkles className="text-green-500" size={32} />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-xl border border-purple-200 dark:border-purple-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-300 mb-1">
                                            {Math.round(sentimentData.averageMood * 100)}%
                                        </div>
                                        <div className="text-sm text-purple-800 dark:text-purple-200 font-medium">
                                            Average Mood Score
                                        </div>
                                    </div>
                                    <Activity className="text-purple-500" size={32} />
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 p-6 rounded-xl border border-orange-200 dark:border-orange-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className={`text-3xl font-bold ${getStabilityColor(sentimentData.stability)} mb-1`}>
                                            {sentimentData.stability.split(' ')[0]}
                                        </div>
                                        <div className="text-sm text-orange-800 dark:text-orange-200 font-medium">
                                            Emotional Stability
                                        </div>
                                    </div>
                                    <BarChart3 className="text-orange-500" size={32} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Weekly Trends Chart */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <LineChart size={18} />
                                Weekly Sentiment Trend
                                <span className="text-sm text-gray-500 ml-2">
                                    ({sentimentData.trends.reduce((sum, day) => sum + day.count, 0)} entries this week)
                                </span>
                            </h3>
                            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                                <ChartWrapper 
                                    type="line" 
                                    data={getSentimentTrendData()} 
                                    options={sentimentTrendOptions}
                                    height="320px"
                                />
                            </div>
                        </div>
                        
                        {/* Emotional Breakdown and Insights */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                            {/* Emotional Breakdown */}
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <PieChart size={18} className="text-red-500" />
                                    Emotional Patterns Distribution
                                </h3>
                                <div className="bg-white dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                                    <ChartWrapper 
                                        type="doughnut" 
                                        data={getEmotionDistributionData()} 
                                        options={emotionDistributionOptions}
                                        height="320px"
                                    />
                                </div>
                            </div>
                            
                            {/* Key Insights */}
                            <div>
                                <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <Lightbulb size={18} className="text-yellow-500" />
                                    Personalized Insights
                                </h3>
                                <div className="space-y-4">
                                    {sentimentData.insights.map((insight, index) => (
                                        <motion.div 
                                            key={index}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700"
                                        >
                                            <Lightbulb size={16} className="text-yellow-600 dark:text-yellow-300 mr-3 mt-0.5 flex-shrink-0" />
                                            <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
                                                {insight}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Personality Tracking Section */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-2xl mr-4">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Personality Evolution</h2>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Track how your personality and interests evolve over time
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Framework Selector */}
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                            {[
                                { id: 'mbti', name: 'MBTI', icon: <Brain size={16} /> },
                                { id: 'riasec', name: 'RIASEC', icon: <Compass size={16} /> },
                                { id: 'values', name: 'Values', icon: <Heart size={16} /> },
                                { id: 'ikigai', name: 'Ikigai', icon: <Target size={16} /> }
                            ].map(framework => (
                                <button
                                    key={framework.id}
                                    onClick={() => setActiveFramework(framework.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                                        activeFramework === framework.id
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                >
                                    {framework.icon}
                                    <span>{framework.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Personality Graph */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <div className="lg:col-span-2">
                                {renderFrameworkGraph()}
                            </div>
                            
                            {/* Current Profile & Insights */}
                            <div className="space-y-6">
                                {/* Current Profile */}
                                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-700">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <Crown size={16} className="text-amber-500" />
                                        Current Profile
                                    </h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">MBTI:</span>
                                            <span className="font-medium text-gray-800 dark:text-white">
                                                {personalityData.current.mbti}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">RIASEC:</span>
                                            <span className="font-medium text-gray-800 dark:text-white">
                                                {personalityData.current.riasec}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Top Values:</span>
                                            <span className="font-medium text-gray-800 dark:text-white text-right">
                                                {personalityData.current.values.slice(0, 2).join(', ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Growth Insights */}
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
                                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <Zap size={16} className="text-green-500" />
                                        Growth Insights
                                    </h4>
                                    <div className="space-y-2">
                                        {personalityData.insights.map((insight, index) => (
                                            <p key={index} className="text-sm text-green-700 dark:text-green-300">
                                                • {insight}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <button 
                                    onClick={() => navigate('/quest')}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    <Sparkles size={18} />
                                    Update Assessments
                                </button>
                            </div>
                        </div>

                        {/* Improvement Suggestions */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-700">
                            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Star size={18} className="text-blue-500" />
                                Areas for Growth
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-start">
                                    <Gem size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Practice mindfulness to enhance emotional awareness</span>
                                </div>
                                <div className="flex items-start">
                                    <Gem size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Explore new hobbies to discover hidden interests</span>
                                </div>
                                <div className="flex items-start">
                                    <Gem size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Regular journaling helps track personality changes</span>
                                </div>
                                <div className="flex items-start">
                                    <Gem size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Re-take assessments every 6 months to see growth</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

export default SentimentAnalysis;
