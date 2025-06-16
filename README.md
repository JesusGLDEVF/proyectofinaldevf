#Proyecto Final DEVF

Hecho por Jesus GL							   03/06/2025

Este proyecto es una aplicación React que permite:
•	Mostrar una página de inicio.
•	Autenticar usuarios (registro e inicio de sesión).
•	Proteger rutas para usuarios autenticados.
•	Mostrar una lista de lanzamientos de SpaceX obtenida de una API externa.
•	Ver detalles de un lanzamiento específico.

Archivos y conceptos clave:
1. public/index.html (El punto de entrada del navegador)
•	Función: Este es el archivo HTML base que el navegador carga cuando se accede a localhost:3000. Es el "lienzo" donde la aplicación React se dibujará.
•	Detalle clave: Contiene un div con id="root": <div id="root"></div>.
•	Cómo funciona: React "inyecta" todo el contenido de la aplicación dentro de este div. Inicialmente, este div está vacío. Si la aplicación React no se carga correctamente, se verá el contenido por defecto de este HTML (como el logo grande de React con el cual tuve muchos problemas al inicio).


2. src/index.js (El punto de entrada de React)
•	Función: Este es el archivo JavaScript principal que arranca la aplicación React. Es el primer archivo JavaScript que se ejecuta.
•	Detalle clave: 
o	Importa React y ReactDOM/client (para React 18+).
o	Importa el componente App desde ./App.
o	Usa ReactDOM.createRoot(document.getElementById('root')) para crear una raíz de renderizado en el div id="root" de index.html.
o	Llama a root.render(<React.StrictMode><App /></React.StrictMode>); para renderizar el componente App dentro de esa raíz. 
•	Cómo funciona: Le dice a React: "Toma el control de este elemento HTML (div id="root") y renderiza mi componente App dentro de él".

3. src/App.jsx (El componente principal y la configuración de rutas)
•	Función: Este es el corazón de la aplicación. Define la estructura general, maneja el enrutamiento (qué componente se muestra para cada URL) y envuelve toda la aplicación en el contexto de autenticación.
•	Detalle clave: 
o	Importaciones: Importa React, BrowserRouter (renombrado como Router), Routes, Route y Link de react-router-dom para manejar la navegación.
o	Importa AuthProvider desde ./context/AuthContext para proveer el contexto de autenticación a toda la aplicación.
o	Importa todos los componentes de "página" (como Home, Login, Register, Launches, LaunchDetail, ProtectedPage) desde sus respectivas ubicaciones en src/pages/ y src/components/.
o	Estructura: 
	Envuelve todo el JSX de la aplicación en <AuthProvider>. Esto hace que el estado de autenticación (si el usuario está logueado o no) esté disponible para cualquier componente anidado.
	Dentro de AuthProvider, utiliza <Router> (BrowserRouter) para habilitar la navegación basada en URLs.
	Contiene una barra de navegación simple (<nav>) con Links a diferentes rutas.
	Usa <Routes> para definir las diferentes rutas de la aplicación.
	Cada <Route> asocia una path (URL) con un element (el componente que se renderizará para esa URL).
o	Rutas Protegidas: La ruta /protected utiliza un componente PrivateRoute como element. PrivateRoute es un "wrapper" que decide si renderiza la ProtectedPage (su children [hijo}) o redirige al usuario a la página de inicio de sesión si no está autenticado.
•	Cómo funciona: Cuando el navegador navega a una URL diferente (por ejemplo, /login), react-router-dom se encarga de mostrar el componente Login en lugar del Home o Launches, y así sucesivamente.

4. src/context/AuthContext.js (Gestión del Estado de Autenticación)
•	Función: Provee un mecanismo global para que cualquier componente en la aplicación pueda acceder al estado de autenticación del usuario (si está logueado o no) y a las funciones para iniciar/cerrar sesión, sin necesidad de pasar props manualmente.
•	Detalle clave: 
o	createContext: Crea un objeto Context que permite a los componentes "suscribirse" a cambios en el estado de autenticación.
o	AuthProvider: Es un componente React que "provee" el valor del contexto a sus hijos. 
	Mantiene el estado isLoggedIn (booleano) y authToken (string) usando useState.
	Inicializa estos estados leyendo de localStorage para persistir la sesión incluso si el usuario cierra y reabre el navegador.
	Define funciones login y logout que actualizan los estados y también modifican localStorage.
o	useAuth: Es un custom hook (useContext(AuthContext)) que simplifica el consumo del contexto en cualquier componente funcional.
•	Cómo funciona: Cuando un usuario inicia sesión (a través de loginUser en authService.js), la función login de AuthContext se llama, isLoggedIn se establece en true, y esto hace que todos los componentes que usan useAuth se re-rendericen, mostrando el contenido para usuarios autenticados (como el acceso a /protected).
________________________________________
5. src/services/authService.js (Simulación de la API de Autenticación)
•	Función: Este archivo simula las llamadas a una API de backend para registrar e iniciar sesión usuarios. Importante: En una aplicación real, estas funciones harían llamadas HTTP a un servidor real, no almacenarían datos directamente en localStorage.
•	Detalle clave: 
o	USERS_STORAGE_KEY: Una constante para la clave de localStorage donde se guardarán los usuarios simulados.
o	getStoredUsers() y saveUsersToStorage(): Funciones auxiliares para leer y escribir en localStorage.
o	registerUser(email, password): 
	Simula un retraso de red con setTimeout.
	Obtiene los usuarios existentes.
	Verifica si el email ya existe. Si sí, lanza un error.
	Si no, agrega el nuevo usuario al array y lo guarda en localStorage.
	Devuelve { success: true } si es exitoso.
o	loginUser(email, password): 
	Simula un retraso de red.
	Busca un usuario que coincida con el email y la contraseña proporcionados.
	Si encuentra el usuario, devuelve { success: true }.
	Si no, lanza un error de "Credenciales inválidas".
•	Cómo funciona: Es el "backend falso" de la autenticación. Cuando el formulario de registro/login se envía, llama a estas funciones para simular la interacción con un servidor.
________________________________________
6. src/hooks/useAuthService.js (Custom Hook para Lógica de Autenticación)
•	Función: Encapsula la lógica relacionada con el proceso de autenticación (estado de carga, errores, llamadas a authService). Esto es un "custom hook" de React, una forma de reutilizar lógica con estado entre componentes.
•	Detalle clave: 
o	Usa useState para manejar isLoading (si la operación está en curso) y authError (si ocurrió un error).
o	Usa useAuth() (el hook de tu AuthContext) para obtener las funciones login y logout del contexto.
o	Define handleLogin y handleRegister como funciones async que: 
	Establecen isLoading a true.
	Intentan llamar a loginUser o registerUser de authService.js.
	Actualizan authError si hay un problema.
	Llaman a contextLogin() si la operación es exitosa (para actualizar el estado global de autenticación).
	Restablecen isLoading a false en el bloque finally.
o	Define handleLogout que simplemente llama a contextLogout().
o	Retorna un objeto { isLoading, authError, handleLogin, handleRegister, handleLogout } para que los componentes que usen este hook puedan acceder a estos valores.
•	Cómo funciona: Los componentes como LoginForm y RegisterForm no llaman directamente a authService.js. En su lugar, usan const { isLoading, authError, handleLogin, handleRegister } = useAuthService(); y luego llaman a handleLogin o handleRegister. Esto mantiene la lógica de autenticación centralizada y reutilizable.


7. src/components/LoginForm.jsx y src/components/RegisterForm.jsx (Formularios de Autenticación)
•	Función: Estos componentes son los formularios que permiten al usuario introducir su email y contraseña.
•	Detalle clave: 
o	Cada uno es un componente funcional de React.
o	Utilizan useState para manejar el estado local de los campos del formulario (email, password).
o	Importan y usan el useAuthService() custom hook para manejar la lógica de autenticación.
o	Definen una función handleSubmit que se activa cuando el formulario se envía.
o	En handleSubmit, llaman a handleLogin(email, password) o handleRegister(email, password) del useAuthService.
o	Manejan la navegación (redirección) después de un inicio de sesión/registro exitoso, usando useNavigate de react-router-dom.
o	Muestran mensajes de error (authError) o estados de carga (isLoading).
•	Cómo funciona: Capturan la entrada del usuario, la pasan al useAuthService, y luego reaccionan al resultado (redirigiendo o mostrando un error).


8. src/components/ProtectedPage.jsx (Página Protegida)
•	Función: Un componente de ejemplo que solo debería ser visible para usuarios autenticados.
•	Detalle clave: Es un componente React simple que muestra un mensaje y quizás un botón de "Cerrar Sesión".
•	Cómo funciona: Su protección no está dentro de este componente, sino que la proporciona la PrivateRoute en App.jsx.
________________________________________
9. src/routes/PrivateRoute.jsx (Componente de Ruta Protegida)
•	Función: Este componente es un "guardián" de rutas. Decide si un usuario puede acceder a una ruta protegida o debe ser redirigido.
•	Detalle clave: 
o	Importa useAuth de ./context/AuthContext y Maps de react-router-dom.
o	Obtiene isLoggedIn del contexto de autenticación.
o	Si !isLoggedIn (el usuario no está logueado), renderiza un <Navigate to="/login" replace /> para redirigirlo a la página de login.
o	Si isLoggedIn es true, renderiza children (el componente de página real que se le pasó, como ProtectedPage).
•	Cómo funciona: Cuando react-router-dom intenta renderizar una ruta que usa PrivateRoute, este componente verifica el estado de autenticación. Si el usuario no está autenticado, lo envía a la página de login; de lo contrario, muestra el contenido de la ruta protegida.


10. src/pages/Launches.jsx y src/components/LaunchCard.jsx (Mostrar Lanzamientos)
•	Función: Launches.jsx obtiene los datos de lanzamientos de SpaceX, y LaunchCard.jsx renderiza los detalles de cada lanzamiento individualmente.
•	Detalle clave: 
o	Launches.jsx: 
	Usa useState para almacenar la lista de lanzamientos y posibles errores/estados de carga.
	Utiliza useEffect para hacer una llamada fetch a la API pública de SpaceX (https://api.spacexdata.com/v3/launches) cuando el componente se monta.
	Renderiza la lista de lanzamientos usando map para crear un LaunchCard para cada uno.
o	LaunchCard.jsx: Recibe los datos de un lanzamiento como props y los muestra de forma formateada.
•	Cómo funciona: Launches.jsx trae los datos, y LaunchCard.jsx los presenta de forma visual.


11. src/pages/LaunchDetail.jsx (Detalle de los lanzamientos)
•	Función: Muestra información más detallada de un lanzamiento específico, obtenida de la API usando el ID del lanzamiento de la URL.
•	Detalle clave: 
o	Usa useParams() de react-router-dom para obtener el ID del lanzamiento de la URL (ej. /launches/123).
o	Usa useState para almacenar los detalles del lanzamiento y useEffect para hacer una llamada fetch a la API (https://api.spacexdata.com/v3/launches/:flight_number) usando ese ID.
o	Renderiza los detalles del lanzamiento.
•	Cómo funciona: Cuando se navega a una URL de detalle, extrae el ID y lo usa para solicitar datos específicos de la API y luego los muestra.


Este desglose cubre la funcionalidad principal de la aplicación. Es una arquitectura estándar para aplicaciones React con autenticación y consumo de APIs, utilizando conceptos como hooks, context API y React Router.

