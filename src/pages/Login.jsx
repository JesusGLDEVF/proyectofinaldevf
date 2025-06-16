import React from 'react';

import LoginForm from '../components/LoginForm';// Importa el componente del formulario de login
import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div className="login-page">
      <LoginForm /> {/* Renderiza el formulario de login */}
      <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </div>
  );
};

export default Login;