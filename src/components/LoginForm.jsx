// src/components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"; // Importa Zod
import useAuthService from '../hooks/useAuthService'; // Importa el hook de servicio de autenticación

import { useNavigate } from "react-router-dom";

// Define el esquema de validación para el formulario de login con Zod
const schema = z.object({
  email: z.string().email("Formato de email inválido").min(1, "El email es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").min(1, "La contraseña es requerida"),
});

const LoginForm = () => {
  const navigate = useNavigate(); // Hook para la navegación
  const { handleLogin, isLoading, authError } = useAuthService(); // Obtiene las funciones y estados del hook de autenticación

  // Configura React Hook Form con el resolver de Zod
  const {
    register, // Función para registrar inputs
    handleSubmit, // Función para manejar el envío del formulario
    formState: { errors }, // Objeto que contiene los errores de validación
  } = useForm({
    resolver: zodResolver(schema), // Integra Zod para la validación
  });

  // Función que se ejecuta al enviar el formulario si la validación es exitosa
  const onSubmit = async (data) => {
    console.log("Datos de login:", data);
    const result = await handleLogin(data.email, data.password);
    if (result.success) {
      navigate("/launches"); // Redirige a la página de lanzamientos si el login es exitoso
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <h2>Iniciar Sesión</h2>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        {/* Input para el email, registrado con React Hook Form */}
        <input
          type="email"
          id="email"
          {...register("email")} // Asocia el input con el campo 'email' del schema
          placeholder="email@example.com"
          disabled={isLoading} // Deshabilita durante la carga
        />
        {/* Muestra el mensaje de error si existe */}
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña:</label>
        {/* Input para la contraseña */}
        <input
          type="password"
          id="password"
          {...register("password")} // Asocia el input con el campo 'password' del schema
          placeholder="********"
          disabled={isLoading}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      {authError && <p className="error-message">{authError}</p>} {/* Muestra errores del servicio de autenticación */}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Iniciando..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;