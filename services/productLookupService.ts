import { productsData } from '../constants';
import { slugify } from '../utils/slugify';

export interface ProductLocation {
    fileName: string;
    categoryTitle: string;
    sectionTitle: string;
    subsectionName: string;
}

const productLocationMap = new Map<string, ProductLocation>();

// Function to initialize the map
const initializeMap = () => {
    if (productLocationMap.size > 0) return; // Already initialized

    Object.entries(productsData).forEach(([categoryTitle, categoryData]) => {
        categoryData.sections.forEach(section => {
            section.subsections.forEach(subsection => {
                subsection.products.forEach(fileName => {
                    const productName = fileName.substring(0, fileName.lastIndexOf('.'));
                    const productId = slugify(productName);
                    if (!productLocationMap.has(productId)) {
                        productLocationMap.set(productId, {
                            fileName,
                            categoryTitle,
                            sectionTitle: section.title,
                            subsectionName: subsection.name
                        });
                    }
                });
            });
        });
    });
};

// Initialize the map on module load
initializeMap();

export const findProductLocationById = (productId: string): ProductLocation | undefined => {
    return productLocationMap.get(productId);
};
