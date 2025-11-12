
import React from 'react';
import { ThemeClasses } from '../types';

interface PagePlaceholderProps {
    title: string;
    themeClasses: ThemeClasses;
}

const PagePlaceholder: React.FC<PagePlaceholderProps> = ({ title, themeClasses }) => (
    <div className={`min-h-[50vh] flex flex-col items-center justify-center rounded-2xl p-12 text-center ${themeClasses.cardBg} shadow-xl ${themeClasses.border} border transition-colors duration-500`}>
        <h1 className={`text-4xl font-bold mb-4 ${themeClasses.accent}`}>{title}</h1>
        <p className={`text-lg opacity-80 ${themeClasses.text}`}>This page is currently under construction. Please check back later for updates!</p>
    </div>
);

export default PagePlaceholder;
