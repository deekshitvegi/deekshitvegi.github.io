import React, { useState, useEffect } from 'react';
import { ThemeClasses } from '../types';
import Accordion from '../components/Accordion';
import ProductCard from '../components/ProductCard';
import { findCategoryBySlug } from '../utils/productDataUtils';
import { slugify } from '../utils/slugify';

interface ProductsPageProps {
    themeClasses: ThemeClasses;
    setCurrentPage: (path: string) => void;
    categorySlug?: string;
    initialTabSlug?: string;
}

const FAQSection: React.FC<{ themeClasses: ThemeClasses }> = ({ themeClasses }) => {
    const faqs = [
        { question: "What is a two-way radio?", answer: "A two-way radio, or transceiver, is a radio that can both transmit and receive radio waves. It allows for quick, reliable, and secure communication without relying on cellular networks." },
        { question: "How do I choose the right two-way radio?", answer: "Consider your operating environment (e.g., indoor, outdoor, hazardous), required range, battery life, digital features (DMR or TETRA), and regulatory requirements." },
        { question: "What is the range of a typical two-way radio?", answer: "Range varies significantly based on wattage, antenna height, and terrain. In dense urban areas, it might be 1-2 miles; in open areas, much further. Repeaters can extend the range significantly." },
        { question: "Do I need a license to operate a two-way radio?", answer: "Professional radio systems (like high-power DMR/TETRA) generally require a license. We also offer license-free options for simpler, short-range use." },
    ];
    
    return (
        <section className="py-12 mt-12 border-t border-slate-200 dark:border-gray-700">
            <h2 className={`text-3xl font-bold text-center mb-10 ${themeClasses.text}`}>Frequently Asked Questions</h2>
            <div className="max-w-4xl mx-auto">
                {faqs.map((faq, index) => (
                    <Accordion key={index} question={faq.question} answer={faq.answer} themeClasses={themeClasses} />
                ))}
            </div>
        </section>
    );
};

const ProductsPage: React.FC<ProductsPageProps> = ({ themeClasses, setCurrentPage, categorySlug, initialTabSlug }) => {
    const categoryInfo = findCategoryBySlug(categorySlug || '');
    const mainCategory = categoryInfo?.categoryData;
    const categoryTitle = categoryInfo?.categoryTitle || 'Products';

    const [activeTab, setActiveTab] = useState(() => {
        if (initialTabSlug && mainCategory) {
            const foundSection = mainCategory.sections.find(s => slugify(s.title) === initialTabSlug);
            if (foundSection) return foundSection.title;
        }
        return mainCategory?.sections[0]?.title || '';
    });

    useEffect(() => {
        if (initialTabSlug && mainCategory) {
            const foundSection = mainCategory.sections.find(s => slugify(s.title) === initialTabSlug);
            if (foundSection) {
                setActiveTab(foundSection.title);
            }
        } else if (mainCategory) {
             setActiveTab(mainCategory.sections[0]?.title || '');
        }
    }, [initialTabSlug, mainCategory]);


    if (!mainCategory) {
        return (
            <div className="text-center py-20">
                <h1 className={`text-4xl font-bold ${themeClasses.accent}`}>Category Not Found</h1>
                <p className="mt-4">The product category you're looking for doesn't seem to exist.</p>
            </div>
        );
    }

    const currentSection = mainCategory.sections.find(s => s.title === activeTab);

    const tabClass = (tabTitle: string) => 
      `px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 whitespace-nowrap ${
        tabTitle === activeTab
          ? `bg-red-600 text-white shadow`
          : `${themeClasses.cardBg} ${themeClasses.text} hover:bg-gray-500/10 border ${themeClasses.border}`
      }`;
    
    return (
        <div className={`${themeClasses.text} space-y-12`}>
            <div>
                <h1 className={`text-5xl font-extrabold mb-4 ${themeClasses.accent} text-center`}>{categoryTitle}</h1>
                <p className={`text-center text-lg max-w-3xl mx-auto opacity-80 ${themeClasses.text}`}>
                    Explore our full range of {categoryTitle.toLowerCase()}, covering everything from handheld terminals to complex trunking systems.
                </p>
            </div>

            <div className={`sticky top-[79px] z-30 ${themeClasses.mainBg} py-4 -mx-4 px-4 border-b ${themeClasses.border}`}>
                <div className={`flex justify-center items-center flex-wrap gap-2`}>
                    {mainCategory.sections.map(section => (
                        <button 
                            key={section.title}
                            onClick={() => setActiveTab(section.title)}
                            className={tabClass(section.title)}
                        >
                            {section.title}
                        </button>
                    ))}
                </div>
            </div>

            {currentSection && (
                <div id="product-grid" className="space-y-16">
                    {currentSection.subsections.map((subsection) => (
                        <section key={subsection.name}>
                            <h3 className={`text-3xl font-bold mb-6 ${themeClasses.accent}`}>{subsection.name.replace(/_/g, ' ')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {subsection.products.map((productName) => (
                                    <ProductCard 
                                        key={productName} 
                                        name={productName} 
                                        themeClasses={themeClasses} 
                                        setCurrentPage={setCurrentPage}
                                        categoryTitle={categoryTitle}
                                        sectionTitle={currentSection.title}
                                        subsectionName={subsection.name}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
            
            <FAQSection themeClasses={themeClasses} />
        </div>
    );
};

export default ProductsPage;