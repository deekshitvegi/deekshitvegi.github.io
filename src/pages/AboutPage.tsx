
import React from 'react';
import { ThemeClasses } from '../types';

const AboutPage: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => {
    const coreValues = [
        { title: 'Reliability', description: 'We deliver solutions that our clients can depend on, especially in mission-critical situations.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> },
        { title: 'Innovation', description: 'We continuously seek and adopt the latest technologies to provide cutting-edge solutions.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /> },
        { title: 'Customer Focus', description: 'Our clients are at the heart of everything we do. We strive to exceed their expectations.', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /> }
    ];

    return (
        <div className="space-y-16 animate-fade-in-up">
            <div className="text-center">
                <h1 className={`text-5xl font-extrabold mb-4 ${themeClasses.accent}`}>About VKT Services</h1>
                <p className={`text-xl max-w-3xl mx-auto opacity-80`}>
                    Your trusted partner in professional communication and security solutions since 2008.
                </p>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-start p-8 rounded-2xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-xl`}>
                <div className="lg:col-span-3">
                    <h2 className={`text-3xl font-bold mb-4`}>Our Story</h2>
                    <p className="text-lg opacity-90 leading-relaxed mb-4">
                        VKT Services Private Limited is a wholesale trader and service provider based in Secunderabad, specializing in two-way radios, radio repeaters, and other security and communication equipment like CCTV cameras, biometric systems, and X-ray baggage scanners.
                    </p>
                     <p className="opacity-80 leading-relaxed">
                        Established in 2008, our journey began with a commitment to providing reliable communication tools. Over the years, we have grown into a comprehensive service provider, offering expert installation and maintenance for our entire product range. Our partnership with industry leaders like Hytera ensures we deliver nothing but the best.
                    </p>
                </div>
                <div className={`lg:col-span-2 space-y-6 ${themeClasses.mainBg} p-6 rounded-lg border ${themeClasses.border}`}>
                     <div>
                        <h3 className={`text-xl font-bold mb-2 ${themeClasses.accent}`}>Our Mission</h3>
                        <p className="opacity-90">To empower our clients with reliable, innovative, and seamless communication and security solutions that enhance safety and operational efficiency.</p>
                    </div>
                     <div>
                        <h3 className={`text-xl font-bold mb-2 ${themeClasses.accent}`}>Our Vision</h3>
                        <p className="opacity-90">To be the most trusted and sought-after provider of integrated communication and security technologies in the region.</p>
                    </div>
                </div>
            </div>
            
            <section>
                 <h2 className={`text-3xl font-bold text-center mb-10 ${themeClasses.accent}`}>Our Core Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {coreValues.map(value => (
                         <div key={value.title} className={`p-6 rounded-2xl ${themeClasses.cardBg} shadow-lg ${themeClasses.border} border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col items-center text-center`}>
                            <div className={`flex-shrink-0 ${themeClasses.button} rounded-full p-4 mb-4 shadow-lg`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
                                    {value.icon}
                                </svg>
                            </div>
                            <h3 className={`text-xl font-semibold mb-2 ${themeClasses.text}`}>{value.title}</h3>
                            <p className="text-sm opacity-80">{value.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`p-8 md:p-12 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border shadow-xl flex flex-col md:flex-row items-center gap-8`}>
                <div className="md:w-1/3 text-center">
                     <img 
                         src="/assets/about/ceo-profile.jpg" 
                         onError={(e) => e.currentTarget.src = 'https://i.pravatar.cc/300?u=vknv'}
                         alt="Venkata Krishnam Naidu Vegi" 
                         className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-red-500/50 object-cover" 
                    />
                     <h3 className={`text-2xl font-bold ${themeClasses.text}`}>Venkata Krishnam Naidu Vegi</h3>
                     <p className={`text-md ${themeClasses.accent} font-semibold`}>CEO & Founder</p>
                </div>
                <div className="md:w-2/3">
                    <p className="text-2xl font-light italic leading-relaxed opacity-90">
                        "Since our inception in 2008, our mission has been simple: to provide robust, reliable, and innovative solutions that empower our clients to communicate effectively and operate securely. Our commitment to excellence is the foundation of every partnership we build."
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
