
import React from 'react';
import { ThemeClasses } from '../types';
import ValueCard from '../components/ValueCard';
import StatCard from '../components/StatCard';
import NewsCard from '../components/NewsCard';

interface HomePageProps {
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ themeClasses, setCurrentPage }) => {
    const yearsOfExperience = new Date().getFullYear() - 2008;

    return (
        <div className={`${themeClasses.text} space-y-16 lg:space-y-24 transition-colors duration-500`}>
             <section>
                <h2 className={`text-3xl font-bold text-center mb-10 ${themeClasses.accent}`}>Why Choose VKT Services?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ValueCard icon="shield-check" title="Authorized Hytera Partner" description="Access the full range of cutting-edge Hytera two-way radio and digital communication devices with full warranty support." themeClasses={themeClasses} />
                    <ValueCard icon="squares-2x2" title="Diverse Product Portfolio" description="Beyond Hytera, we offer bespoke communication tools and specialized equipment from other leading brands to meet unique client needs." themeClasses={themeClasses} />
                    <ValueCard icon="cog" title="Installation & Maintenance" description="From initial system design and installation to long-term maintenance and repair services, our experts ensure peak performance." themeClasses={themeClasses} />
                </div>
            </section>

            <section className={`rounded-3xl p-8 md:p-12 shadow-lg ${themeClasses.cardBg} ${themeClasses.border} border transition-colors duration-500`}>
                <div className="md:flex md:items-center md:space-x-12">
                    <div className="md:w-1/2 mb-6 md:mb-0">
                        <h2 className={`text-3xl font-bold mb-4 ${themeClasses.accent}`}>About VKT Services</h2>
                        <p className="text-lg opacity-90 mb-4">
                            VKT Services has been at the forefront of providing reliable and innovative communication solutions for over a decade. Our commitment to excellence, deep industry knowledge, and a customer-first approach set us apart.
                        </p>
                        <button onClick={() => setCurrentPage('about')} className={`mt-6 px-6 py-3 rounded-full text-md font-semibold transition-all duration-300 transform hover:scale-105 ${themeClasses.button} shadow-lg`}>
                            Learn More About Us
                        </button>
                    </div>
                    <div className="md:w-1/2">
                        <img 
                            src="/assets/home/about-overview.jpg" 
                            onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop'}
                            alt="Team meeting" 
                            className="h-64 w-full rounded-2xl object-cover" 
                        />
                    </div>
                </div>
            </section>

            <section>
                <h2 className={`text-3xl font-bold text-center mb-10 ${themeClasses.accent}`}>Our Impact, By The Numbers</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <StatCard number={`${yearsOfExperience}+`} label="Years of Experience" themeClasses={themeClasses} />
                    <StatCard number="500+" label="Satisfied Clients" themeClasses={themeClasses} />
                    <StatCard number="1000+" label="Projects Completed" themeClasses={themeClasses} />
                    <StatCard number="50+" label="Certified Professionals" themeClasses={themeClasses} />
                </div>
            </section>

            <section className={`rounded-3xl p-8 md:p-12 shadow-lg ${themeClasses.cardBg} ${themeClasses.border} border transition-colors duration-500`}>
                <h2 className={`text-3xl font-bold mb-6 text-center ${themeClasses.accent}`}>What's New at VKT Services?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <NewsCard title="New Hytera PT590 TETRA Radio Launched!" date="October 26, 2023" summary="Explore the next generation of mission-critical communication with the robust Hytera PT590, now available." themeClasses={themeClasses} />
                    <NewsCard title="Expanding Our Service Network" date="September 15, 2023" summary="VKT Services proudly announces the expansion of our technical support and installation network to new regions." themeClasses={themeClasses} />
                </div>
            </section>
        </div>
    );
};

export default HomePage;
