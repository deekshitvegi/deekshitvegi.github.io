

import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available from environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. Chatbot functionality will be limited.");
}

// Initialize the GoogleGenAI client
const ai = new GoogleGenAI({ apiKey: API_KEY! });

interface AIGenerationResult {
    text: string;
    sources: {
        uri: string;
        title: string;
    }[];
}

export const generateAIContent = async (userQuery: string, systemPrompt: string): Promise<AIGenerationResult> => {
    if (!API_KEY) {
        return {
            text: "I am currently unable to connect to the AI service. Please ensure the API key is configured.",
            sources: []
        };
    }

    try {
        // FIX: The 'tools' property should be inside the 'config' object for grounding with Google Search.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userQuery,
            config: {
                systemInstruction: systemPrompt,
                tools: [{ googleSearch: {} }],
            },
        });

        const text = response.text;
        
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

        const sources = groundingChunks
            .map((chunk: any) => ({
                uri: chunk.web?.uri,
                title: chunk.web?.title,
            }))
            .filter((source: any): source is { uri: string, title: string } => source.uri && source.title);

        return { text, sources };

    } catch (error) {
        console.error("Error generating AI content:", error);
        return {
            text: "I apologize, but I encountered an error while processing your request. Please try again later.",
            sources: []
        };
    }
};