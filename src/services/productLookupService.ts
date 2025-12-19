
import { getProductsData } from './productsManager';
import { slugify } from '../utils/slugify';

export interface ProductLocation {
    fileName: string;
    categoryTitle: string;
    sectionTitle: string;
    subsectionName: string;
}

// We use a singleton pattern for maps to ensure they are built only once, but lazily.
let mapsInitialized = false;
const productLocationMap = new Map<string, ProductLocation>();
const searchableNamesMap = new Map<string, string>(); 

const ensureMapsInitialized = () => {
    if (mapsInitialized) return; 

    const productsData = getProductsData();

    Object.entries(productsData).forEach(([categoryTitle, categoryData]) => {
        const categorySlug = slugify(categoryTitle);
        const categoryPath = `products/${categorySlug}`;
        searchableNamesMap.set(categoryTitle.toLowerCase(), categoryPath);

        categoryData.sections.forEach(section => {
            const sectionSlug = slugify(section.title);
            const sectionPath = `${categoryPath}/${sectionSlug}`;
            searchableNamesMap.set(section.title.toLowerCase(), sectionPath);

            section.subsections.forEach(subsection => {
                const subsectionPath = sectionPath; 
                searchableNamesMap.set(subsection.name.toLowerCase().replace(/_/g, ' '), subsectionPath);

                subsection.products.forEach(fileName => {
                    const productName = fileName.substring(0, fileName.lastIndexOf('.'));
                    const productId = slugify(productName);
                    const productPath = `product/${productId}`;
                    
                    if (!productLocationMap.has(productId)) {
                        productLocationMap.set(productId, {
                            fileName,
                            categoryTitle,
                            sectionTitle: section.title,
                            subsectionName: subsection.name
                        });
                        searchableNamesMap.set(productName.toLowerCase(), productPath);
                    }
                });
            });
        });
    });
    mapsInitialized = true;
};

export const findProductLocationById = (productId: string): ProductLocation | undefined => {
    ensureMapsInitialized();
    return productLocationMap.get(productId);
};

export const findProductOrCategoryPathByName = (name: string): string | null => {
    if (!name) return null;
    ensureMapsInitialized();
    const searchTerm = name.toLowerCase().trim();
    
    if (searchableNamesMap.has(searchTerm)) {
        return searchableNamesMap.get(searchTerm)!;
    }

    for (const [key, value] of searchableNamesMap.entries()) {
        if (value.startsWith('product/') && key.includes(searchTerm)) {
            return value;
        }
    }
    
    return null;
};
