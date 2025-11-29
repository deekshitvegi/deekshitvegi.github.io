
import React, { useState, useEffect, useCallback } from 'react';

interface HeroSlideshowProps {
    setCurrentPage: (path: string) => void;
}

const slides = [
    {
        image: '/assets/hero/slide-1.jpg',
        fallback: 'https://images.unsplash.com/photo-1554672408-730436b60dde?q=80&w=1938&auto=format&fit=crop',
        title: 'Empowering Critical Communications',
        subtitle: 'Discover our industry-leading DMR and TETRA radio systems designed for ultimate reliability.',
        ctaText: 'Explore Two-Way Radios',
        ctaLink: 'products/two-way-radios'
    },
    {
        image: '/assets/hero/slide-2.jpg',
        fallback: 'https://images.unsplash.com/photo-1631049233499-1aca11e5e016?q=80&w=2070&auto=format&fit=crop',
        title: 'Advanced Body Worn Camera Solutions',
        subtitle: 'Capture crucial moments with our rugged, high-definition bodycams for security and law enforcement.',
        ctaText: 'View Bodycams',
        ctaLink: 'products/body-worn-cameras'
    },
    {
        image: '/assets/hero/slide-3.jpg',
        fallback: 'https://images.unsplash.com/photo-1581094486222-260a37c05177?q=80&w=2070&auto=format&fit=crop',
        title: 'Seamless Connectivity with PoC',
        subtitle: 'Experience nationwide Push-to-Talk over Cellular (PoC) for boundless team communication.',
        ctaText: 'Learn About PoC',
        ctaLink: 'products/mcs-poc-solutions'
    }
];

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ setCurrentPage }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        requestAnimationFrame(() => {
            setOffsetY(window.pageYOffset);
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    // Parallax calculation: Move background down at half the speed of scroll
    const parallaxStyle = {
        transform: `translate3d(0, ${offsetY * 0.5}px, 0)`,
        willChange: 'transform',
    };

    return (
        <>
        <style>{`
            @keyframes kenburns {
                0% { transform: scale(1.0); }
                100% { transform: scale(1.1); }
            }
            .kenburns-active {
                animation: kenburns 20s ease-out forwards;
            }
            @keyframes bounce-subtle {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(10px); }
            }
            .animate-bounce-subtle {
                animation: bounce-subtle 2s infinite;
            }
        `}</style>
        
        {/* Main Container: Full viewport height minus header */}
        <div className={`relative w-full h-[calc(100vh-5rem)] overflow-hidden bg-gray-900`}>
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {/* Image Container with Parallax and Ken Burns */}
                    <div 
                        className="absolute inset-0 w-full h-full overflow-hidden"
                    >
                         <div style={parallaxStyle} className="w-full h-full relative -top-[10%]">
                             <img 
                                 src={slide.image}
                                 className={`w-full h-[130%] object-cover origin-center ${index === currentSlide ? 'kenburns-active' : ''}`}
                                 alt={slide.title}
                                 onError={(e) => {
                                     e.currentTarget.src = slide.fallback;
                                 }}
                             />
                         </div>
                    </div>
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-center text-white px-4 pb-20">
                        <div className={`max-w-5xl transition-all duration-1000 transform ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tight [text-shadow:0_4px_15px_rgba(0,0,0,0.8)]">
                                {slide.title}
                            </h1>
                            <p className="text-xl md:text-2xl mb-10 opacity-90 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:0_2px_4px_rgba(0,0,0,0.8)]">
                                {slide.subtitle}
                            </p>
                            <button
                                onClick={() => setCurrentPage(slide.ctaLink)}
                                className={`px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:bg-red-600 bg-red-700 text-white shadow-[0_0_25px_rgba(220,38,38,0.6)] border border-red-500/50`}
                            >
                                {slide.ctaText}
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-24 right-8 flex flex-col space-y-4 z-30 hidden md:flex">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-red-600 scale-125 ring-2 ring-white ring-offset-2 ring-offset-transparent' : 'bg-white/50 hover:bg-white/80'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
            
            {/* Clean Scroll Indicator - Centered */}
            <div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center animate-bounce-subtle opacity-80 hover:opacity-100 transition-opacity cursor-pointer" 
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <span className="text-white text-xs font-bold tracking-widest uppercase mb-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">Scroll Down</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </div>
        </>
    );
};

export default HeroSlideshow;
