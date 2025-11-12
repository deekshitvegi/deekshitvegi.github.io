import { ProductSearchResult, ProductsData } from '../types';
import { productsData } from '../constants';
import { slugify } from '../utils/slugify';
import { getProductImagePath } from '../utils/imagePaths';

let searchableProductIndex: ProductSearchResult[] = [];

const buildSearchIndex = (data: ProductsData): ProductSearchResult[] => {
    const index: ProductSearchResult[] = [];
    Object.entries(data).forEach(([categoryTitle, categoryData]) => {
        categoryData.sections.forEach(section => {
            section.subsections.forEach(subsection => {
                subsection.products.forEach(fileName => {
                    const name = fileName.substring(0, fileName.lastIndexOf('.'));
                    const id = slugify(name);
                    const imageUrl = getProductImagePath(categoryTitle, section.title, subsection.name, fileName);
                    
                    // Avoid duplicates
                    if (!index.some(p => p.id === id)) {
                        index.push({
                            id,
                            name,
                            imageUrl
                        });
                    }
                });
            });
        });
    });
    return index;
};

// Initialize the index on module load
searchableProductIndex = buildSearchIndex(productsData);

export const searchProducts = (query: string): ProductSearchResult[] => {
    if (!query) {
        return [];
    }

    const lowercasedQuery = query.toLowerCase();
    
    return searchableProductIndex.filter(product => 
        product.name.toLowerCase().includes(lowercasedQuery)
    );
};
