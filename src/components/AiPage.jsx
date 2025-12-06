import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';

import GlowCursor from '@/components/GlowCursor';

// --- CONFIGURATION ---
const CUSTOM_COLOR = '#FFEFE5'; 
const ACCENT_COLOR_LOW_OPACITY = '#FFEFE530';

const INITIAL_MESSAGE = {
    id: 1,
    sender: 'ai',
    text: "Hello! I am Farzana's AI Assistant. You can ask me about her skills, experience, projects, or how this portfolio was built. How can I help you today?"
};

export default function AiPage() {
    const router = useRouter();

    // --- LOADING STATE ---
    const [isLoading, setIsLoading] = useState(true);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Simulate Loading Effect on Mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds load time for AI terminal
        return () => clearTimeout(timer);
    }, []);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const lowerInput = input.trim().toLowerCase();
        
        if (lowerInput === 'exit' || lowerInput === 'quit') {
            router.push("/");
            return;
        }

        if (lowerInput === 'clear' || lowerInput === 'cls') {
            setMessages([INITIAL_MESSAGE]);
            setInput('');
            return;
        }

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            let responseText = "";

            if (lowerInput.includes('how') && (lowerInput.includes('portfolio') || lowerInput.includes('site') || lowerInput.includes('made') || lowerInput.includes('built'))) {
                responseText = "This portfolio was built using React, Next.js, and Tailwind CSS. The smooth animations are powered by Framer Motion, and the 3D-style interactions use standard CSS transforms!";
            }
            else if (lowerInput.includes('language') || lowerInput.includes('skill') || lowerInput.includes('stack') || lowerInput.includes('tech')) {
                responseText = "My technical stack includes: JavaScript (ES6+), React.js, Next.js, Node.js, MongoDB, Three.js, and Tailwind CSS. I also have experience with Python and Flask.";
            }
            else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('reach') || lowerInput.includes('hire')) {
                responseText = "I'd love to hear from you! You can reach me at: connectwithfarzaana@gmail.com";
            }
            else if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('job') || lowerInput.includes('company')) {
                responseText = "I am currently a MERN Stack Developer at Zephyr Technologies (since Jan 2024). I specialize in building scalable web applications and mentoring students.";
            }
            else if (lowerInput.includes('project') || lowerInput.includes('app')) {
                responseText = "Some of my key projects include an E-Commerce Dashboard, the Skillzep educational platform, and the Samaa Wallet app. You can see details in the 'My Work' section!";
            }
            else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
                responseText = "Hi there! Feel free to ask me anything about my work as a developer.";
            }
            else if (lowerInput.includes('who are you') || lowerInput.includes('your name')) {
                responseText = "I am an AI assistant representing Khadeejath Farzana A, a Creative Developer from Sampaje.";
            }
            else {
                responseText = "I'm not sure about that one yet! Try asking about my 'skills', 'projects', or 'how this site was made'.";
            }

            const aiMsg = { id: Date.now() + 1, sender: 'ai', text: responseText };
            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 800); 
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen font-sans selection:bg-[#FFEFE5] selection:text-black">
             {/* --- FIX START: Wrap GlowCursor in a high z-index container --- */}
            <div className="fixed inset-0 z-[9999] pointer-events-none">
                <GlowCursor/>
            </div>
            {/* --- FIX END --- */}

            <Head>
                <title>Farzana Abbas</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            {/* --- PRELOADER: WALKING ROBOT --- */}
            <AnimatePresence mode="wait">
                {isLoading && (
                    <motion.div
                        key="preloader"
                        exit={{ y: -1000, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
                    >
                        {/* ROBOT CSS STYLES */}
                        <style jsx>{`
                        .robot-container {
                            position: relative;
                            width: 60px;
                            height: 100px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            animation: bob 0.6s infinite ease-in-out alternate;
                        }
                        .head {
                            width: 40px;
                            height: 30px;
                            border: 2px solid ${CUSTOM_COLOR};
                            border-radius: 6px;
                            position: relative;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            gap: 6px;
                        }
                        .antenna {
                            position: absolute;
                            top: -12px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 2px;
                            height: 12px;
                            background-color: ${CUSTOM_COLOR};
                        }
                        .antenna::after {
                            content: '';
                            position: absolute;
                            top: -4px;
                            left: -3px;
                            width: 8px;
                            height: 8px;
                            background-color: ${CUSTOM_COLOR};
                            border-radius: 50%;
                            animation: blink 1s infinite;
                        }
                        .eye {
                            width: 6px;
                            height: 6px;
                            background-color: ${CUSTOM_COLOR};
                            border-radius: 50%;
                        }
                        .neck {
                            width: 10px;
                            height: 5px;
                            border-left: 2px solid ${CUSTOM_COLOR};
                            border-right: 2px solid ${CUSTOM_COLOR};
                        }
                        .body {
                            width: 50px;
                            height: 40px;
                            border: 2px solid ${CUSTOM_COLOR};
                            border-radius: 8px;
                            position: relative;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .heart {
                            font-size: 10px;
                            opacity: 0.5;
                            animation: pulse 1s infinite;
                        }
                        .legs-container {
                            display: flex;
                            gap: 10px;
                            margin-top: -2px; /* Connect to body */
                        }
                        .leg {
                            width: 8px;
                            height: 25px;
                            background-color: ${CUSTOM_COLOR};
                            border-radius: 4px;
                            transform-origin: top;
                        }
                        .leg.left {
                            animation: walk 0.6s infinite ease-in-out;
                        }
                        .leg.right {
                            animation: walk 0.6s infinite ease-in-out reverse;
                        }
                        .shadow {
                            margin-top: 10px;
                            width: 50px;
                            height: 8px;
                            background-color: ${CUSTOM_COLOR};
                            border-radius: 50%;
                            opacity: 0.2;
                            animation: shadowScale 0.6s infinite ease-in-out alternate;
                        }
                        @keyframes bob {
                            0% { transform: translateY(0); }
                            100% { transform: translateY(-5px); }
                        }
                        @keyframes walk {
                            0% { transform: rotate(15deg); }
                            100% { transform: rotate(-15deg); }
                        }
                        @keyframes blink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0.3; }
                        }
                        @keyframes pulse {
                            0% { transform: scale(1); }
                            50% { transform: scale(1.2); }
                            100% { transform: scale(1); }
                        }
                        @keyframes shadowScale {
                            0% { transform: scale(1); opacity: 0.2; }
                            100% { transform: scale(0.8); opacity: 0.1; }
                        }
                        `}</style>

                        <div className="robot-container">
                        <div className="antenna"></div>
                        <div className="head">
                            <div className="eye"></div>
                            <div className="eye"></div>
                        </div>
                        <div className="neck"></div>
                        <div className="body">
                            <span className="heart">❤</span>
                        </div>
                        <div className="legs-container">
                            <div className="leg left"></div>
                            <div className="leg right"></div>
                        </div>
                        </div>
                        
                        <div className="shadow"></div>

                        <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-xl font-bold font-mono tracking-widest uppercase opacity-80 animate-pulse"
                        style={{ color: CUSTOM_COLOR }}
                        >
                        Wait Bro
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MAIN CONTENT --- */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pt-32 pb-10 px-6 md:px-12 flex flex-col min-h-screen"
            >
                <nav className="fixed w-full z-50 top-0 left-0 px-6 py-6 flex justify-between items-center mix-blend-difference pointer-events-none">
                    <div className="text-xl font-bold uppercase tracking-widest invisible">Farzana.</div>
                </nav>

                <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
                    
                    {/* Header Section */}
                    <div className="mb-8 border-b border-white/10 pb-6">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter text-white">
                            [AI] <span style={{ color: CUSTOM_COLOR }}>ASSISTANT</span>
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-2xl">
                            Instructions: Use this AI-powered terminal to ask questions. Try asking: <br/>
                            <span className="text-white/60">"How did you build this site?"</span> or <span className="text-white/60">"What is your tech stack?"</span>
                        </p>
                    </div>

                    {/* Console / Chat Window */}
                    <div 
                        className="flex-1 min-h-[400px] bg-[#111] rounded-t-xl border border-white/10 p-6 overflow-y-auto custom-scrollbar relative shadow-2xl"
                        ref={scrollRef}
                        onClick={() => document.getElementById('ai-input')?.focus()}
                    >
                        <div className="space-y-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className="flex flex-col gap-1">
                                    <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${msg.sender === 'ai' ? 'text-[#FFEFE5]' : 'text-gray-500'}`}>
                                        {msg.sender === 'ai' ? 'FARZANA.AI' : '[USER]'}
                                    </div>
                                    <div className={`text-sm md:text-base leading-relaxed ${msg.sender === 'ai' ? 'text-gray-300' : 'text-white'}`}>
                                        {msg.sender === 'ai' && <span className="mr-2 text-[#FFEFE5]">{'>'}</span>}
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <span className="animate-pulse">●</span>
                                    <span className="animate-pulse delay-75">●</span>
                                    <span className="animate-pulse delay-150">●</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="bg-[#161616] border border-t-0 border-white/10 rounded-b-xl p-4 flex items-center gap-3">
                        <span className="text-lg font-bold animate-pulse" style={{ color: CUSTOM_COLOR }}>$</span>
                        <form onSubmit={handleSend} className="w-full">
                            <input
                                id="ai-input"
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message here..."
                                className="w-full bg-transparent border-none outline-none text-white font-mono placeholder-gray-600 focus:ring-0"
                                autoComplete="off"
                                autoFocus
                            />
                        </form>
                    </div>

                    {/* Footer Controls */}
                    <div className="mt-6 flex justify-start gap-4">
                        <button 
                            onClick={() => setMessages([INITIAL_MESSAGE])}
                            className="bg-white/10 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white/20 transition-colors rounded-sm cursor-pointer z-50 relative"
                        >
                            Clear Console
                        </button>
                        <button 
                            onClick={() => router.push("/")}
                            className="border border-white/20 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors rounded-sm cursor-pointer z-50 relative"
                        >
                            Exit Terminal
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}