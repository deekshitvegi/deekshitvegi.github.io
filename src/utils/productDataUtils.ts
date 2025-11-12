import { productsData } from '../constants';
import { ProductCategory } from '../types';
import { slugify } from './slugify';

interface CategoryInfo {
    categoryTitle: string;
    categoryData: ProductCategory;
}

const categorySlugMap = new Map<string, string>();
const initializeCategoryMap = () => {
    if (categorySlugMap.size > 0) return;
    Object.keys(productsData).forEach(title => {
        categorySlugMap.set(slugify(title), title);
    });
};

initializeCategoryMap();

export const findCategoryBySlug = (slug: string): CategoryInfo | null => {
    const categoryTitle = categorySlugMap.get(slug);
    if (!categoryTitle) return null;
    
    const categoryData = productsData[categoryTitle];
    if (!categoryData) return null;

    return { categoryTitle, categoryData };
};
