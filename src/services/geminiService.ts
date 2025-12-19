
import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";
import { brochureMap } from '../data/brochures';
import { findProductOrCategoryPathByName } from "./productLookupService";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;

const findProductBrochureTool: FunctionDeclaration = {
    name: "find_product_brochure",
    description: "Gets the public URL for a specific product's PDF brochure.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            productName: {
                type: Type.STRING,
                description: "The name of the product, e.g., 'Hytera HP788', 'PNC380'."
            }
        },
        required: ["productName"]
    }
};

const navigateToProductPageTool: FunctionDeclaration = {
    name: "navigate_to_product_page",
    description: "Navigates the user to a specific product, category, or sub-category page on the website.",
    parameters: {
        type: Type.OBJECT,
        properties: {
            productOrCategoryName: {
                type: Type.STRING,
                description: "The name of the product or category page to navigate to, e.g., 'Hytera HP788', 'TETRA System', 'DMR Handsets'."
            }
        },
        required: ["productOrCategoryName"]
    }
};

const initializeAI = () => {
    if (!API_KEY) {
        console.error("Gemini API key not found. Please set VITE_GEMINI_API_KEY.");
        return null;
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
    return ai;
};

export const startChat = (): Chat | null => {
    const genAI = initializeAI();
    if (!genAI) return null;

    const systemInstruction = `You are a helpful and friendly sales assistant for VKT Services, a communications equipment provider.
    Your capabilities are:
    1.  Answering general questions about two-way radios and communication solutions.
    2.  Finding and providing links to product brochures when a user asks for one using the 'find_product_brochure' tool.
    3.  Navigating users to product or category pages using the 'navigate_to_product_page' tool.
    
    IMPORTANT RULES:
    - When a user asks for a brochure, use the 'find_product_brochure' tool. 
    - If the tool returns a URL, you MUST respond with a markdown link using that EXACT URL. Do not alter the URL.
    - Example response if URL is found: "Here is the [Hytera HP788 Brochure](/brochures/HP%20788%20Brochure.pdf)."
    - If a function call is successful, confirm it to the user.
    
    Be concise and professional.`;

    return genAI.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
            tools: [{ functionDeclarations: [findProductBrochureTool, navigateToProductPageTool] }]
        }
    });
};

// --- Tool Implementations ---

export const findProductBrochure = (productName: string): { url: string | null } => {
    if (!productName) return { url: null };
    const searchTerm = productName.toLowerCase().replace(/[\s-]/g, '');
    for (const [id, url] of brochureMap.entries()) {
        const simplifiedId = id.toLowerCase().replace(/[\s-]/g, '');
        if (simplifiedId.includes(searchTerm)) {
            // FIX: Encode the URL component to handle spaces in filenames correctly in Markdown
            // e.g., "HP 788.pdf" -> "HP%20788.pdf"
            return { url: `/brochures/${encodeURIComponent(url)}` };
        }
    }
    return { url: null };
};

export const navigateToProductPage = (productOrCategoryName: string): { path: string | null } => {
    const path = findProductOrCategoryPathByName(productOrCategoryName);
    return { path };
};

// --- AI Data Generation for Admin Portal ---

export interface GeneratedProductDetails {
    tagline: string;
    classification: string;
    description: string;
    specifications: { [key: string]: string };
    highlights: { title: string; description: string; icon: string }[];
    standardAccessories: string[];
}

export const generateProductDetails = async (productName: string): Promise<GeneratedProductDetails | null> => {
    const genAI = initializeAI();
    if (!genAI) {
        throw new Error("API Key missing");
    }

    const prompt = `Generate detailed technical product information for: "${productName}".
    Context: Professional Two-Way Radio / Communication Equipment / Security Systems.
    
    Return ONLY a JSON object with this exact schema:
    {
      "tagline": "Short marketing slogan",
      "classification": "e.g. Handheld | Digital | DMR",
      "description": "A professional 2-3 sentence description.",
      "specifications": {
         "Frequency Range": "value",
         "Dimensions": "value",
         "Weight": "value",
         "IP Rating": "value",
         "Battery Life": "value"
      },
      "highlights": [
        { 
          "title": "Feature Name", 
          "description": "Short explanation", 
          "icon": "Select strictly one from: [speaker-wave, battery-100, signal, shield-check, cpu-chip, hand-raised, lock-closed, wifi, cube-transparent, lifebuoy, device-phone-mobile]" 
        }
      ],
      "standardAccessories": ["Antenna", "Battery", "etc"]
    }
    Ensure valid JSON. Do not add markdown formatting like \`\`\`json.`;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const text = response.text;
        if (!text) return null;
        return JSON.parse(text) as GeneratedProductDetails;
    } catch (error) {
        console.error("Error generating details:", error);
        return null;
    }
};
