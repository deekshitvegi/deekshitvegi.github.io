
import { productsData as staticData } from '../constants';
import { ProductsData } from '../types';

const STORAGE_KEY = 'vkt_custom_products';

// Extended to include rich details
export interface CustomProduct {
    id: string;
    name: string;
    category: string;
    section: string;
    subsection: string;
    imageSource?: string;
    brochureSource?: string;
    
    // Rich Details
    tagline?: string;
    classification?: string;
    description?: string;
    specifications?: { [key: string]: string };
    highlights?: { title: string; description: string; icon: string }[];
    standardAccessories?: string[];
    relatedProducts?: string[];

    // Category/Section Images
    categoryImage?: string;
    sectionImage?: string;

    timestamp: number;
}

// Safe ID generator
const generateId = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const getCustomProducts = (): CustomProduct[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading custom products", e);
        return [];
    }
};

export const saveCustomProduct = (product: Omit<CustomProduct, 'id' | 'timestamp'>) => {
    if (typeof window === 'undefined') return;
    const current = getCustomProducts();
    
    // Check if product already exists (by name) to update it instead of creating new
    const existingIndex = current.findIndex(p => p.name.toLowerCase() === product.name.toLowerCase());

    if (existingIndex >= 0) {
        // Update existing
        const updatedProduct = {
            ...current[existingIndex],
            ...product,
            timestamp: Date.now()
        };
        current[existingIndex] = updatedProduct;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
            window.location.reload();
        } catch (e) {
            alert("Storage Limit Reached! Could not update product. Try using external URLs for images.");
        }
    } else {
        // Create new
        const newProduct: CustomProduct = {
            ...product,
            id: generateId(),
            timestamp: Date.now()
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, newProduct]));
            window.location.reload();
        } catch (e) {
            alert("Storage Quota Exceeded! The image or file is too large to store in the browser. Please try a smaller file or use an external URL.");
            console.error("LocalStorage error:", e);
        }
    }
};

export const removeCustomProduct = (id: string) => {
    if (typeof window === 'undefined') return;
    const current = getCustomProducts();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.location.reload();
};

export const getProductsData = (): ProductsData => {
    if (!staticData) return {};

    let data: ProductsData;
    try {
         data = JSON.parse(JSON.stringify(staticData));
    } catch (e) {
        return {};
    }
    
    if (typeof window === 'undefined') return data;

    const customProducts = getCustomProducts();

    customProducts.forEach(p => {
        if (!p.category || !p.section || !p.subsection) return;

        if (!data[p.category]) {
            data[p.category] = { 
                icon: 'cube-transparent',
                image: p.categoryImage,
                sections: [] 
            };
        }

        let section = data[p.category].sections.find(s => s.title === p.section);
        if (!section) {
            section = { 
                title: p.section, 
                image: p.sectionImage || p.imageSource || 'https://placehold.co/300x200?text=New+Section', 
                subsections: [] 
            };
            data[p.category].sections.push(section);
        }

        let subsection = section.subsections.find(sub => sub.name === p.subsection);
        if (!subsection) {
            subsection = { name: p.subsection, products: [] };
            section.subsections.push(subsection);
        }

        // Normalize names to check for duplicates (handle .png extensions in static data)
        const exists = subsection.products.some(existingName => {
            const cleanExisting = existingName.replace(/\.[^/.]+$/, "");
            return cleanExisting === p.name;
        });

        if (!exists) {
            subsection.products.push(p.name);
        }
    });

    return data;
};

// Helper to find custom attributes for a product
export const getCustomProductAttributes = (productName: string): CustomProduct | undefined => {
    const customProducts = getCustomProducts();
    // Normalize the input name (remove extension if present)
    const cleanName = productName.replace(/\.[^/.]+$/, "");
    
    return customProducts.find(p => p.name === cleanName);
};

export const generateConstantsCode = (): string => {
    const currentData = getProductsData();
    return `import { NavItem, ProductsData } from './types';

export const navItems: NavItem[] = [
  { name: 'Home', path: 'home', subItems: [] },
  { name: 'Products', path: 'products', subItems: [] },
  { 
    name: 'Partners', 
    path: 'partners', 
    subItems: [
      { name: 'Hytera', path: 'partners-hytera' },
      { name: 'Technology', path: 'partners-tech' },
    ] 
  },
  { name: 'Solutions', path: 'solutions', subItems: [] },
  { name: 'Support', path: 'support', subItems: [] },
  { name: 'About Us', path: 'about', subItems: [] },
];

export const productsData: ProductsData = ${JSON.stringify(currentData, null, 2)};
`;
};
