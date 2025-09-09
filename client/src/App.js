// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import './styles/DarkMode.css';
import Candidates from "./pages/Candidates";

function App() {
    const [form, setForm] = useState({ name: '', type: '', location: '', comments: '', employeeCode: '' });
    const [cv, setCv] = useState(null);
    const [errors, setErrors] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Verifica si el usuario está autenticado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCv(e.target.files[0]);
    };

    const validateForm = () => {
        let formErrors = {};
        if (!form.name) formErrors.name = 'Name is required';
        if (!form.type) formErrors.type = 'Type is required';
        if (!form.location) formErrors.location = 'Location is required';
        if (!form.employeeCode) formErrors.employeeCode = 'Employee Code is required';
        if (!cv) formErrors.cv = 'CV is required';
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('type', form.type);
        formData.append('location', form.location);
        formData.append('comments', form.comments);
        formData.append('employeeCode', form.employeeCode);
        formData.append('cv', cv);

        axios.post(`${process.env.REACT_APP_API_BASE_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then(response => {
            console.log(response.data);
            setForm({ name: '', type: '', location: '', comments: '', employeeCode: '' });
            setCv(null);
            setErrors({});
        })
        .catch(error => console.log(error));
    };

    return (
        <Router>
            <div>
                {isAuthenticated ? (
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                        <h1>Candidate Manager</h1>

                        {/* Formulario de candidatos */}
                        <form onSubmit={handleSubmit}>
                            <input
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

                            <select name="type" value={form.type} onChange={handleChange}>
                                <option value="">Select Type</option>
                                <option value="Front-End">Front-End</option>
                                <option value="Back-End">Back-End</option>
                                <option value="Full-Stack">Full-Stack</option>
                            </select>
                            {errors.type && <p style={{ color: 'red' }}>{errors.type}</p>}

                            <select name="location" value={form.location} onChange={handleChange}>
                                <option value="">Select Location</option>
                                <option value="New York">New York</option>
                                <option value="San Francisco">San Francisco</option>
                            </select>
                            {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}

                            <textarea
                                name="comments"
                                placeholder="Comments"
                                value={form.comments}
                                onChange={handleChange}
                            />

                            <input
                                name="employeeCode"
                                placeholder="Employee Code"
                                value={form.employeeCode}
                                onChange={handleChange}
                            />
                            {errors.employeeCode && <p style={{ color: 'red' }}>{errors.employeeCode}</p>}

                            <input type="file" name="cv" onChange={handleFileChange} />
                            {errors.cv && <p style={{ color: 'red' }}>{errors.cv}</p>}

                            <button type="submit">Add Candidate</button>
                        </form>

                        {/* Rutas protegidas */}
                        <Routes>
                            <Route path="/candidates" element={<Candidates />} />
                            <Route path="*" element={<Navigate to="/candidates" />} />
                        </Routes>
                    </div>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
