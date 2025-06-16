// Este archivo es el componente principal de la aplicación React.
// Aquí se configuran las rutas y se envuelve toda la aplicación con el contexto de autenticación.

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedPage from './components/ProtectedPage'; 
import PrivateRoute from './routes/PrivateRoute'; 

// Importa las páginas de tu aplicación
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Launches from './pages/Launches';
import LaunchDetail from './pages/LaunchDetail'; // Página para mostrar detalles de un lanzamiento

// Importa los estilos globales de la aplicación
import './App.css';

function App() {
  // El componente App retorna la estructura principal de la aplicación.
  // Envuelve todo con AuthProvider para que el estado de autenticación
  // esté disponible en cualquier componente que lo necesite.
  // Luego, BrowserRouter maneja el enrutamiento dentro de la aplicación.
  return (
    <AuthProvider> {/* Provee el contexto de autenticación a toda la app */}
      <Router> {/* Habilita el enrutamiento basado en la URL */}
        <div className="app-container"> {/* Contenedor principal de la interfaz */}

          <header className="app-header"> {/* Encabezado de la aplicación */}
            <nav> {/* Barra de navegación */}
              <Link to="/" className="nav-link">Inicio</Link> {/* Enlace a la página de inicio */}
              <Link to="/launches" className="nav-link">Lanzamientos</Link> {/* Enlace a la lista de lanzamientos */}
              {/* No incluimos enlaces a /login o /register aquí directamente,
                  ya que Home.jsx los maneja según el estado de autenticación. */}
            </nav>
          </header>

          <main className="app-main"> {/* Contenido principal de la aplicación */}
            <Routes> {/* Define las diferentes rutas de la aplicación */}
              {/* Ruta para la página de inicio */}
              <Route path="/" element={<Home />} />

              {/* Rutas para autenticación */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rutas para los lanzamientos (accesibles públicamente) */}
              <Route path="/launches" element={<Launches />} />
              {/* Ruta dinámica para detalles de un lanzamiento específico */}
              <Route path="/launches/:id" element={<LaunchDetail />} />

              {/* Ruta Protegida: solo accesible si el usuario está autenticado */}
              {/* PrivateRoute envuelve el componente ProtectedPage. Si el usuario
                  no está autenticado, PrivateRoute lo redirigirá a /login. */}
              <Route
                path="/protected"
                element={
                  <PrivateRoute>
                    <ProtectedPage />
                  </PrivateRoute>
                }
              />
              {/* Si tuvieras más rutas protegidas, las añadirías de la misma manera:
              <Route
                path="/otro-recurso-protegido"
                element={
                  <PrivateRoute>
                    <OtroComponenteProtegido />
                  </PrivateRoute>
                }
              />
              */}

              {/* Puedes añadir una ruta de "not found" si lo deseas:
              <Route path="*" element={<h2>404: Página no encontrada</h2>} />
              */}
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Exporta el componente App como la exportación por defecto,
// para que index.js pueda importarlo y renderizarlo. aaaaa
export default App;