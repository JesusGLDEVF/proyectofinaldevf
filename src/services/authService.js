// Use localStorage para simular el almacenamiento de usuarios.
// En una aplicación real, esto iría a un backend.
const USERS_STORAGE_KEY = 'registeredUsers';

// Función auxiliar para obtener los usuarios del almacenamiento local
const getStoredUsers = () => {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Función auxiliar para guardar los usuarios en el almacenamiento local
const saveUsersToStorage = (users) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

// Simula el registro de un nuevo usuario
export const registerUser = async (email, password) => {
  // Retraso para simular una llamada a la red
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = getStoredUsers();

  // Verifica si el email ya está registrado
  if (users.find(user => user.email === email)) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  const newUser = { email, password }; 
  users.push(newUser);
  saveUsersToStorage(users); // Guarda el nuevo usuario

  console.log("Usuario registrado:", newUser); // <-- Agrega este console.log
  console.log("Usuarios en almacenamiento:", users); // <-- Agrega este console.log
  return { success: true, message: 'Registro exitoso.' };
};

// Simula el inicio de sesión de un usuario
export const loginUser = async (email, password) => {
  // Retraso para simular una llamada a la red
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = getStoredUsers();

  // Busca al usuario
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    console.log("Usuario logueado:", user); // <-- Agrega este console.log
    return { success: true, message: 'Inicio de sesión exitoso.' };
  } else {
    throw new Error('Credenciales inválidas.');
  }
};

// ... (otras funciones si las tienes, como logoutUser o getCurrentUser)