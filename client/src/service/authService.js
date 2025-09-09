// /client/src/services/authService.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data; // 👈 devolvemos la respuesta completa
};

export const register = async (email, password) => {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    localStorage.setItem('token', res.data.token);
    return res.data; // 👈 devolvemos la respuesta completa
};
