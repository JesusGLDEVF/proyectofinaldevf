// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// 1. Crea el contexto de autenticación
const AuthContext = createContext();

// 2. Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  // Estado para saber si el usuario está autenticado.
  // Inicialmente, lo intentamos cargar del localStorage para persistencia.
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  // Efecto para guardar el estado de autenticación en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Función para simular el inicio de sesión
  const login = () => {
    setIsAuthenticated(true);
    console.log("Usuario ha iniciado sesión.");
  };

  // Función para simular el cierre de sesión
  const logout = () => {
    setIsAuthenticated(false);
    console.log("Usuario ha cerrado sesión.");
  };

  // 3. Provee el estado y las funciones a los componentes hijos
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Hook personalizado para consumir el contexto de autenticación fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};