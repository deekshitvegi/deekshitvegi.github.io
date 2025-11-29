
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
        // Clean upright Shield
        'shield-check': (
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        ),
        // Clean upright 2x2 Grid
        'squares-2x2': (
             <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        ),
        // Clean upright Gear
        'cog': (
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.172 1.035c.136.823.866 1.32 1.658 1.092l1.008-.293c.53-.153 1.105.083 1.316.59l.45 1.08c.212.508-.046 1.093-.558 1.32l-1.032.454c-.746.33-.975 1.238-.523 1.89l.662.957c.316.456.233 1.075-.196 1.43l-.814.678c-.422.35-1.048.305-1.412-.105l-.662-.75c-.58-.657-1.593-.657-2.172 0l-.663.75c-.363.41-.99.455-1.41.105l-.816-.678c-.428-.355-.511-.974-.195-1.43l.662-.957c.452-.652.223-1.56-.523-1.89l-1.032-.454c-.512-.227-.77-.812-.558-1.32l.45-1.08c.21-.507.786-.743 1.316-.59l1.008.293c.792.228 1.522-.27 1.658-1.092l.172-1.035zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
        ),
    };

    return (
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
            {iconMap[name] || iconMap['shield-check']}
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
