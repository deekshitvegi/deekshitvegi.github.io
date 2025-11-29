import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThemeClasses, ChatMessage } from '../types';
import { startChat, findProductBrochure, navigateToProductPage } from '../services/geminiService';
import type { Chat, FunctionCall, Part } from '@google/genai';

declare const marked: any;

interface AIChatWidgetProps {
    themeClasses: ThemeClasses;
    navigate: (path: string) => void;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ themeClasses, navigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { sender: 'bot', text: "Hello! I can help you find products, get brochures, or answer questions. How can I assist?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const chatSession = useRef<Chat | null>(null);

    useEffect(() => {
        if (isOpen && !chatSession.current) {
            chatSession.current = startChat();
            if (!chatSession.current) {
                 setMessages(prev => [...prev, { sender: 'bot', text: "Error: Could not initialize the AI chat session. The API key might be missing or invalid." }]);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = useCallback(async (query?: string) => {
        const userQuery = query || input;
        if (!userQuery.trim() || isLoading || !chatSession.current) return;

        setMessages(prev => [...prev, { sender: 'user', text: userQuery.trim() }]);
        setInput('');
        setIsLoading(true);

        try {
            let response = await chatSession.current.sendMessage({ message: userQuery });
            
            while (response.functionCalls && response.functionCalls.length > 0) {
                const functionCalls: FunctionCall[] = response.functionCalls;
                const functionResponses: Part[] = [];

                for (const funcCall of functionCalls) {
                    let functionResult: any = { error: "Unknown function" };
                    if (funcCall.name === 'find_product_brochure' && funcCall.args) {
                        const { productName } = funcCall.args;
                        functionResult = findProductBrochure(productName as string);
                    } else if (funcCall.name === 'navigate_to_product_page' && funcCall.args) {
                        const { productOrCategoryName } = funcCall.args;
                        functionResult = navigateToProductPage(productOrCategoryName as string);
                        if (functionResult.path) {
                            // Execute navigation immediately
                            navigate(functionResult.path);
                        }
                    }

                    functionResponses.push({
                        functionResponse: {
                            name: funcCall.name,
                            response: functionResult,
                        }
                    });
                }

                // Send the function responses back to the model
                response = await chatSession.current.sendMessage({ message: functionResponses });
            }

            // The final response after all function calls are handled
            const text = response.text ?? "I'm not sure how to respond to that. Can you try rephrasing?";
            setMessages(prev => [...prev, { sender: 'bot', text }]);

        } catch (error) {
            console.error("Error in chat session:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: "I apologize, but an error occurred. Please try again." }]);
        } finally {
            setIsLoading(false);
        }

    }, [input, isLoading, navigate]);

    const initialQuickReplies = [
        "Show me TETRA Systems",
        "Get a brochure for the HP788",
        "Take me to the Motorola R7 page",
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
                                        dangerouslySetInnerHTML={{ __html: typeof marked !== 'undefined' ? marked.parse(msg.text) : msg.text }}
                                    />
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

                    {messages.length === 1 && !isLoading && (
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