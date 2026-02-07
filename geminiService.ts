import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Inicializamos la IA con el modelo gemini-pro que es el más estable
const genAI = new GoogleGenerativeAI(API_KEY || "");

// 1. FUNCIÓN PARA EL CHAT
export const chatWithAssistant = async (message: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Gemini Chat:", error);
    return "Lo siento, ha habido un error de conexión. Por favor, inténtalo de nuevo.";
  }
};

// 2. FUNCIÓN PARA ENTRENAMIENTOS
export const generateTrainingSession = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Genera una sesión de entrenamiento profesional para: ${params.objective || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return { description: response.text() };
  } catch (error) {
    console.error("Error en entrenamientos:", error);
    throw error;
  }
};

// 3. FUNCIÓN PARA OBJETIVOS
export const generateSeasonObjectives = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Genera objetivos de temporada para la categoría: ${params.category || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en objetivos de temporada:", error);
    throw error;
  }
};
