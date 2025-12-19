
import { ProductDetails } from "../types";
import { productDetailsData } from './mockData';
import { findProductLocationById } from "./productLookupService";
import { getCustomProductAttributes } from "./productsManager";
import { brochureMap } from "../data/brochures";

const safeProductDetails = productDetailsData || [];
const productMap: Map<string, ProductDetails> = new Map(
    safeProductDetails.map(p => [p.id, p])
);

// Re-export for backward compatibility if needed, though direct import is better
export { brochureMap };

export function getProductDetails(productId: string): ProductDetails | null {
    const location = findProductLocationById(productId);
    if (!location) return null;

    const fileName = location.fileName;
    const genericName = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
    
    // 1. Check for Custom Attributes (Saved via Admin Portal) - PRIORITY 1
    // This allows the admin to overwrite static data details
    const customAttrs = getCustomProductAttributes(fileName);
    
    if (customAttrs) {
        return {
            id: productId,
            name: customAttrs.name || genericName,
            tagline: customAttrs.tagline || "Reliable Communication Device",
            classification: customAttrs.classification || "Professional Two-Way Radio",
            description: customAttrs.description || `The ${genericName} is a robust and reliable communication tool.`,
            highlights: customAttrs.highlights && customAttrs.highlights.length > 0 ? customAttrs.highlights : [
                 { icon: 'shield-check', title: "Rugged Design", description: "Built to withstand tough environments." }
            ],
            specifications: {
                "General": customAttrs.specifications || { "Status": "Contact for details" }
            },
            accessories: {
                standard: customAttrs.standardAccessories || ["Standard Battery", "Antenna"],
                optional: ["Earpiece", "Multi-Unit Charger"]
            },
            relatedProducts: customAttrs.relatedProducts || [],
            brochureUrl: customAttrs.brochureSource // Custom brochure takes precedence
        };
    }

    // 2. Check Static Mock Data - PRIORITY 2
    if (productMap.has(productId)) {
        const staticProduct = { ...productMap.get(productId)! };
        // Attach brochure if not present
        if (brochureMap.has(productId) && !staticProduct.brochureUrl) {
            staticProduct.brochureUrl = `/brochures/${brochureMap.get(productId)}`;
        }
        return staticProduct;
    } 

    // 3. Generic Fallback for static files without mock data - PRIORITY 3
    return {
        id: productId,
        name: genericName,
        tagline: "Reliable Communication Device",
        classification: "Professional Two-Way Radio",
        description: `The ${genericName} is a robust and reliable communication tool designed for professional use. Full details for this specific model are coming soon. Please contact us for more information.`,
        highlights: [
            { icon: 'shield-check', title: "Rugged Design", description: "Built to withstand tough environments and daily use." },
            { icon: 'speaker-wave', title: "Clear Audio", description: "Loud and clear audio for effective communication in noisy settings." },
            { icon: 'battery-100', title: "Long Battery Life", description: "A high-capacity battery ensures all-day operation." },
        ],
        specifications: {
            "General": {
                "Frequency Range": "UHF/VHF",
                "Channel Capacity": "Please contact us",
                "Operating Voltage": "7.4V (Rated)",
            },
        },
        accessories: {
            standard: ["Standard Antenna", "Li-ion Battery", "Desktop Charger", "Belt Clip", "User Manual"],
            optional: ["Earpiece", "Speaker Microphone", "High-Gain Antenna", "Multi-Unit Charger"],
        },
        relatedProducts: ["Hytera HP708", "Motorola R7", "Kenwood NX-1200"],
        brochureUrl: brochureMap.get(productId) ? `/brochures/${brochureMap.get(productId)}` : undefined
    };
}
