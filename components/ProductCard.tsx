import React from 'react';
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
}

const ProductCard: React.FC<ProductCardProps> = ({ name, themeClasses, setCurrentPage, categoryTitle, sectionTitle, subsectionName }) => {
    const productName = name.substring(0, name.lastIndexOf('.'));
    const productId = slugify(productName);
    const imageUrl = getProductImagePath(categoryTitle, sectionTitle, subsectionName, name);
    
    return (
        <div className={`group relative flex flex-col rounded-lg ${themeClasses.cardBg} border ${themeClasses.border} shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
            <a href={`#/product/${productId}`} onClick={(e) => { e.preventDefault(); setCurrentPage(`product/${productId}`); }} className="block p-4">
                <div className="aspect-square w-full overflow-hidden rounded-md">
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
                <h4 className={`text-sm font-semibold flex-grow ${themeClasses.text}`}>{productName}</h4>
                <button 
                    onClick={() => setCurrentPage(`product/${productId}`)}
                    className={`mt-3 w-full px-4 py-2 text-sm rounded-md font-semibold transition-colors duration-300 border ${themeClasses.border} ${themeClasses.text} hover:${themeClasses.accent} hover:border-red-500`}
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ProductCard;