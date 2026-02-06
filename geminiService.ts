import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Inicialización ultra-estable
const genAI = new GoogleGenerativeAI(API_KEY);

// Usaremos el modelo 'gemini-1.5-flash-latest' que es el más compatible
const getModel = () => genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const chatWithAssistant = async (message: string) => {
  const model = getModel();
  const result = await model.generateContent(message);
  return result.response.text();
};

export const generateTrainingSession = async (params: any) => {
  const model = getModel();
  const prompt = `Genera una sesión de entrenamiento para el objetivo: ${params.objective}`;
  const result = await model.generateContent(prompt);
  return { description: result.response.text() };
};

export const generateSeasonObjectives = async (params: any) => {
  const model = getModel();
  const prompt = `Genera objetivos para la categoría: ${params.category}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
};
