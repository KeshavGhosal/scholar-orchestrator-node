
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const explainConcept = async (prompt: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are MongoBuddy, a super friendly 2nd-year CS student and MongoDB expert. Explain things in a chill, human-friendly way using 'dude', 'pro-tip', and clear examples. Use markdown formatting. If the user asks about replaceOne(), make sure to clarify that it replaces the whole doc (except _id) and only hits the first match.",
        temperature: 0.7,
      },
    });
    return response.text || "Sorry dude, my brain just glitched. Try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Whoops! Looks like the database connection (or my API key) is acting up. Check the console.";
  }
};
