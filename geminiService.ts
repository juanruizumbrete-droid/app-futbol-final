// Tu nueva dirección de Render
const BACKEND_URL = "https://backend-entrenador-ia.onrender.com/api/chat";

export const chatWithAssistant = async (message: string) => {
  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error en Chat:", error);
    return "Error de conexión con el servidor. Intenta de nuevo.";
  }
};

export const generateTrainingSession = async (params: any) => {
  try {
    const prompt = `Genera un entrenamiento detallado para: ${params.objective || 'fútbol'}. Incluye ejercicios y duración.`;
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();
    return { description: data.text };
  } catch (error) {
    console.error("Error en entrenamientos:", error);
    throw error;
  }
};

export const generateSeasonObjectives = async (params: any) => {
  try {
    const prompt = `Genera objetivos de temporada para la categoría: ${params.category || 'fútbol'}.`;
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Error en objetivos:", error);
    throw error;
  }
}; 
