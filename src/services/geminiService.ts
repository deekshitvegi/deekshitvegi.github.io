import { GoogleGenAI, Chat, FunctionDeclaration, Type } from "@google/genai";
import { brochureMap } from './productDetailService';
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
    When a user asks for a brochure or to see a product, you MUST use the provided tools. Do not make up URLs or say you cannot do it.
    If a function call is successful, confirm it to the user. For example, if navigation is successful, say "Navigating you to the [Page Name] page now."
    If a brochure is found, respond with the link in markdown format, like "[Product Name] Brochure".
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
            return { url: `/brochures/${url}` };
        }
    }
    return { url: null };
};

export const navigateToProductPage = (productOrCategoryName: string): { path: string | null } => {
    const path = findProductOrCategoryPathByName(productOrCategoryName);
    return { path };
};