import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Inicializamos la IA con un control por si la clave no carga a tiempo
const genAI = new GoogleGenerativeAI(API_KEY || "");

// 1. FUNCIÓN PARA EL CHAT (Asistente IA)
export const chatWithAssistant = async (message: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Gemini Chat:", error);
    return "Lo siento, ha habido un error de conexión. Por favor, inténtalo de nuevo.";
  }
};

// 2. FUNCIÓN PARA ENTRENAMIENTOS (Entrenamientos)
export const generateTrainingSession = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Genera una sesión de entrenamiento profesional para: ${params.objective || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return { description: response.text() };
  } catch (error) {
    console.error("Error en entrenamientos:", error);
    throw error;
  }
};

// 3. FUNCIÓN PARA OBJETIVOS (Temporada) - ¡Esta es la que faltaba!
export const generateSeasonObjectives = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Genera objetivos de temporada para la categoría: ${params.category || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en objetivos de temporada:", error);
    throw error;
  }
};
