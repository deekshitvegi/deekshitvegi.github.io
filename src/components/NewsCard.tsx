import React from 'react';
import { ThemeClasses } from '../types';

interface NewsCardProps {
    title: string;
    date: string;
    summary: string;
    themeClasses: ThemeClasses;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, date, summary, themeClasses }) => (
    <div className={`p-6 rounded-2xl ${themeClasses.cardBg} shadow-lg ${themeClasses.border} border transition-all duration-300 hover:shadow-2xl`}>
        <h3 className={`text-xl font-semibold mb-2 ${themeClasses.text}`}>{title}</h3>
        <p className={`text-sm opacity-60 mb-3 ${themeClasses.text}`}>{date}</p>
        <p className={`text-md opacity-80 mb-4 ${themeClasses.text}`}>{summary}</p>
        <a href="#" className={`text-sm font-semibold ${themeClasses.accent} hover:underline`}>Read More &rarr;</a>
    </div>
);

export default NewsCard;
