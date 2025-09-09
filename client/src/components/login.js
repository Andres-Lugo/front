import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Detecta si hay URL en variables de entorno o usa localhost por defecto
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, form);

      // ✅ Guardar token en localStorage
      localStorage.setItem("token", response.data.token);

      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response ? err.response.data : err);
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2 style={{ color: "skyblue" }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", padding: "20px", background: "#111", borderRadius: "10px" }}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ display: "block", margin: "10px auto", padding: "10px", borderRadius: "5px" }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ display: "block", margin: "10px auto", padding: "10px", borderRadius: "5px" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "5px" }}>Login</button>
      </form>
      <p style={{ marginTop: "15px" }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}

export default Login;
