import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const login = async (credentials) => {
        setLoading(true);
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });

        setLoading(false);
        if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('token', userData?.token);
            localStorage.setItem('users', JSON.stringify(userData?.user));
            setUser(userData?.user);
            navigate('/dashboard');
        } else {
            throw response;
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/');
        localStorage.setItem('users', null);
        localStorage.setItem('token', null);
    };

    useEffect(() => {
        if (localStorage.getItem('users')) {
            setUser(JSON.parse(localStorage.getItem('users')));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
