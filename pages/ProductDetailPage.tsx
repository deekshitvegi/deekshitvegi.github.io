import React, { useEffect, useState } from 'react';
import { ProductDetails, ThemeClasses } from '../types';
import { getProductDetails } from '../services/productDetailService';
import { slugify } from '../utils/slugify';
import { getProductImagePathById } from '../utils/imagePaths';

interface ProductDetailPageProps {
    productId: string;
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
}

const HighlightIcon: React.FC<{ iconName: string }> = ({ iconName }) => {
    // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    const iconMap: { [key: string]: React.ReactElement } = {
        'speaker-wave': <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5 5 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />,
        'battery-100': <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5v2.25A2.25 2.25 0 006.75 15h10.5a2.25 2.25 0 002.25-2.25V10.5a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 10.5z" />,
        'signal': <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856a8.25 8.25 0 0113.788 0M1.924 8.674a12 12 0 0119.152 0M12 20.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.008z" />,
        'shield-check': <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.42-.38-2.752-1.057-3.949A11.953 11.953 0 0112 2.75z" />,
        'cpu-chip': <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5M19.5 8.25h-1.5m-15 3.75h1.5m15 0h1.5m-15 3.75h1.5m15 0h1.5M12 19.5v1.5m3.75-18v1.5m3.75 3.75h-1.5m-15-3.75h1.5m15 3.75h1.5m-15 3.75h1.5m15 0h1.5" />,
        'hand-raised': <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
        'lock-closed': <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />,
        'wifi': <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 12.728a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM12 12.728a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM15.712 12.728a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75z" />,
        'cube-transparent': <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />,
        'lifebuoy': <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9z" />,
        'device-phone-mobile': <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75A2.25 2.25 0 0015.75 1.5h-2.25m-3.75 0V3m3.75 0V3m-3.75 18v-1.5m3.75 1.5v-1.5m-6.75-12h10.5" />,
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-white">
            {iconMap[iconName] || <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />}
        </svg>
    );
};


const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, themeClasses, setCurrentPage }) => {
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        const details = getProductDetails(productId);
        setProduct(details);
        if(details) {
            const path = getProductImagePathById(details.id);
            setImageUrl(path);
        }
    }, [productId]);

    if (!product) {
        return (
            <div className={`p-8 rounded-lg ${themeClasses.cardBg} text-center`}>
                <h2 className={`text-2xl font-bold ${themeClasses.accent}`}>Product Not Found</h2>
                <p className="mt-2">The product you are looking for does not exist or has been moved.</p>
                <button onClick={() => setCurrentPage('products')} className={`mt-4 ${themeClasses.button} px-4 py-2 rounded-lg`}>
                    Back to Products
                </button>
            </div>
        );
    }
    
    return (
        <div className="space-y-12">
            <button onClick={() => setCurrentPage('products')} className={`text-sm ${themeClasses.accent} hover:underline`}>
                &larr; Back to Products Catalog
            </button>
            
            <section className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border flex flex-col md:flex-row items-center gap-8`}>
                <div className="md:w-1/2">
                    <img src={imageUrl} alt={product.name} className="rounded-lg w-full object-contain max-h-[400px]" 
                         onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = `https://placehold.co/600x600/ccc/999?text=${encodeURIComponent(product.name)}`; }}/>
                </div>
                <div className="md:w-1/2">
                    <h1 className={`text-4xl font-extrabold ${themeClasses.text}`}>{product.name}</h1>
                    <h2 className={`text-2xl font-light mt-1 mb-4 ${themeClasses.accent}`}>{product.tagline}</h2>
                    <p className={`text-sm font-semibold py-1 px-3 inline-block rounded-full ${themeClasses.mainBg} border ${themeClasses.border}`}>{product.classification}</p>
                    <p className="mt-4 text-lg opacity-90">{product.description}</p>
                    <div className="mt-6 flex space-x-4">
                        <button className={`${themeClasses.button} px-6 py-3 rounded-lg font-semibold`}>Get a Quote</button>
                        <button className={`${themeClasses.cardBg} border ${themeClasses.border} px-6 py-3 rounded-lg font-semibold hover:bg-gray-500/10`}>Email Product Details</button>
                    </div>
                </div>
            </section>

            <section>
                 <h2 className={`text-3xl font-bold text-center mb-8 ${themeClasses.accent}`}>Highlights of {product.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {product.highlights.map((highlight) => (
                        <div key={highlight.title} className={`${themeClasses.cardBg} ${themeClasses.border} border p-6 rounded-xl shadow-lg flex items-start space-x-4 transition-all duration-300 hover:-translate-y-1`}>
                           <div className="flex-shrink-0 bg-red-600 rounded-full p-3 flex items-center justify-center">
                                <HighlightIcon iconName={highlight.icon} />
                            </div>
                            <div>
                                <h3 className={`text-lg font-bold ${themeClasses.text}`}>{highlight.title}</h3>
                                <p className="mt-1 opacity-80">{highlight.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border`}>
                 <h2 className={`text-3xl font-bold text-center mb-8 ${themeClasses.accent}`}>Specifications</h2>
                 <div className="max-w-4xl mx-auto">
                    {Object.entries(product.specifications).map(([category, specs]) => (
                        <div key={category} className="mb-6">
                            <h3 className={`text-xl font-semibold mb-3 border-b ${themeClasses.border} pb-2`}>{category}</h3>
                            <table className="w-full text-left">
                                <tbody>
                                    {Object.entries(specs).map(([key, value]) => (
                                         <tr key={key} className={`border-b ${themeClasses.border} last:border-b-0`}>
                                            <td className={`py-2 pr-4 font-medium opacity-90 w-1/3`}>{key}</td>
                                            <td className={`py-2`}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                 </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border`}>
                    <h2 className={`text-2xl font-bold mb-4 ${themeClasses.accent}`}>Accessories</h2>
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Standard</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                            {product.accessories.standard.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-2">Optional</h3>
                        <ul className="list-disc list-inside space-y-1 text-sm opacity-80">
                            {product.accessories.optional.map(item => <li key={item}>{item}</li>)}
                        </ul>
                    </div>
                </div>
                 <div className={`p-8 rounded-2xl ${themeClasses.cardBg} ${themeClasses.border} border`}>
                    <h2 className={`text-2xl font-bold mb-4 ${themeClasses.accent}`}>Related Products</h2>
                    <div className="space-y-4">
                        {product.relatedProducts.map(name => (
                            <a href={`#/product/${slugify(name)}`} onClick={(e) => {e.preventDefault(); setCurrentPage(`product/${slugify(name)}`)}} key={name} className={`block p-3 rounded-lg ${themeClasses.mainBg} hover:shadow-md transition-shadow font-medium`}>
                                {name}
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;