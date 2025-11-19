
import React, { useState, useEffect, useRef } from 'react';
import { ThemeClasses } from '../types';
import { slugify } from '../utils/slugify';
import { getProductImagePath } from '../utils/imagePaths';

interface ProductCardProps {
    name: string;
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
    categoryTitle: string;
    sectionTitle: string;
    subsectionName: string;
    index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, themeClasses, setCurrentPage, categoryTitle, sectionTitle, subsectionName, index = 0 }) => {
    // Fix: Handle names with or without extensions safely
    // If there is no dot, use the name as is. If there is a dot, remove the extension.
    const productName = name.includes('.') ? name.substring(0, name.lastIndexOf('.')) : name;
    const productId = slugify(productName);
    const imageUrl = getProductImagePath(categoryTitle, sectionTitle, subsectionName, name);
    
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    
    return (
        <div 
            ref={cardRef}
            className={`group relative flex flex-col rounded-2xl ${themeClasses.cardBg} border ${themeClasses.border} shadow-sm transition-all duration-700 ease-out 
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${index * 50}ms` }}
        >
            <a 
                href={`#/product/${productId}`} 
                onClick={(e) => { e.preventDefault(); setCurrentPage(`product/${productId}`); }}
                className="block p-4"
            >
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-700/50">
                    <img 
                        src={imageUrl} 
                        alt={productName} 
                        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { 
                            const target = e.target as HTMLImageElement; 
                            target.onerror = null; 
                            target.src = `https://placehold.co/300x300/e2e8f0/94a3b8?text=${encodeURIComponent(productName.split(' ')[0])}`;
                        }}
                    />
                </div>
            </a>
            <div className="flex flex-col flex-grow p-4 pt-0">
                <h4 className={`text-base font-semibold flex-grow text-gray-900 dark:text-white`}>{productName}</h4>
                <button 
                    onClick={() => setCurrentPage(`product/${productId}`)}
                    className={`mt-4 w-full px-4 py-2 text-sm rounded-full font-semibold transition-all duration-300 border border-transparent hover:shadow-lg ${themeClasses.button}`}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
