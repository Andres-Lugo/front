import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GeneralUtils from '../util/GeneralUtil';

function Register({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar la contraseña utilizando GeneralUtils
        if (!GeneralUtils.validatePassword(password)) {
            setErrorMessage(
                'The password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
                { email, password }
            );

            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            navigate('/'); // Redirigir a la página principal
        } catch (error) {
            setErrorMessage(
                'Error en el registro: ' + (error.response?.data.message || 'Intenta de nuevo.')
            );
        }
    };

    return (
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}

export default Register;
