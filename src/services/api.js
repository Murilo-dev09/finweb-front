import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://finweb-qc82.onrender.com',
});