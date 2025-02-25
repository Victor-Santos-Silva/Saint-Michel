import React, { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto
const AuthContext = createContext();

// Duração da sessão em minutos
const EXPIRATION_MINUTES = 30;

// Provedor do contexto que vai envolver a árvore de componentes
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const expirationTime = localStorage.getItem('expirationTime');

        if (storedUsername && expirationTime) {
            const now = new Date().getTime();

            if (now < Number(expirationTime)) {
                setUsername(storedUsername);
                setIsLoggedIn(true);
            } else {
                logout(); // Se o tempo expirou, desloga
            }
        }
    }, []);

    const login = (nome) => {
        setUsername(nome);
        setIsLoggedIn(true);

        localStorage.setItem('username', nome);

        const expirationTime = new Date().getTime() + EXPIRATION_MINUTES * 60 * 1000; // 30 min
        localStorage.setItem('expirationTime', expirationTime.toString());
    };

    const logout = () => {
        setUsername('');
        setIsLoggedIn(false);
        localStorage.removeItem('username');
        localStorage.removeItem('expirationTime');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir o contexto
export const useAuth = () => useContext(AuthContext);
