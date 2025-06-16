import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Importa el hook de autenticación

// Componente PrivateRoute que protege rutas
const PrivateRoute = ({ children }) => {
  // Obtiene el estado de autenticación del contexto
  const { isAuthenticated } = useAuth();

  // Si el usuario está autenticado, renderiza los hijos (la ruta protegida)
  // Si no está autenticado, redirige a la página de login
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;