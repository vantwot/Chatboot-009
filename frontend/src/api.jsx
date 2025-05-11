const API_URL = "https://1930-34-125-167-120.ngrok-free.app/";  // Ajusta si cambia

/**
 * Obtiene una respuesta de la API externa según el modelo y la pregunta
 * @param {string} modelo - El modelo a consultar (gpt, llama, claude, etc.)
 * @param {string} pregunta - La pregunta a enviar al modelo
 * @returns {Promise<string>} - La respuesta del modelo
 */
export const getRespuesta = async (modelo, pregunta) => {
  try {
    if (!pregunta.trim()) {
      return "Por favor, haga una pregunta.";
    }
    
    const response = await fetch(
      `${API_URL}${modelo.toLowerCase()}?pregunta=${encodeURIComponent(pregunta)}`
    );
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data.respuesta || "No hay respuesta disponible.";
    
  } catch (error) {
    console.error("Error al obtener respuesta:", error);
    return `Error al conectar al servidor`;
  }
};