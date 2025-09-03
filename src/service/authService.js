// /client/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
};

export const register = async (email, password) => {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    localStorage.setItem('token', res.data.token);
};
