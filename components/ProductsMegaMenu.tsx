import React, { useState } from 'react';
import { productsData } from '../constants';
import { Theme, ThemeClasses } from '../types';
import { slugify } from '../utils/slugify';

interface ProductsMegaMenuProps {
    theme: Theme;
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
}

const ProductsMegaMenu: React.FC<ProductsMegaMenuProps> = ({ theme, themeClasses, setCurrentPage }) => {
    const [activeTab, setActiveTab] = useState(Object.keys(productsData)[0]);
    const categoryData = productsData[activeTab];
    const categorySlug = slugify(activeTab);

    if (!categoryData) return null;
    
    const activeTabClass = `${themeClasses.accent} font-bold bg-red-500/10 dark:bg-red-500/5`;
    const inactiveTabClass = `hover:bg-gray-500/10 transition-colors duration-200`;

    return (
        <div 
            className={`absolute z-20 w-[900px] max-w-[95vw] left-1/2 -translate-x-1/2 top-full mt-0 p-6 rounded-b-lg shadow-2xl ${themeClasses.cardBg} ${themeClasses.text} transition-all duration-300 border-x border-b ${themeClasses.border}`}
        >
            <div className="flex" style={{ minHeight: '350px' }}>
                {/* Left Side: Main Category Tabs */}
                <div className={`w-1/4 pr-4 border-r ${themeClasses.border} flex flex-col`}>
                    {Object.keys(productsData).map(tabName => (
                        <div 
                            key={tabName}
                            onMouseEnter={() => setActiveTab(tabName)}
                            className={`cursor-pointer px-4 py-3 text-base font-medium rounded-lg mb-1 
                                        ${tabName === activeTab ? activeTabClass : inactiveTabClass} 
                                        ${themeClasses.text}`}
                        >
                            {tabName}
                        </div>
                    ))}
                </div>

                {/* Right Side: Content */}
                <div className="w-3/4 pl-6 flex flex-col">
                    <div className="flex-grow overflow-y-auto max-h-[400px] custom-scrollbar">
                         <h3 className={`text-xl font-bold mb-4 ${themeClasses.accent}`}>{activeTab} <span className="opacity-50">&rsaquo;</span></h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {categoryData.sections.map((section) => {
                                const sectionSlug = slugify(section.title);
                                const path = `products/${categorySlug}/${sectionSlug}`;
                                return (
                                    <a key={section.title} href={`#${path}`} onClick={(e) => { e.preventDefault(); setCurrentPage(path); }} 
                                       className={`group flex items-center p-3 rounded-lg hover:bg-gray-500/5 transition-colors`}>
                                        <img src={section.image || `https://placehold.co/80x80`} alt={section.title} className="w-16 h-16 object-contain rounded-md mr-4 bg-white/5 border border-black/5" />
                                        <h4 className={`text-base font-semibold ${themeClasses.text} group-hover:${themeClasses.accent} transition-colors`}>{section.title}</h4>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Footer Links */}
                    <div className={`border-t ${themeClasses.border} mt-4 pt-4 flex space-x-4`}>
                         <a href={`#products/${categorySlug}`} onClick={(e) => { e.preventDefault(); setCurrentPage(`products/${categorySlug}`); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${themeClasses.button}`}>
                            All Products
                        </a>
                         <a href="#search-accessories" onClick={(e) => { e.preventDefault(); setCurrentPage('search-accessories'); }} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${themeClasses.cardBg} border ${themeClasses.border} hover:bg-gray-500/10`}>
                            Search Accessories
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsMegaMenu;