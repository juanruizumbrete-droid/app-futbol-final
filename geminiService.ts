import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

// CAMBIO CLAVE: Usamos el modelo 1.5-flash pero forzando la versión estable 'v1'
const MODEL_NAME = "gemini-1.5-flash";

export const chatWithAssistant = async (message: string) => {
  try {
    // Forzamos v1 en lugar de v1beta para evitar el error 404
    const model = genAI.getGenerativeModel({ model: MODEL_NAME }, { apiVersion: 'v1' });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Gemini Chat:", error);
    return "Error de conexión. Por favor, intenta de nuevo.";
  }
};

export const generateTrainingSession = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME }, { apiVersion: 'v1' });
    const prompt = `Genera un entrenamiento para: ${params.objective || 'fútbol'}`;
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
    const model = genAI.getGenerativeModel({ model: MODEL_NAME }, { apiVersion: 'v1' });
    const prompt = `Genera objetivos para: ${params.category || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en objetivos:", error);
    throw error;
  }
};
