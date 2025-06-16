// src/components/ProtectedPage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Para acceder a la función de logout

const ProtectedPage = () => {
  const { logout } = useAuth(); // Obtiene la función de logout del contexto

  return (
    <div className="protected-page">
      <h2>¡Bienvenido a la página protegida!</h2>
      <p>Esta sección solo es accesible si has iniciado sesión.</p>
      <button onClick={logout} className="logout-button">Cerrar Sesión</button>
    </div>
  );
};

export default ProtectedPage;