import React from 'react';
import { ThemeClasses } from '../types';

interface ValueCardProps {
    icon: string;
    title: string;
    description: string;
    themeClasses: ThemeClasses;
}


const Icon: React.FC<{ name: string, className?: string }> = ({ name, className }) => {
    const iconMap: { [key: string]: React.ReactElement } = {
        'badge-check': <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />,
        'squares-plus': <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15M8.25 9.75h7.5v7.5h-7.5z" />,
        'wrench-screwdriver': <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l2.472-2.472a3.375 3.375 0 000-4.773L6.75 2.25 2.25 6.75l7.727 7.727a3.375 3.375 0 004.774 0z" />,
    };

    return (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            {iconMap[name]}
        </svg>
    );
};

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, themeClasses }) => (
    <div className={`p-6 rounded-2xl ${themeClasses.cardBg} shadow-lg ${themeClasses.border} border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center text-center`}>
        <div className={`flex-shrink-0 bg-red-600 rounded-full p-4 mb-4`}>
            <Icon name={icon} className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-xl font-semibold mb-3 ${themeClasses.text}`}>{title}</h3>
        <p className={`text-sm opacity-80 ${themeClasses.text}`}>{description}</p>
    </div>
);

export default ValueCard;
