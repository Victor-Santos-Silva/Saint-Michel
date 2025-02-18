import React, { createContext, useContext, useState } from 'react';

// Cria o contexto
const AuthContext = createContext();

// Provedor do contexto que vai envolver a árvore de componentes
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const login = (name) => {
        setUsername(name);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setUsername('');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir o contexto
export const useAuth = () => useContext(AuthContext);
