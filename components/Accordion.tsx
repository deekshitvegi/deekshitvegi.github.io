
import React, { useState } from 'react';
import { ThemeClasses } from '../types';

interface AccordionProps {
    question: string;
    answer: string;
    themeClasses: ThemeClasses;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer, themeClasses }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`border ${themeClasses.border} rounded-lg mb-4 transition-colors duration-500`}>
            <button
                className={`flex justify-between items-center w-full p-5 text-left font-semibold ${themeClasses.text} ${themeClasses.cardBg} rounded-lg transition-colors duration-500 hover:bg-gray-500/10`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {question}
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
            </button>
            <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${themeClasses.mainBg} ${themeClasses.text} rounded-b-lg ${isOpen ? 'max-h-96 opacity-100 p-5 border-t ' + themeClasses.border : 'max-h-0 opacity-0'}`}
            >
                {answer}
            </div>
        </div>
    );
};

export default Accordion;
