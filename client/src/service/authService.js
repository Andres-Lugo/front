import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/auth`;

export const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
};

export const register = async (email, password) => {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    localStorage.setItem('token', res.data.token);
};
