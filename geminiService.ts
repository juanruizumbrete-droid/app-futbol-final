import { GoogleGenerativeAI } from "@google/generative-ai";
import { Team, TrainingSession, Category, Level } from "./types";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("An API Key must be set when running in a browser");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// 1. GENERADOR DE SESIONES (Lo que falló ahora)
export const generateTrainingSession = async (params: {
  category: Category;
  level: Level;
  objective: string;
  duration: number;
  players: number;
}): Promise<Partial<TrainingSession>> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Como experto entrenador RFAF/CEDIFA, diseña una sesión de entrenamiento de fútbol.
  Categoría: ${params.category}, Nivel: ${params.level}, Objetivo: ${params.objective}.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return { description: response.text() };
};

// 2. OBJETIVOS DE TEMPORADA (Lo que arreglamos antes)
export const generateSeasonObjectives = async (params: {
  category: Category;
  level: Level;
  phase: string;
  type: 'técnicos' | 'tácticos' | 'formativos';
}): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Objetivos para ${params.category} en fase ${params.phase}.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// 3. ASISTENTE DE CHAT
export const chatWithAssistant = async (message: string, context: { activeTeam: Team | null }) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(message);
  const response = await result.response;
  return response.text();
};
