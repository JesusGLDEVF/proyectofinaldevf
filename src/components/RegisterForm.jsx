// src/components/RegisterForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import useAuthService from '../hooks/useAuthService';
// Esquema de validación para el registro
const schema = z.object({
  email: z.string().email("Formato de email inválido").min(1, "El email es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").min(1, "La contraseña es requerida"),
  confirmPassword: z.string().min(1, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Ruta del error
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const { handleRegister, isLoading, authError } = useAuthService();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Datos de registro:", data);
    const result = await handleRegister(data.email, data.password);
    if (result.success) {
      navigate("/launches"); // O redirige a login, según la lógica de tu app
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <h2>Registrarse</h2>
      <div className="form-group">
        <label htmlFor="reg-email">Email:</label>
        <input
          type="email"
          id="reg-email"
          {...register("email")}
          placeholder="email@example.com"
          disabled={isLoading}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="reg-password">Contraseña:</label>
        <input
          type="password"
          id="reg-password"
          {...register("password")}
          placeholder="********"
          disabled={isLoading}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirm-password">Confirmar Contraseña:</label>
        <input
          type="password"
          id="confirm-password"
          {...register("confirmPassword")}
          placeholder="********"
          disabled={isLoading}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
      </div>

      {authError && <p className="error-message">{authError}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;