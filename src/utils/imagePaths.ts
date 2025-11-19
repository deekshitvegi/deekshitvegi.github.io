
import { findProductLocationById } from '../services/productLookupService';
import { getCustomProductAttributes } from '../services/productsManager';

// Maps display names from constants.ts to the actual folder names.
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
    'PoC Radios': 'PoC Radios',
    'Platforms': 'Platforms',
    'Bodycams': 'Bodycams',
    'Management': 'Management'
};

const subsectionToPathMap: { [key: string]: string } = {
    'Handsets': 'Handset',
    'Handset_Terminals': 'Handset_Terminals',
    'Mobile_Terminals': 'Mobile_Terminals',
    'Base_Stations': 'Base_Stations',
    'Airmob': 'AirMob',
    'Skyphone': 'Skyfone'
};

/**
 * Generates the absolute path for a product image.
 */
export const getProductImagePath = (categoryTitle: string, sectionTitle: string, subsectionName: string, productFileName: string): string => {
    // 1. Check if it's a custom product with an uploaded image (Base64 or direct URL stored in manager)
    const customAttrs = getCustomProductAttributes(productFileName);
    if (customAttrs && customAttrs.imageSource) {
        return customAttrs.imageSource;
    }

    // 2. Check if filename itself is a URL/DataURI (legacy support)
    if (productFileName.startsWith('http://') || productFileName.startsWith('https://') || productFileName.startsWith('data:')) {
        return productFileName;
    }

    // 3. Construct standard local path
    const categoryPath = categoryToPathMap[categoryTitle] || categoryTitle;
    const sectionPath = sectionToPathMap[sectionTitle] || sectionTitle;
    const subsectionPath = subsectionToPathMap[subsectionName] || subsectionName;

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