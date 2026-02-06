import { GoogleGenerativeAI } from "@google/generative-ai";
import { Team, TrainingSession, Category, Level } from "./types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("An API Key must be set when running in a browser");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// FUNCIÓN 1: Plan de entrenamiento (La que ya tenías)
export const generateTrainingPlan = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// FUNCIÓN 2: Objetivos de Temporada (La que Netlify echa de menos)
export const generateSeasonObjectives = async (params: {
  category: Category;
  level: Level;
  phase: string;
  type: 'técnicos' | 'tácticos' | 'formativos';
}): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Como experto coordinador metodológico RFAF/CEDIFA, propón objetivos específicos para la planificación de temporada.
  Categoría: ${params.category}, Nivel: ${params.level}, Fase: ${params.phase}, Tipo: ${params.type}.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// FUNCIÓN 3: Chat con Asistente (Para que no falle el resto de la app)
export const chatWithAssistant = async (message: string, context: { activeTeam: Team | null }) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(message);
  const response = await result.response;
  return response.text();
};
