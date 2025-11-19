
import { ProductSearchResult, ProductsData } from '../types';
import { getProductsData } from './productsManager';
import { slugify } from '../utils/slugify';
import { getProductImagePath } from '../utils/imagePaths';

let searchableProductIndex: ProductSearchResult[] | null = null;

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
                            imageUrl,
                            category: categoryTitle,
                            section: section.title,
                            subsection: subsection.name
                        });
                    }
                });
            });
        });
    });
    return index;
};

export const getIndex = () => {
    if (!searchableProductIndex) {
        searchableProductIndex = buildSearchIndex(getProductsData());
    }
    return searchableProductIndex;
};

export interface SearchFilters {
    category?: string;
    section?: string;
    subsection?: string;
}

export type SortOption = 'relevance' | 'name-asc' | 'name-desc';

export const searchProducts = (
    query: string, 
    filters: SearchFilters = {}, 
    sort: SortOption = 'relevance'
): ProductSearchResult[] => {
    const index = getIndex();
    let results = index;

    // 1. Text Search
    if (query.trim()) {
        const lowercasedQuery = query.toLowerCase();
        results = results.filter(product => 
            product.name.toLowerCase().includes(lowercasedQuery)
        );
    }

    // 2. Apply Filters
    if (filters.category) {
        results = results.filter(p => p.category === filters.category);
    }
    if (filters.section) {
        results = results.filter(p => p.section === filters.section);
    }
    if (filters.subsection) {
        results = results.filter(p => p.subsection === filters.subsection);
    }

    // 3. Apply Sorting
    if (sort === 'name-asc') {
        results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
        results.sort((a, b) => b.name.localeCompare(a.name));
    } 
    // 'relevance' keeps the original index order (or could be enhanced with scoring later)

    return results;
};
