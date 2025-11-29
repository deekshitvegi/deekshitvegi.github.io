
import React, { useState, useEffect, useMemo } from 'react';
import { ThemeClasses, ProductSearchResult } from '../types';
import { searchProducts, getIndex, SortOption } from '../services/searchService';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, themeClasses, setCurrentPage }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ProductSearchResult[]>([]);
    
    // Filter States
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSubsection, setSelectedSubsection] = useState('');
    const [sortOption, setSortOption] = useState<SortOption>('relevance');
    const [showFilters, setShowFilters] = useState(false);

    // Get full index for populating filter dropdowns
    const fullIndex = useMemo(() => getIndex(), [isOpen]);

    // Derived Options for Dropdowns (Cascading)
    const categories = useMemo(() => Array.from(new Set(fullIndex.map(p => p.category))), [fullIndex]);
    
    const sections = useMemo(() => {
        let filtered = fullIndex;
        if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
        return Array.from(new Set(filtered.map(p => p.section)));
    }, [fullIndex, selectedCategory]);

    const subsections = useMemo(() => {
        let filtered = fullIndex;
        if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
        if (selectedSection) filtered = filtered.filter(p => p.section === selectedSection);
        return Array.from(new Set(filtered.map(p => p.subsection)));
    }, [fullIndex, selectedCategory, selectedSection]);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal is closed
            setTimeout(() => {
                setQuery('');
                setResults([]);
                setSelectedCategory('');
                setSelectedSection('');
                setSelectedSubsection('');
                setSortOption('relevance');
                setShowFilters(false);
            }, 300); 
        }
    }, [isOpen]);

    useEffect(() => {
        const handler = setTimeout(() => {
            // Perform search if query exists OR if filters are applied
            const hasFilters = selectedCategory || selectedSection || selectedSubsection;
            
            if (query.length > 1 || hasFilters) {
                setResults(searchProducts(
                    query, 
                    { 
                        category: selectedCategory || undefined,
                        section: selectedSection || undefined,
                        subsection: selectedSubsection || undefined
                    },
                    sortOption
                ));
            } else if (query.length === 0 && !hasFilters) {
                setResults([]);
            }
        }, 200);

        return () => {
            clearTimeout(handler);
        };
    }, [query, selectedCategory, selectedSection, selectedSubsection, sortOption]);

    // Reset child filters when parent filter changes
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedSection('');
        setSelectedSubsection('');
    };

    const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSection(e.target.value);
        setSelectedSubsection('');
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[5vh] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className={`relative w-full max-w-3xl rounded-xl shadow-2xl flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center p-3 border-b-2 border-red-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 mx-3 ${themeClasses.text} opacity-50`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for products..."
                        autoFocus
                        className={`w-full p-2 text-lg bg-transparent focus:outline-none ${themeClasses.text}`}
                    />
                    <button 
                        onClick={() => setShowFilters(!showFilters)}
                        className={`mr-2 p-2 rounded-full hover:bg-gray-500/10 transition-colors ${showFilters ? themeClasses.accent : themeClasses.text}`}
                        title="Toggle Filters"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </button>
                    <button onClick={onClose} className={`p-2 rounded-full hover:bg-gray-500/10 transition-colors ${themeClasses.text}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Filters Section */}
                {showFilters && (
                    <div className={`p-4 border-b ${themeClasses.border} bg-gray-50 dark:bg-slate-800/50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm`}>
                        
                        {/* Category Filter */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold opacity-60 mb-1">Category</label>
                            <select 
                                value={selectedCategory} 
                                onChange={handleCategoryChange}
                                className={`p-2 rounded border ${themeClasses.border} bg-transparent ${themeClasses.text} outline-none`}
                            >
                                <option value="">All Categories</option>
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* Section Filter */}
                        <div className="flex flex-col">
                            <label className="text-xs font-semibold opacity-60 mb-1">Section</label>
                            <select 
                                value={selectedSection} 
                                onChange={handleSectionChange}
                                disabled={!selectedCategory && sections.length === 0}
                                className={`p-2 rounded border ${themeClasses.border} bg-transparent ${themeClasses.text} outline-none opacity-${(!selectedCategory && sections.length === 0) ? '50' : '100'}`}
                            >
                                <option value="">All Sections</option>
                                {sections.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                         {/* Subsection Filter */}
                         <div className="flex flex-col">
                            <label className="text-xs font-semibold opacity-60 mb-1">Subsection</label>
                            <select 
                                value={selectedSubsection} 
                                onChange={(e) => setSelectedSubsection(e.target.value)}
                                className={`p-2 rounded border ${themeClasses.border} bg-transparent ${themeClasses.text} outline-none`}
                            >
                                <option value="">All Subsections</option>
                                {subsections.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                         {/* Sort Filter */}
                         <div className="flex flex-col">
                            <label className="text-xs font-semibold opacity-60 mb-1">Sort By</label>
                            <select 
                                value={sortOption} 
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className={`p-2 rounded border ${themeClasses.border} bg-transparent ${themeClasses.text} outline-none`}
                            >
                                <option value="relevance">Relevance</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {/* Loading / Empty States */}
                    {query.length <= 1 && !selectedCategory && results.length === 0 && (
                        <div className="p-8 text-center opacity-50">
                            Start typing or use filters to find products.
                        </div>
                    )}
                    
                    {(query.length > 1 || selectedCategory) && results.length === 0 && (
                        <div className="p-8 text-center opacity-70">
                            <p>No products found matching your criteria.</p>
                            <button 
                                onClick={() => {
                                    setQuery('');
                                    setSelectedCategory('');
                                    setSelectedSection('');
                                    setSelectedSubsection('');
                                }}
                                className={`mt-2 text-sm ${themeClasses.accent} underline`}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}

                    {/* List */}
                    <ul>
                        {results.map(product => (
                            <li key={product.id}>
                                <a 
                                    href={`#/product/${product.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(`product/${product.id}`);
                                    }}
                                    className={`flex items-center p-4 border-b ${themeClasses.border} hover:bg-gray-500/5 transition-colors group`}
                                >
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name} 
                                        className="w-14 h-14 object-contain rounded-md mr-4 bg-white/5 p-1" 
                                        onError={(e) => { 
                                            const target = e.target as HTMLImageElement; 
                                            target.onerror = null; 
                                            target.src = `https://placehold.co/48x48/e2e8f0/94a3b8?text=IMG`;
                                        }}
                                    />
                                    <div className="flex-grow">
                                        <span className="font-bold block text-lg group-hover:text-red-500 transition-colors">{product.name}</span>
                                        <span className="text-xs opacity-60 block">
                                            {product.category} &rsaquo; {product.section} &rsaquo; {product.subsection}
                                        </span>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Footer Stats */}
                {results.length > 0 && (
                    <div className={`p-2 text-xs text-center opacity-50 border-t ${themeClasses.border}`}>
                        Found {results.length} product{results.length !== 1 && 's'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
