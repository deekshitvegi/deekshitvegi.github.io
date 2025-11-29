
import { getProductsData } from '../services/productsManager';
import { ProductCategory } from '../types';
import { slugify } from './slugify';

interface CategoryInfo {
    categoryTitle: string;
    categoryData: ProductCategory;
}

export const findCategoryBySlug = (slug: string): CategoryInfo | null => {
    const allData = getProductsData(); // Use dynamic data source
    
    // Build map on fly (or memoize if performance issues arise, but minimal here)
    const categorySlugMap = new Map<string, string>();
    Object.keys(allData).forEach(title => {
        categorySlugMap.set(slugify(title), title);
    });

    const categoryTitle = categorySlugMap.get(slug);
    if (!categoryTitle) return null;
    
    const categoryData = allData[categoryTitle];
    if (!categoryData) return null;

    return { categoryTitle, categoryData };
};
