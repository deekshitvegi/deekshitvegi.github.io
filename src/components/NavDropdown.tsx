import React, { useState } from 'react';
import { NavItem, ThemeClasses } from '../types';
import ProductsMegaMenu from './ProductsMegaMenu';

interface NavDropdownProps {
    item: NavItem;
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
    currentPage: string;
    openSearch: () => void;
}

const NavDropdown: React.FC<NavDropdownProps> = ({ item, themeClasses, setCurrentPage, currentPage, openSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const isProducts = item.name === 'Products';
    const isActive = item.path === currentPage || item.subItems.some(sub => sub.path === currentPage);

    return (
        <div 
            className="relative group h-full flex items-center" 
            onMouseEnter={() => setIsOpen(true)} 
            onMouseLeave={() => setIsOpen(false)}
        >
            <a 
                href={`#${item.path}`}
                onClick={(e) => {
                    e.preventDefault(); 
                    setCurrentPage(item.path);
                }}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 focus:outline-none flex items-center h-full ${
                    isActive
                        ? `${themeClasses.accent}`
                        : `${themeClasses.text} opacity-80 hover:${themeClasses.accent} hover:opacity-100`
                }`}
            >
                {item.name}
                {item.subItems.length > 0 && (
                    <svg className={`ml-1 w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                )}
            </a>
            
            {isProducts && isOpen && (
                <ProductsMegaMenu themeClasses={themeClasses} setCurrentPage={setCurrentPage} openSearch={openSearch} />
            )}

            {item.subItems.length > 0 && !isProducts && (
                <div 
                    className={`absolute z-10 top-full mt-0 rounded-b-lg ${themeClasses.cardBg} shadow-xl transition-all duration-300 transform origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}
                    style={{ minWidth: '12rem' }}
                >
                    {item.subItems.map(subItem => (
                        <a 
                            key={subItem.path} 
                            href={`#${subItem.path}`}
                            onClick={(e) => { e.preventDefault(); setCurrentPage(subItem.path); }}
                            className={`block px-4 py-3 text-sm transition-colors duration-200 ${themeClasses.text} hover:bg-gray-500/10 hover:${themeClasses.accent}`}
                        >
                            {subItem.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NavDropdown;