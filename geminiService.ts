import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Forzamos el uso de la versión 'v1' para evitar el error 404 de la v1beta
const genAI = new GoogleGenerativeAI(API_KEY || "");

const MODEL_CONFIG = {
  model: "gemini-1.5-flash",
  apiVersion: "v1" // <--- ESTA ES LA CLAVE
};

export const chatWithAssistant = async (message: string) => {
  try {
    const model = genAI.getGenerativeModel(MODEL_CONFIG);
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Gemini Chat:", error);
    return "Error de conexión. Por favor, refresca la página e inténtalo de nuevo.";
  }
};

export const generateTrainingSession = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel(MODEL_CONFIG);
    const prompt = `Genera una sesión de entrenamiento para: ${params.objective || 'fútbol'}`;
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
    const prompt = `Genera objetivos para: ${params.category || 'fútbol'}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en objetivos:", error);
    throw error;
  }
};
