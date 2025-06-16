// src/hooks/useAuthService.js
import { useState } from 'react'; // Importa useState desde React
import { useAuth } from '../context/AuthContext'; // Importa el hook para el contexto de autenticación
import { loginUser, registerUser } from '../services/authService'; // Asume que tienes un servicio para llamadas a la API

// Definición del custom hook useAuthService
// Un custom hook es una función que encapsula lógica con estado y/o efectos.
const useAuthService = () => { // <--- ¡Esto es lo que faltaba! Define el hook como una función.
  // Estado para manejar el estado de carga durante las operaciones de autenticación
  const [isLoading, setIsLoading] = useState(false);
  // Estado para manejar mensajes de error
  const [authError, setAuthError] = useState(null);

  // Hook para utilizar el contexto de autenticación
  const { login: contextLogin, logout: contextLogout } = useAuth();

  // Función para manejar el inicio de sesión
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await loginUser(email, password);
      if (response.success) {
        contextLogin(); // Actualiza el estado de autenticación global
        return { success: true };
      }
    } catch (err) {
      setAuthError(err.message || "Login failed.");
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para manejar el registro
  const handleRegister = async (email, password) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await registerUser(email, password);
      if (response.success) {
        // Podrías decidir loguear al usuario automáticamente después de registrar
        contextLogin();
        return { success: true };
      }
    } catch (err) {
      setAuthError(err.message || "Registration failed.");
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    contextLogout();
  };

  // El hook retorna un objeto con el estado y las funciones que se pueden usar en otros componentes
  return { isLoading, authError, handleLogin, handleRegister, handleLogout };
}; // <--- Cierre de la función del hook

export default useAuthService; // <--- Exporta el custom hook