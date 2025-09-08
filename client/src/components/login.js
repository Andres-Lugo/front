import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, form)

            .then(response => {
                console.log(response.data); // Verificar respuesta
                localStorage.setItem('token', response.data.token);
                setIsAuthenticated(true);
                navigate('/');
            })
            .catch(err => {
                console.error('Login error:', err.response ? err.response.data : err);
                setError('Login failed');
            });
    };
    
    
    

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p> {/* Enlace a la página de registro */}
        </div>
    );
}

export default Login;
