import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Cargamos la clave desde Netlify
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// 2. Función para el Asistente de Chat (El que da error 404)
export const chatWithAssistant = async (message: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(message);
  const response = await result.response;
  return response.text();
};

// 3. Función para Generar Sesiones de Entrenamiento
export const generateTrainingSession = async (params: any) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Como experto RFAF, genera una sesión de entrenamiento para: ${params.objective}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return { description: response.text() };
};

// 4. Función para Objetivos de Temporada
export const generateSeasonObjectives = async (params: any) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Genera objetivos de fútbol para categoría ${params.category}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
