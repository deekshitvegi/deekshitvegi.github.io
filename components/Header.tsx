import React, { useState } from 'react';
import { navItems } from '../constants';
import { Theme, ThemeClasses } from '../types';
import NavDropdown from './NavDropdown';
import MobileNav from './MobileNav';

interface HeaderProps {
    theme: Theme;
    themeClasses: ThemeClasses;
    toggleTheme: () => void;
    setCurrentPage: (path: string) => void;
    currentPage: string;
}

const Logo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <img
            src="./vkt-logo.jpg"
            alt="VKT Services Logo"
            className={className}
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/40x40/991b1b/FFFFFF?text=VKT";
            }}
        />
    );
};

const Header: React.FC<HeaderProps> = ({ theme, themeClasses, toggleTheme, setCurrentPage, currentPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className={`sticky top-0 z-50 shadow-md ${themeClasses.cardBg} ${themeClasses.border} border-b transition-colors duration-500`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <a href="#home" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className="flex-shrink-0 flex items-center cursor-pointer">
                            <Logo className="w-10 h-10 mr-3 rounded-full" />
                            <span className={`text-2xl font-bold tracking-wider ${themeClasses.accent}`}>VKT SERVICES</span>
                        </a>

                        <nav className="hidden lg:flex lg:space-x-2 items-center h-full">
                            {navItems.map(item => (
                                <NavDropdown key={item.path} item={item} theme={theme} themeClasses={themeClasses} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                            ))}
                            <a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }} className={`ml-4 flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${themeClasses.text} hover:bg-gray-500/10`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.256 6.256l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                Contact Us
                            </a>
                            <button
                                onClick={toggleTheme}
                                className={`ml-2 p-2 rounded-full transition-colors duration-300 ${themeClasses.text} hover:bg-gray-500/20`}
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                )}
                            </button>
                        </nav>

                        <div className="flex lg:hidden items-center space-x-2">
                             <button
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-colors duration-300 ${themeClasses.text} hover:bg-gray-500/20`}
                                aria-label="Toggle theme"
                            >
                                {theme === 'light' ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                )}
                            </button>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-lg ${themeClasses.text} hover:bg-gray-500/20 transition-colors duration-200`}
                                aria-label="Toggle mobile menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <MobileNav isOpen={isMobileMenuOpen} themeClasses={themeClasses} onSelect={(path) => { setCurrentPage(path); setIsMobileMenuOpen(false); }} />
            </header>
        </>
    );
};

export default Header;