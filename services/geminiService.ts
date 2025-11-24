import { GoogleGenAI, Type } from "@google/genai";
import { StandardField, MappingSuggestionResponse } from "../types";

export const getGeminiMappings = async (
  sourceHeaders: string[],
  targetSchema: StandardField[]
): Promise<MappingSuggestionResponse | null> => {
  
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const targetDescriptions = targetSchema.map(f => `${f.key} (${f.description})`).join(', ');
    
    const prompt = `
      You are a data engineering assistant. 
      I have a list of Source Headers from a raw Excel file: ${JSON.stringify(sourceHeaders)}.
      I need to map them to the following Target Schema fields: ${targetDescriptions}.
      
      For each Source Header, find the best matching Target Schema field. 
      If no good match is found, map it to "null".
      Provide a short reasoning for the match.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mappings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  reasoning: { type: Type.STRING }
                },
                required: ["source", "target", "reasoning"]
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as MappingSuggestionResponse;

  } catch (error) {
    console.error("Error fetching mappings from Gemini:", error);
    return null;
  }
};
