// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx'; // Contexto de autenticação
import router from './router/router.jsx'; // Importando as rotas

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </StrictMode>
);