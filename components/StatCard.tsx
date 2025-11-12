
import React from 'react';
import { ThemeClasses } from '../types';

interface StatCardProps {
    number: string;
    label: string;
    themeClasses: ThemeClasses;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, themeClasses }) => (
    <div className={`p-6 rounded-2xl ${themeClasses.cardBg} shadow-lg ${themeClasses.border} border transition-all duration-300 hover:-translate-y-1`}>
        <p className={`text-5xl font-extrabold mb-2 ${themeClasses.accent}`}>{number}</p>
        <p className={`text-lg font-medium opacity-90 ${themeClasses.text}`}>{label}</p>
    </div>
);

export default StatCard;
