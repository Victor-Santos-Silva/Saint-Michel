// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import ChatBotWidget from './components/ChatBot/ChatBotWidget.jsx'
// Importe os providers separadamente
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx'; 
import router from './router/router.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <ChatBotWidget />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);