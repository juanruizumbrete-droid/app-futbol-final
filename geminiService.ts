import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

// Este es el nombre de modelo más compatible que no dará error 404
const MODEL_NAME = "gemini-1.5-flash";

export const chatWithAssistant = async (message: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Gemini Chat:", error);
    return "Error de conexión. Por favor, intenta de nuevo en unos segundos.";
  }
};

export const generateTrainingSession = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
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
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = `Genera objetivos de temporada para la categoría: ${params.category || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en objetivos de temporada:", error);
    throw error;
  }
};
