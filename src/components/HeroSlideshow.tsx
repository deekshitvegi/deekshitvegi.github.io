import React, { useState, useEffect, useCallback } from 'react';
import { ThemeClasses } from '../types';

interface HeroSlideshowProps {
    setCurrentPage: (path: string) => void;
    themeClasses: ThemeClasses;
}

const slides = [
    {
        image: 'https://images.unsplash.com/photo-1554672408-730436b60dde?q=80&w=1938&auto=format&fit=crop',
        title: 'Empowering Critical Communications',
        subtitle: 'Discover our industry-leading DMR and TETRA radio systems designed for ultimate reliability.',
        ctaText: 'Explore Two-Way Radios',
        ctaLink: 'products/two-way-radios'
    },
    {
        image: 'https://images.unsplash.com/photo-1631049233499-1aca11e5e016?q=80&w=2070&auto=format&fit=crop',
        title: 'Advanced Body Worn Camera Solutions',
        subtitle: 'Capture crucial moments with our rugged, high-definition bodycams for security and law enforcement.',
        ctaText: 'View Bodycams',
        ctaLink: 'products/body-worn-cameras'
    },
    {
        image: 'https://images.unsplash.com/photo-1581094486222-260a37c05177?q=80&w=2070&auto=format&fit=crop',
        title: 'Seamless Connectivity with PoC',
        subtitle: 'Experience nationwide Push-to-Talk over Cellular (PoC) for boundless team communication.',
        ctaText: 'Learn About PoC',
        ctaLink: 'products/mcs-poc-solutions'
    }
];

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ setCurrentPage, themeClasses }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 7000); 

        return () => clearInterval(timer);
    }, [nextSlide]);
    
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    return (
        <>
        <style>{`
            @keyframes kenburns {
                0% {
                    transform: scale(1.1) translate(0, 0);
                }
                100% {
                    transform: scale(1) translate(2%, -2%);
                }
            }
            .kenburns-active {
                animation: kenburns 15s ease-out forwards;
            }
        `}</style>
        <div className={`relative w-full h-[65vh] min-h-[500px] max-h-[700px] overflow-hidden shadow-xl -mt-20`}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div className="absolute inset-0 overflow-hidden">
                         <div 
                             className={`w-full h-full bg-cover bg-center ${index === currentSlide ? 'kenburns-active' : ''}`}
                             style={{ backgroundImage: `url(${slide.image})` }}
                         />
                    </div>
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center text-center text-white p-4">
                        {index === currentSlide && (
                             <div className="max-w-3xl animate-fade-in-up">
                                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl mb-8 opacity-90 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                                    {slide.subtitle}
                                </p>
                                <button
                                    onClick={() => setCurrentPage(slide.ctaLink)}
                                    className={`px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 ${themeClasses.button} shadow-lg`}
                                >
                                    {slide.ctaText}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
        </>
    );
};

export default HeroSlideshow;
