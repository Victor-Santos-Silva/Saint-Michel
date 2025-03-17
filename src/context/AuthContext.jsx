import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [id, setId] = useState(localStorage.getItem('id') || ''); // Adiciona o estado do id

    useEffect(() => {
        const storedNomeCompleto = localStorage.getItem('nomeCompleto');
        const storedToken = localStorage.getItem('token');
        const storedId = localStorage.getItem('id'); // Recupera o id do localStorage

        if (storedNomeCompleto && storedToken && storedId) {
            setNomeCompleto(storedNomeCompleto);
            setToken(storedToken);
            setId(storedId); // Define o id
            setIsLoggedIn(true);
        }
    }, []);

    const login = (nome, token, id) => {
        setNomeCompleto(nome);
        setToken(token);
        setId(id); // Define o id
        setIsLoggedIn(true);
        localStorage.setItem('nomeCompleto', nome);
        localStorage.setItem('token', token);
        localStorage.setItem('id', id); // Armazena o id no localStorage
    };

    const logout = () => {
        setNomeCompleto('');
        setToken('');
        setId('');
        setIsLoggedIn(false);
        localStorage.removeItem('nomeCompleto');
        localStorage.removeItem('token');
        localStorage.removeItem('id'); // Remove o id do localStorage
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, nomeCompleto, token, id, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);