
import React, { useState } from 'react';
import { navItems } from '../constants';
import { NavItem, ThemeClasses } from '../types';

interface MobileNavItemProps {
    item: NavItem;
    themeClasses: ThemeClasses;
    onSelect: (path: string) => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ item, themeClasses, onSelect }) => {
    const [isSubOpen, setIsSubOpen] = useState(false);
    const hoverClass = `hover:${themeClasses.accent}`;

    const handleClick = (e: React.MouseEvent) => {
        if (item.subItems.length > 0) {
            e.preventDefault();
            setIsSubOpen(!isSubOpen);
        } else {
            onSelect(item.path);
        }
    };

    return (
        <div>
            <a
                href={`#${item.path}`}
                onClick={handleClick}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${themeClasses.text} ${hoverClass} hover:bg-opacity-10`}
            >
                <span className="flex justify-between items-center">
                    {item.name}
                    {item.subItems.length > 0 && (
                        <svg className={`ml-1 w-4 h-4 transition-transform duration-300 ${isSubOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    )}
                </span>
            </a>
            {item.subItems.length > 0 && (
                <div className={`ml-4 mt-1 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${isSubOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.subItems.map(subItem => (
                        <a
                            key={subItem.path}
                            href={`#${subItem.path}`}
                            onClick={() => onSelect(subItem.path)}
                            className={`block pl-6 pr-3 py-2 rounded-md text-sm font-medium ${themeClasses.text} ${hoverClass} hover:bg-opacity-10`}
                        >
                            {subItem.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};


interface MobileNavProps {
    isOpen: boolean;
    themeClasses: ThemeClasses;
    onSelect: (path: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, themeClasses, onSelect }) => {
    return (
        <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${themeClasses.cardBg} border-t ${themeClasses.border} ${isOpen ? 'max-h-screen opacity-100 py-2' : 'max-h-0 opacity-0'}`}>
            <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map(item => (
                    <MobileNavItem
                        key={item.path}
                        item={item}
                        themeClasses={themeClasses}
                        onSelect={onSelect}
                    />
                ))}
            </nav>
        </div>
    );
};

export default MobileNav;
