import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, logout } = useAuth(); // Obtiene el estado y función de logout

  return (
    <div className="home-page">
      <h1>Bienvenido a la Aplicación de Lanzamientos de SpaceX Creada por Jesus GL como Proyecto Final de DEVF.</h1>
      <p>Explora todos los lanzamientos de SpaceX, desde los más antiguos hasta los más recientes.</p>

      <nav className="home-nav">
        {!isAuthenticated ? ( // Si no está autenticado, muestra opciones de login/registro
          <>
            <Link to="/login" className="nav-button">Iniciar Sesión</Link>
            <Link to="/register" className="nav-button">Registrarse</Link>
          </>
        ) : ( // Si está autenticado, muestra el botón de lanzamientos y logout
          <>
            <Link to="/launches" className="nav-button">Ver Lanzamientos</Link>
            <Link to="/protected" className="nav-button">Página Protegida</Link>
            <button onClick={logout} className="nav-button logout-button">Cerrar Sesión</button>
          </>
        )}
      </nav>

      <p className="footer-text">Datos proporcionados por la API de SpaceX.</p>
    </div>
  );
};

export default Home;