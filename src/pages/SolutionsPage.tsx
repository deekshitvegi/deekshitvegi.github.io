
import React, { useState } from 'react';
import { ThemeClasses } from '../types';

const solutionsData = {
    'Public Safety': {
        icon: 'shield-check',
        challenges: ['Rapid response coordination', 'Inter-agency communication', 'Evidence capture and management'],
        solutions: ['Mission-critical TETRA and DMR systems for reliable group calls.', '4G Body Worn Cameras for evidence recording.', 'Mobile radios for in-vehicle command and control.'],
        image: '/assets/solutions/public-safety.jpg',
        fallback: 'https://images.unsplash.com/photo-1631049233499-1aca11e5e016?q=80&w=2070&auto=format&fit=crop'
    },
    'Construction': {
        icon: 'building-office',
        challenges: ['Noisy environments', 'Job site safety', 'Coordination across large areas'],
        solutions: ['Rugged, dustproof, and waterproof DMR radios (IP67/IP68).', 'AI-powered noise cancellation for clear audio.', 'Repeaters to extend coverage across large sites.'],
        image: '/assets/solutions/construction.jpg',
        fallback: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'
    },
    'Hospitality': {
        icon: 'star', 
        challenges: ['Discreet guest service', 'Instant staff communication', 'Event management'],
        solutions: ['Lightweight, license-free radios with earpieces.', 'PoC (Push-to-talk over Cellular) for wide-area coverage.', 'Sleek designs that blend into a professional environment.'],
        image: '/assets/solutions/hospitality.jpg',
        fallback: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
    },
    'Transportation': {
        icon: 'map-pin', 
        challenges: ['Fleet management and tracking', 'Driver safety', 'Regulatory compliance'],
        solutions: ['Mobile DMR radios with GPS for vehicle tracking.', 'PoC solutions for nationwide communication.', 'Emergency features like Lone Worker and Man Down.'],
        image: '/assets/solutions/transportation.jpg',
        fallback: 'https://images.unsplash.com/photo-1605513220393-8085b19a797c?q=80&w=2070&auto=format&fit=crop'
    },
    'Security': {
        icon: 'lock-closed',
        challenges: ['Immediate threat response', 'Secure and private communication', 'Patrol monitoring'],
        solutions: ['Secure, encrypted digital radios (DMR/TETRA).', 'Guard tour systems for patrol management.', 'Body Worn Cameras for incident documentation.'],
        image: '/assets/solutions/security.jpg',
        fallback: 'https://images.unsplash.com/photo-1559124140-54699507c3b9?q=80&w=1974&auto=format&fit=crop'
    },
    'Manufacturing': {
        icon: 'cog', 
        challenges: ['High-noise factory floors', 'Worker safety alarms', 'Productivity enhancement'],
        solutions: ['DMR radios with powerful noise cancellation.', 'Intrinsically safe models for hazardous areas.', 'System integration with factory alarms and sensors.'],
        image: '/assets/solutions/manufacturing.jpg',
        fallback: 'https://images.unsplash.com/photo-1621992139339-3179237435f7?q=80&w=2070&auto=format&fit=crop'
    }
};

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const iconMap: { [key: string]: React.ReactElement } = {
        'shield-check': <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />,
        'building-office': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5M12 6.75h1.5M15 6.75h1.5M9 10.5h1.5M12 10.5h1.5M15 10.5h1.5M9 14.25h1.5M12 14.25h1.5M15 14.25h1.5M9 18h1.5M12 18h1.5M15 18h1.5" />,
        'star': <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.545.044.77.77.326 1.163l-4.304 3.86a.562.562 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.304-3.86a.562.562 0 01.326-1.163l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
        'map-pin': <><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></>,
        'lock-closed': <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
        'cog': <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.172 1.035c.136.823.866 1.32 1.658 1.092l1.008-.293c.53-.153 1.105.083 1.316.59l.45 1.08c.212.508-.046 1.093-.558 1.32l-1.032.454c-.746.33-.975 1.238-.523 1.89l.662.957c.316.456.233 1.075-.196 1.43l-.814.678c-.422.35-1.048.305-1.412-.105l-.662-.75c-.58-.657-1.593-.657-2.172 0l-.663.75c-.363.41-.99.455-1.41.105l-.816-.678c-.428-.355-.511-.974-.195-1.43l.662-.957c.452-.652.223-1.56-.523-1.89l-1.032-.454c-.512-.227-.77-.812-.558-1.32l.45-1.08c.21-.507.786-.743 1.316-.59l1.008.293c.792.228 1.522-.27 1.658-1.092l.172-1.035zM12 10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />,
    };

    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>{iconMap[name]}</svg>;
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
                                <img 
                                    src={activeSolution.image} 
                                    onError={(e) => e.currentTarget.src = activeSolution.fallback}
                                    alt={activeTab} 
                                    className="w-full h-48 object-cover rounded-lg mb-6 shadow-md" 
                                />
                                
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
