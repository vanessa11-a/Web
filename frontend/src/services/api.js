import axios from 'axios';

// Cambia la URL si tu backend no está en localhost:8000
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

export default api;
