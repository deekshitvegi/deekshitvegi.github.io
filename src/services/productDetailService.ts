import { ProductDetails } from "../types";
import { productDetailsData } from './mockData';
import { findProductLocationById } from "./productLookupService";

const productMap: Map<string, ProductDetails> = new Map(
    productDetailsData.map(p => [p.id, p])
);

// This map is exported so the geminiService can also use it.
export const brochureMap = new Map<string, string>([
    ['hytera-hp788', 'HP 788 Brochure.pdf'],
    ['hytera-hp688', 'HP688.pdf'],
    ['hytera-hr1068', 'HR1068.pdf'],
    ['hytera-hm788', 'HM 788 - Brochure.pdf'],
    ['hytera-pnc380', 'Hytera_PNC380_VKTS.pdf'],
    ['en-pnc460u-intrinsically-safe-smart-device', 'EN_PNC460U_Intinsically+Safe+Smart+Device_V1.0.pdf'],
    ['pnc360s-poc-radio', 'PNC360S_PoC_Radio.pdf'],
    ['hytera-mnc360-ds-a', 'Hytera_MNC360_DS-A.pdf'],
]);


export function getProductDetails(productId: string): ProductDetails | null {
    let product: ProductDetails | null = null;

    if (productMap.has(productId)) {
        // Create a copy to avoid mutating the original object in the map
        product = { ...productMap.get(productId)! };
    } else {
        // Fallback for products without specific detailed mock data
        const location = findProductLocationById(productId);
        if (location) {
            const genericName = location.fileName.substring(0, location.fileName.lastIndexOf('.'));
            product = {
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
    }

    // If a product was found (either detailed or generic), check for a brochure
    if (product && brochureMap.has(productId)) {
        product.brochureUrl = `/brochures/${brochureMap.get(productId)}`;
    }

    return product;
}