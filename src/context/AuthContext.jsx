import React, { createContext, useContext, useState, useEffect } from 'react';

// Cria o contexto
const AuthContext = createContext();

// Provedor do contexto que vai envolver a árvore de componentes
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nomeCompleto, setnomeCompleto] = useState('');

    // Verifica o estado de autenticação ao carregar o componente
    useEffect(() => {
        const storednomeCompleto = localStorage.getItem('nomeCompleto');

        if (storednomeCompleto) {
            setnomeCompleto(storednomeCompleto);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (nome) => {
        setnomeCompleto(nome);
        setIsLoggedIn(true);
    };

    const logout = () => {
        setnomeCompleto('');
        setIsLoggedIn(false);
        localStorage.removeItem('nomeCompleto');
        localStorage.removeItem('token');
        // Redireciona o usuário para a página de login (opcional)
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, nomeCompleto, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para consumir o contexto
export const useAuth = () => useContext(AuthContext);