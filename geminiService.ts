import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

// Nombre completo oficial para evitar el error 404
const MODEL_NAME = "models/gemini-1.5-flash";

export const chatWithAssistant = async (message: string) => {
  try {
    // Forzamos la apiVersion a 'v1' que es la que ya reconoce tu consola
    const model = genAI.getGenerativeModel({ model: MODEL_NAME }, { apiVersion: 'v1' });
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
