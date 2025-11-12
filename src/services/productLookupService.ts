import { productsData } from '../constants';
import { slugify } from '../utils/slugify';

export interface ProductLocation {
    fileName: string;
    categoryTitle: string;
    sectionTitle: string;
    subsectionName: string;
}

const productLocationMap = new Map<string, ProductLocation>();
const searchableNamesMap = new Map<string, string>(); // Maps a searchable name to its navigation path

// Function to initialize the maps
const initializeMaps = () => {
    if (productLocationMap.size > 0) return; // Already initialized

    Object.entries(productsData).forEach(([categoryTitle, categoryData]) => {
        const categorySlug = slugify(categoryTitle);
        const categoryPath = `products/${categorySlug}`;
        searchableNamesMap.set(categoryTitle.toLowerCase(), categoryPath);

        categoryData.sections.forEach(section => {
            const sectionSlug = slugify(section.title);
            const sectionPath = `${categoryPath}/${sectionSlug}`;
            searchableNamesMap.set(section.title.toLowerCase(), sectionPath);

            section.subsections.forEach(subsection => {
                const subsectionPath = sectionPath; // For simplicity, subsection links to the parent section page
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
};

// Initialize the maps on module load
initializeMaps();

export const findProductLocationById = (productId: string): ProductLocation | undefined => {
    return productLocationMap.get(productId);
};

/**
 * Finds a navigation path for a product or category by its name.
 * Performs a case-insensitive search.
 * @param name The name of the product or category to search for.
 * @returns The hash path (e.g., 'product/hytera-hp788') or null if not found.
 */
export const findProductOrCategoryPathByName = (name: string): string | null => {
    if (!name) return null;
    const searchTerm = name.toLowerCase().trim();
    
    // Exact match first
    if (searchableNamesMap.has(searchTerm)) {
        return searchableNamesMap.get(searchTerm)!;
    }

    // Partial match for products (e.g., "HP788" should match "Hytera HP788")
    for (const [key, value] of searchableNamesMap.entries()) {
        if (value.startsWith('product/') && key.includes(searchTerm)) {
            return value;
        }
    }
    
    return null;
};