import React, { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto
const AuthContext = createContext();

// Duração da sessão em minutos
const EXPIRATION_MINUTES = 30;

// Provedor do contexto que vai envolver a árvore de componentes
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nomeCompleto, setnomeCompleto] = useState('');

    useEffect(() => {
        const storednomeCompleto = localStorage.getItem('nomeCompleto');
        const expirationTime = localStorage.getItem('expirationTime');

        if (storednomeCompleto && expirationTime) {
            const now = new Date().getTime();

            if (now < Number(expirationTime)) {
                setnomeCompleto(storednomeCompleto);
                setIsLoggedIn(true);
            } else {
                logout(); // Se o tempo expirou, desloga
            }
        }
    }, []);

    const login = (nome) => {
        setnomeCompleto(nome);
        setIsLoggedIn(true);

        localStorage.setItem('nomeCompleto', nome);

        const expirationTime = new Date().getTime() + EXPIRATION_MINUTES * 60 * 1000; // 30 min
        localStorage.setItem('expirationTime', expirationTime.toString());
    };

    const logout = () => {
        setnomeCompleto('');
        setIsLoggedIn(false);
        localStorage.removeItem('nomeCompleto');
        localStorage.removeItem('expirationTime');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, nomeCompleto, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir o contexto
export const useAuth = () => useContext(AuthContext);
