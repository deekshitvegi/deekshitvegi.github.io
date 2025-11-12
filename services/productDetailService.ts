import { ProductDetails } from "../types";
import { productDetailsData } from './mockData';
import { findProductLocationById } from "./productLookupService";

const productMap: Map<string, ProductDetails> = new Map(
    productDetailsData.map(p => [p.id, p])
);

export function getProductDetails(productId: string): ProductDetails | null {
    if (productMap.has(productId)) {
        return productMap.get(productId)!;
    }
    
    // Fallback for products without specific detailed mock data, but are in the catalog
    const location = findProductLocationById(productId);
    if (location) {
        const genericName = location.fileName.substring(0, location.fileName.lastIndexOf('.'));
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
        };
    }

    return null; // Product not found anywhere
}