import React, { useState, useEffect } from 'react';
import { ThemeClasses } from '../types';

interface ParallaxHeroProps {
    setCurrentPage: (path: string) => void;
    themeClasses: ThemeClasses;
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({ setCurrentPage, themeClasses }) => {
    const [offsetY, setOffsetY] = useState(0);
    const handleScroll = () => setOffsetY(window.pageYOffset);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const heroStyle = {
        transform: `translateY(${offsetY * 0.4}px)`,
    };

    return (
        <div className="relative h-screen min-h-[600px] max-h-[900px] w-full -mt-20 flex items-center justify-center text-center overflow-hidden rounded-b-3xl shadow-2xl">
            {/* Background Image with Parallax */}
            <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    ...heroStyle,
                    backgroundImage: "url('https://images.unsplash.com/photo-1605206253444-1a0d3d337a1e0?q=80&w=2070&auto=format&fit=crop')",
                }}
            ></div>
            <div className="absolute inset-0 bg-slate-900/60"></div>
            
            {/* Foreground Content */}
            <div className="relative z-10 p-8 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 [text-shadow:0_3px_6px_rgba(0,0,0,0.5)]">
                    Pioneering Communication Solutions
                </h1>
                <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto mb-8 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                    Your trusted partner for mission-critical radio systems and comprehensive security solutions.
                </p>
                <button
                    onClick={() => setCurrentPage('products')}
                    className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 ${themeClasses.button} shadow-lg shadow-red-500/30`}
                >
                    Explore Our Products
                </button>
            </div>
        </div>
    );
};

export default ParallaxHero;