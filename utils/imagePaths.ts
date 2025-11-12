import { findProductLocationById } from '../services/productLookupService';

// Maps display names to folder names based on the user's provided file structure.
const categoryToPathMap: { [key: string]: string } = {
    'Two-Way Radios': 'Two way Radios',
    'MCS & PoC Solutions': 'MCS & PoC Solutions', // Assuming folder name matches
    'Body Worn Cameras': 'Body Worn Cameras', // Assuming folder name matches
};

const sectionToPathMap: { [key: string]: string } = {
    'DMR System': 'DMR',
    'TETRA System': 'TETRA_System',
    'Ad-Hoc Solutions': 'Ad-Hoc Solutions',
    'License Free & Accessories': 'License Free & Accessories',
};

const subsectionToPathMap: { [key: string]: string } = {
    // DMR
    'Handsets': 'Handset',
    // TETRA
    'Handset_Terminals': 'Handset_Terminals',
    'Mobile_Terminals': 'Mobile_Terminals',
    'Base_Stations': 'Base_Stations',
    // License Free
    'Airmob': 'AirMob',
    'Skyphone': 'Skyfone'
};

/**
 * Generates the full path for a product image based on its location in the catalog.
 */
export const getProductImagePath = (categoryTitle: string, sectionTitle: string, subsectionName: string, productFileName: string): string => {
    const imageRoot = './product_images';
    
    const categoryPath = categoryToPathMap[categoryTitle] || categoryTitle;
    const sectionPath = sectionToPathMap[sectionTitle] || sectionTitle;
    const subsectionPath = subsectionToPathMap[subsectionName] || subsectionName;

    const safeCategory = encodeURIComponent(categoryPath);
    const safeSection = encodeURIComponent(sectionPath);
    const safeSubsection = encodeURIComponent(subsectionName);
    const safeFileName = encodeURIComponent(productFileName);

    return `${imageRoot}/${safeCategory}/${safeSection}/${safeSubsection}/${safeFileName}`;
};

export const getProductImagePathById = (productId: string): string => {
    const location = findProductLocationById(productId);
    if (!location) {
        return `https://placehold.co/600x600/ccc/999?text=Image+Not+Found`;
    }
    return getProductImagePath(location.categoryTitle, location.sectionTitle, location.subsectionName, location.fileName);
};