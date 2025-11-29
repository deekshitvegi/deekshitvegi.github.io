import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeClasses, ChatMessage } from '../types';
import { generateAIContent } from '../services/geminiService';

declare const marked: any; // Make the 'marked' library globally available to TypeScript

interface AIChatWidgetProps {
    themeClasses: ThemeClasses;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ themeClasses }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: "Hello! I'm the VKT Chatbot. Describe your communication needs, and I'll recommend the best solutions." }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatWindowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = useCallback(async (query?: string) => {
        const userQuery = query || input;
        if (!userQuery.trim() || isLoading) return;

        setMessages(prev => [...prev, { sender: 'user', text: userQuery.trim() }]);
        setInput('');
        setIsLoading(true);

        const systemPrompt = `You are a professional sales consultant for VKT Services, a Hytera partner. Your goal is to recommend relevant two-way radio and communication products based on the user's need. Keep your response professional, concise, and focused on solution categories (like DMR Handsets, TETRA Systems, Ad-Hoc Solutions, etc.). Do not invent product names or pricing. Ground your answers using the provided search results. Use markdown for formatting like lists and bold text. The user query is: "${userQuery}".`;

        try {
            const { text, sources } = await generateAIContent(userQuery, systemPrompt);
            setMessages(prev => [...prev, { sender: 'bot', text, sources }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: "I apologize, but I'm currently unable to connect to the consultant service. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading]);

    const initialQuickReplies = [
        "What's best for a construction site?",
        "Do you have TETRA systems?",
        "What are your popular accessories?",
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-4 rounded-full shadow-lg transition-all duration-300 ${themeClasses.button} z-50 transform hover:scale-110`}
                aria-label="Open chatbot"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            </button>

            <div
                className={`absolute bottom-full right-0 mb-4 w-96 max-w-[calc(100vw-4rem)] h-[500px] rounded-xl shadow-2xl flex flex-col transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'} ${themeClasses.cardBg}`}
            >
                <div className={`p-4 rounded-t-xl flex justify-between items-center bg-gradient-to-r from-red-600 to-red-800 dark:from-red-700 dark:to-red-900`}>
                    <h3 className="font-bold text-lg text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">VKT Chatbot</h3>
                    <button onClick={() => setIsOpen(false)} className="text-white p-1 rounded-full transition-colors duration-200 hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-white/50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div ref={chatWindowRef} className={`flex-1 p-4 overflow-y-auto ${themeClasses.mainBg} custom-scrollbar`}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-3 rounded-xl shadow-md ${msg.sender === 'user' ? `bg-red-700 text-white` : `${themeClasses.cardBg} ${themeClasses.text} border ${themeClasses.border}`}`}>
                                {msg.sender === 'user' ? (
                                    <p className="whitespace-pre-wrap">{msg.text}</p>
                                ) : (
                                    <div
                                        className="chat-content"
                                        dangerouslySetInnerHTML={{ __html: marked.parse(msg.text) }}
                                    />
                                )}
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-current/20 text-xs opacity-70">
                                        <p className="font-bold mb-1">Sources:</p>
                                        <ul className="list-disc list-inside space-y-0.5">
                                            {msg.sources.map((source, i) => (
                                                <li key={i}><a href={source.uri} target="_blank" rel="noopener noreferrer" className="hover:underline">{source.title}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start mb-3">
                            <div className={`p-3 rounded-xl shadow-md ${themeClasses.cardBg} ${themeClasses.text} border ${themeClasses.border}`}>
                                <div className="flex space-x-1">
                                    <span className="animate-bounce h-2 w-2 bg-red-500 rounded-full"></span>
                                    <span className="animate-bounce h-2 w-2 bg-red-500 rounded-full animation-delay-200"></span>
                                    <span className="animate-bounce h-2 w-2 bg-red-500 rounded-full animation-delay-400"></span>
                                </div>
                            </div>
                        </div>
                    )}

                    {messages.length === 1 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {initialQuickReplies.map((reply, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSend(reply)}
                                    className={`px-3 py-1.5 text-sm rounded-full ${themeClasses.cardBg} border ${themeClasses.border} ${themeClasses.text} hover:bg-red-500/10 transition-colors duration-300 shadow-sm`}
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className={`p-3 border-t ${themeClasses.border} flex`}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => { if (e.key === 'Enter') handleSend(); }}
                        placeholder="Ask me anything..."
                        disabled={isLoading}
                        className={`flex-1 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${themeClasses.mainBg} ${themeClasses.text} transition-colors duration-500`}
                    />
                    <button 
                        onClick={() => handleSend()}
                        disabled={isLoading || !input.trim()}
                        className={`px-4 py-2 rounded-r-lg font-semibold ${themeClasses.button} disabled:opacity-50`}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatWidget;