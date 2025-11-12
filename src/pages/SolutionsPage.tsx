import React, { useState } from 'react';
import { ThemeClasses } from '../types';

const solutionsData = {
    'Public Safety': {
        icon: 'shield-check',
        challenges: ['Rapid response coordination', 'Inter-agency communication', 'Evidence capture and management'],
        solutions: ['Mission-critical TETRA and DMR systems for reliable group calls.', '4G Body Worn Cameras for evidence recording.', 'Mobile radios for in-vehicle command and control.'],
        image: 'https://images.unsplash.com/photo-1631049233499-1aca11e5e016?q=80&w=2070&auto=format&fit=crop'
    },
    'Construction': {
        icon: 'building-office',
        challenges: ['Noisy environments', 'Job site safety', 'Coordination across large areas'],
        solutions: ['Rugged, dustproof, and waterproof DMR radios (IP67/IP68).', 'AI-powered noise cancellation for clear audio.', 'Repeaters to extend coverage across large sites.'],
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
    },
    'Hospitality': {
        icon: 'building-storefront',
        challenges: ['Discreet guest service', 'Instant staff communication', 'Event management'],
        solutions: ['Lightweight, license-free radios with earpieces.', 'PoC (Push-to-talk over Cellular) for wide-area coverage.', 'Sleek designs that blend into a professional environment.'],
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    'Transportation': {
        icon: 'truck',
        challenges: ['Fleet management and tracking', 'Driver safety', 'Regulatory compliance'],
        solutions: ['Mobile DMR radios with GPS for vehicle tracking.', 'PoC solutions for nationwide communication.', 'Emergency features like Lone Worker and Man Down.'],
        image: 'https://images.unsplash.com/photo-1605513220393-8085b19a797c?q=80&w=2070&auto=format&fit=crop'
    },
    'Security': {
        icon: 'lock-closed',
        challenges: ['Immediate threat response', 'Secure and private communication', 'Patrol monitoring'],
        solutions: ['Secure, encrypted digital radios (DMR/TETRA).', 'Guard tour systems for patrol management.', 'Body Worn Cameras for incident documentation.'],
        image: 'https://images.unsplash.com/photo-1559124140-54699507c3b9?q=80&w=1974&auto=format&fit=crop'
    },
    'Manufacturing': {
        icon: 'cog-6-tooth',
        challenges: ['High-noise factory floors', 'Worker safety alarms', 'Productivity enhancement'],
        solutions: ['DMR radios with powerful noise cancellation.', 'Intrinsically safe models for hazardous areas.', 'System integration with factory alarms and sensors.'],
        image: 'https://images.unsplash.com/photo-1621992139339-3179237435f7?q=80&w=2070&auto=format&fit=crop'
    }
};

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const iconMap: { [key: string]: React.ReactElement } = {
        'shield-check': <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.42-.38-2.752-1.057-3.949A11.953 11.953 0 0 1 12 2.75Z" />,
        'building-office': <path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />,
        'building-storefront': <path d="m15.75 10.5 4.72-4.72a.75.75 0 0 0 0-1.06L18.47.28a.75.75 0 0 0-1.06 0L12 5.66l-5.41-5.41a.75.75 0 0 0-1.06 0L.28 1.53a.75.75 0 0 0 0 1.06l4.72 4.72M7.5 14.25 12 18.75m0 0 4.5-4.5M12 18.75v-7.5" />,
        'truck': <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H3.375A1.125 1.125 0 0 0 2.25 5.625v12h-1.5" />,
        'lock-closed': <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />,
        'cog-6-tooth': <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.625a2.25 2.25 0 0 1-2.36 0l-7.5-4.625A2.25 2.25 0 0 1 2.25 6.993V6.75" />,
    };

    return <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>{iconMap[name]}</svg>;
};

const SolutionsPage: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => {
    const industries = Object.keys(solutionsData) as (keyof typeof solutionsData)[];
    const [activeTab, setActiveTab] = useState<keyof typeof solutionsData>(industries[0]);
    const activeSolution = solutionsData[activeTab];

    return (
        <div className={`${themeClasses.text} space-y-12 animate-fade-in-up`}>
            <div className="text-center">
                <h1 className={`text-5xl font-extrabold mb-4 ${themeClasses.accent}`}>Industry Solutions</h1>
                <p className={`text-xl max-w-3xl mx-auto opacity-80`}>
                    Tailored communication solutions designed to meet the unique challenges of your industry.
                </p>
            </div>

            <div className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-xl`}>
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar with Tabs */}
                    <div className="md:w-1/3 border-b md:border-b-0 md:border-r pr-0 md:pr-6 pb-6 md:pb-0 border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-bold mb-4">Select Your Industry</h2>
                        <div className="space-y-2">
                            {industries.map(industry => (
                                <button
                                    key={industry}
                                    onClick={() => setActiveTab(industry)}
                                    className={`w-full text-left flex items-center p-3 rounded-lg font-semibold transition-all duration-200 ${
                                        activeTab === industry 
                                        ? `shadow text-white ${themeClasses.button}`
                                        : `${themeClasses.text} hover:bg-gray-500/10`
                                    }`}
                                >
                                    <Icon name={solutionsData[industry].icon} className="w-5 h-5 mr-3" />
                                    {industry}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="md:w-2/3">
                        {activeSolution && (
                            <div className="animate-fade-in-up">
                                <h2 className={`text-3xl font-bold mb-4 ${themeClasses.accent}`}>{activeTab}</h2>
                                <img src={activeSolution.image} alt={activeTab} className="w-full h-48 object-cover rounded-lg mb-6 shadow-md" />
                                
                                <h3 className="text-xl font-semibold mb-2">Common Challenges</h3>
                                <ul className="list-disc list-inside space-y-1 mb-6 opacity-90">
                                    {activeSolution.challenges.map(challenge => <li key={challenge}>{challenge}</li>)}
                                </ul>

                                <h3 className="text-xl font-semibold mb-2">Our Recommended Solutions</h3>
                                <ul className="list-disc list-inside space-y-1 opacity-90">
                                     {activeSolution.solutions.map(solution => <li key={solution}>{solution}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionsPage;
