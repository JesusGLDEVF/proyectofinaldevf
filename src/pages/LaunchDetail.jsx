import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLaunchById } from '../services/spaceXService'; // Importa el servicio

const LaunchDetail = () => {
  const { id } = useParams(); // Obtiene el ID del lanzamiento de la URL
  const [launch, setLaunch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLaunchDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchLaunchById(id);
        setLaunch(data);
      } catch (err) {
        console.error("Error fetching launch detail:", err);
        setError("No se pudo cargar el detalle del lanzamiento.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getLaunchDetail();
    }
  }, [id]); // Dependencia del efecto: se ejecuta cuando el ID cambia

  if (loading) {
    return <div className="loading">Cargando detalles del lanzamiento...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!launch) {
    return <div className="no-data">Lanzamiento no encontrado.</div>;
  }

  // Formatear la fecha
  const formattedDate = new Date(launch.date_utc).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="launch-detail-page">
      <Link to="/launches" className="back-button">← Volver a Lanzamientos</Link>
      <h1>{launch.name}</h1>
      <p><strong>Número de Vuelo:</strong> {launch.flight_number}</p>
      <p><strong>Fecha y Hora:</strong> {formattedDate}</p>
      <p><strong>Detalles:</strong> {launch.details || 'No hay detalles disponibles.'}</p>

      {/* Imagen del cohete grande, si existe */}
      {launch.links?.flickr?.original?.length > 0 && (
        <div className="launch-images">
          {launch.links.flickr.original.map((image, index) => (
            <img key={index} src={image} alt={`Imagen de ${launch.name} ${index + 1}`} className="launch-detail-image" />
          ))}
        </div>
      )}

      {/* Enlaces externos */}
      <div className="external-links">
        {launch.links?.wikipedia && (
          <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">Wikipedia</a>
        )}
        {launch.links?.webcast && (
          <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">Video del Lanzamiento</a>
        )}
      </div>
    </div>
  );
};

export default LaunchDetail;