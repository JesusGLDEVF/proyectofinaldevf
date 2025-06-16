// Archivo para manejar todas las peticiones a la API de SpaceX

const BASE_URL = "https://api.spacexdata.com/v4";

// Función para obtener todos los lanzamientos
export const fetchLaunches = async () => {
  try {
    const response = await fetch(`${BASE_URL}/launches`);
    if (!response.ok) {
      // Si la respuesta no es OK (ej. 404, 500), lanza un error
      throw new Error(`Error fetching launches: ${response.statusText}`);
    }
    return await response.json(); // Parsea la respuesta a JSON
  } catch (error) {
    console.error("Error in fetchLaunches:", error);
    throw error; // Propaga el error para que sea manejado en el componente
  }
};

// Función para obtener un lanzamiento específico por su ID
export const fetchLaunchById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/launches/${id}`);
    if (!response.ok) {
      throw new Error(`Error fetching launch ${id}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error in fetchLaunchById for ID ${id}:`, error);
    throw error;
  }
};