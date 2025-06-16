import React from 'react';
import useFetchLaunches from '../hooks/useFetchLaunches'; // Importa el hook personalizado
import LaunchCard from '../components/LaunchCard';// Importa el componente de tarjeta


const Launches = () => {
  // Utiliza el hook para obtener los datos de los lanzamientos, el estado de carga y el error
  const { data: launches, loading, error } = useFetchLaunches();

  if (loading) {
    return <div className="loading">Cargando lanzamientos...</div>; // Muestra un mensaje de carga
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Muestra un mensaje de error si falla la carga
  }

  return (
    <div className="launches-page">
      <h2>Lanzamientos de SpaceX</h2>
      <div className="launches-grid">
        {/* Mapea los lanzamientos para renderizar una LaunchCard por cada uno */}
        {launches.map((launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  );
};

export default Launches; 