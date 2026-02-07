import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY || "");

export const chatWithAssistant = async (message: string) => {
  try {
    // Definimos el modelo dentro para asegurar la conexión
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error en Gemini:", error);
    return "Lo siento, ha habido un error de conexión. Por favor, inténtalo de nuevo.";
  }
};

// Si usas las otras funciones, repite la lógica del modelo dentro de cada una
export const generateTrainingSession = async (params: any) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Genera una sesión de entrenamiento para el objetivo: ${params.objective}`;
    const result = await model.generateContent(prompt);
    return { description: result.response.text() };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
