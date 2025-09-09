import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeneralUtils from '../util/GeneralUtil';
import { register } from '../service/authService'; // Usamos el servicio ya creado

function Register({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!GeneralUtils.validatePassword(password)) {
            setErrorMessage(
                'The password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            return;
        }

        try {
            await register(email, password); // Usamos la función del servicio
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            setErrorMessage(
                'Error en el registro: ' +
                    (error.response?.data.message || 'Intenta de nuevo.')
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
