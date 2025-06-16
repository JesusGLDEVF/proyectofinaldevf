import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa la API de cliente de ReactDOM
import App from './App.jsx'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Aquí se renderiza tu componente App */}
  </React.StrictMode>
);