// src/hooks/useFetchLaunches.js
import { useState, useEffect } from "react";
import { fetchLaunches } from "../services/spaceXService"; // Importa el servicio para obtener lanzamientos

// Hook personalizado para el fetching de lanzamientos
const useFetchLaunches = () => {
  // Estado para almacenar los datos de los lanzamientos
  const [data, setData] = useState([]);
  // Estado para indicar si la carga está en progreso
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // useEffect para realizar la llamada a la API cuando el componente se monta
  useEffect(() => {
    const getLaunches = async () => {
      try {
        setLoading(true); // Inicia la carga
        const launches = await fetchLaunches(); // Llama al servicio
        setData(launches); // Actualiza el estado con los datos
        setError(null); // Resetea cualquier error previo
      } catch (err) {
        console.error("Error fetching launches:", err);
        setError("Failed to fetch launches. Please try again later."); // Establece el error
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    getLaunches(); // Ejecuta la función de fetching
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  // Retorna los datos, el estado de carga y el error para que el componente los utilice
  return { data, loading, error };
};

export default useFetchLaunches;