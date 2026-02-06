import { GoogleGenerativeAI } from "@google/generative-ai";

// Esta línea es la que conecta con Netlify
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("An API Key must be set when running in a browser");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export const generateTrainingPlan = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
