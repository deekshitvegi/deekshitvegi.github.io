import React, { useState, useEffect } from 'react';
import { ThemeClasses, ProductSearchResult } from '../types';
import { searchProducts } from '../services/searchService';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, themeClasses, setCurrentPage }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<ProductSearchResult[]>([]);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal is closed
            setTimeout(() => {
                setQuery('');
                setResults([]);
            }, 300); // Delay to allow for closing animation
        }
    }, [isOpen]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (query.length > 1) {
                setResults(searchProducts(query));
            } else {
                setResults([]);
            }
        }, 200); // Debounce search input

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                className={`relative w-full max-w-2xl rounded-xl shadow-2xl flex flex-col ${themeClasses.cardBg} border ${themeClasses.border}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Input */}
                <div className="flex items-center p-2 border-b-2 border-red-500/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 mx-3 ${themeClasses.text} opacity-50`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for any product or accessory..."
                        autoFocus
                        className={`w-full p-2 text-lg bg-transparent focus:outline-none ${themeClasses.text}`}
                    />
                    <button onClick={onClose} className={`p-2 rounded-full hover:bg-gray-500/10 transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                    {query.length > 1 && results.length === 0 && (
                        <div className="p-8 text-center opacity-70">
                            <p>No products found for "{query}".</p>
                            <p className="text-sm mt-1">Try a different search term.</p>
                        </div>
                    )}
                    <ul>
                        {results.map(product => (
                            <li key={product.id}>
                                <a 
                                    href={`#/product/${product.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(`product/${product.id}`);
                                    }}
                                    className={`flex items-center p-4 border-b ${themeClasses.border} hover:bg-gray-500/5 transition-colors`}
                                >
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name} 
                                        className="w-12 h-12 object-contain rounded-md mr-4 bg-white/5" 
                                        onError={(e) => { 
                                            const target = e.target as HTMLImageElement; 
                                            target.onerror = null; 
                                            target.src = `https://placehold.co/48x48/e2e8f0/94a3b8?text=VKT`;
                                        }}
                                    />
                                    <span className="font-semibold">{product.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;