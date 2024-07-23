import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:5000/api/'; // Cambia esto a la URL de tu backend
axios.defaults.baseURL = 'https://backendtalentotech.onrender.com/api/'; // Cambia esto a la URL de tu backend

export default axios;
