import { findProductLocationById } from '../services/productLookupService';

// Maps display names from constants.ts to the actual folder names you provided.
const categoryToPathMap: { [key: string]: string } = {
    'Two-Way Radios': 'Two way Radios',
    'MCS & PoC Solutions': 'MCS & PoC Solutions', 
    'Body Worn Cameras': 'Body Worn Cameras',
};

const sectionToPathMap: { [key: string]: string } = {
    'DMR System': 'DMR',
    'TETRA System': 'TETRA_System',
    'Ad-Hoc Solutions': 'Ad-Hoc Solutions',
    'License Free & Accessories': 'License Free & Accessories',
    // MCS & PoC
    'PoC Radios': 'PoC Radios',
    'Platforms': 'Platforms',
    // Bodycams
    'Bodycams': 'Bodycams',
    'Management': 'Management'
};

// This map handles cases where the subsection name in the data
// doesn't exactly match the folder name (e.g., 'Handsets' vs 'Handset').
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
 * Generates the correct absolute path for a product image.
 * This function now assumes the 'Two way Radios' folder is inside the 'public/Two-way-Radios' directory.
 */
export const getProductImagePath = (categoryTitle: string, sectionTitle: string, subsectionName: string, productFileName: string): string => {
    const categoryPath = categoryToPathMap[categoryTitle] || categoryTitle;
    const sectionPath = sectionToPathMap[sectionTitle] || sectionTitle;
    const subsectionPath = subsectionToPathMap[subsectionName] || subsectionName;

    // Use raw strings as modern browsers handle spaces and special characters.
    // This resolves the "Open in new tab" issue.
    const path = `/Two-way-Radios/${categoryPath}/${sectionPath}/${subsectionPath}/${productFileName}`;
    
    return path;
};

export const getProductImagePathById = (productId: string): string => {
    const location = findProductLocationById(productId);
    if (!location) {
        return `https://placehold.co/300x300/e2e8f0/94a3b8?text=Not+Found`;
    }
    return getProductImagePath(location.categoryTitle, location.sectionTitle, location.subsectionName, location.fileName);
};