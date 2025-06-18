import axios from 'axios';

const baseURL = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;