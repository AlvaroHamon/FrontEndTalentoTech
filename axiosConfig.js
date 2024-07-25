import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:5000/api/'; 
axios.defaults.baseURL = 'https://backendtalentotech.onrender.com/api/';

export default axios;
