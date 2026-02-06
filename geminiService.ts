import { GoogleGenerativeAI } from "@google/generative-ai";

// Conectamos con la clave de Netlify
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// 1. GENERADOR DE SESIONES
export const generateTrainingSession = async (params: any) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Como experto RFAF, genera una sesión para: ${params.objective}`;
  const result = await model.generateContent(prompt);
  return { description: result.response.text() };
};

// 2. OBJETIVOS DE TEMPORADA
export const generateSeasonObjectives = async (params: any) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Objetivos para categoría ${params.category}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};

// 3. ASISTENTE DE CHAT (El que te dio error de conexión)
export const chatWithAssistant = async (message: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(message);
  return result.response.text();
};
