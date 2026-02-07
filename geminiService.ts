import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Inicializamos la IA forzando la API estable v1 para evitar el error 404
const genAI = new GoogleGenerativeAI(API_KEY || "");

// Usamos el modelo con su identificador completo y estable
const MODEL_CONFIG = { 
  model: "gemini-1.5-flash"
};

export const chatWithAssistant = async (message: string) => {
  try {
    // Usamos el método recomendado para obtener el modelo
    const model = genAI.getGenerativeModel(MODEL_CONFIG);
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Gemini Chat:", error);
    return "Error de conexión con la IA. Por favor, intenta de nuevo en unos segundos.";
  }
};

export const generateTrainingSession = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel(MODEL_CONFIG);
    const prompt = `Genera una sesión de entrenamiento profesional para: ${params.objective || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return { description: response.text() };
  } catch (error) {
    console.error("Error en entrenamientos:", error);
    throw error;
  }
};

export const generateSeasonObjectives = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel(MODEL_CONFIG);
    const prompt = `Genera objetivos de temporada para la categoría: ${params.category || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en objetivos de temporada:", error);
    throw error;
  }
};
