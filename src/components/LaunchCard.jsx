
// src/components/LaunchCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Para crear enlaces a los detalles del lanzamiento

// Componente para mostrar la información de un lanzamiento en una tarjeta
const LaunchCard = ({ launch }) => {
  // Desestructuración de las propiedades del objeto launch
  const { id, name, date_utc, flight_number, links } = launch;

  // Formatear la fecha para que sea más legible
  const formattedDate = new Date(date_utc).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="launch-card">
      {/* Enlace a la página de detalles del lanzamiento */}
      <Link to={`/launches/${id}`} className="launch-card-link">
        {/* Imagen del parche de la misión, si existe */}
        {links?.patch?.small && (
          <img
            src={links.patch.small}
            alt={`${name} patch`}
            className="launch-patch"
          />
        )}
        <h3>{name}</h3> {/* Nombre de la misión */}
        <p>Número de vuelo: {flight_number}</p> {/* Número de vuelo */}
        <p>Fecha: {formattedDate}</p> {/* Fecha formateada */}
        {/* Podrías añadir más información aquí si lo deseas */}
      </Link>
    </div>
  );
};

export default LaunchCard;