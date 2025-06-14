import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contato.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import Contato from '../../components/Contato/Contato';
import { useTheme } from '../../context/ThemeContext';

const Contatos = () => {
  const { darkMode } = useTheme();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = [];

    if (!nome.trim()) errors.push('✖ O nome é obrigatório');
    if (!email.trim()) {
      errors.push('✖ O email é obrigatório');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('✖ Por favor, insira um email válido');
    }
    if (!assunto.trim()) errors.push('✖ O assunto é obrigatório');
    if (!mensagem.trim()) errors.push('✖ A mensagem é obrigatória');

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? 'dark' : 'light'
      }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/contato', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          assunto,
          mensagem
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao enviar formulário');
      }

      toast.success('✓ Mensagem enviada com sucesso!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? 'dark' : 'light'
      });

      // Limpar campos
      setNome('');
      setEmail('');
      setAssunto('');
      setMensagem('');

    } catch (error) {
      toast.error(`✖ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? 'dark' : 'light'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />

      <Navbar />
      <img 
        src="../img/Contatos.png" 
        className={`img-servicos ${darkMode ? 'dark-img' : ''}`} 
        alt="Logo Servicos" 
      />
      <br /><br />
      <div className={`map-container ${darkMode ? 'dark' : ''}`}>
        <iframe
          title="Localização"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.1234567890123!2d-46.4110!3d-23.5000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sAv.+Marechal+Tito,+3400!5e0!3m2!1sen!2sbr!4v1615395398274!5m2!1sen!2sbr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <br />
      <div className={`contato-container ${darkMode ? 'dark' : ''}`}>
        <h2 className={`titulo-contato ${darkMode ? 'dark-text' : ''}`}>ENTRE EM CONTATO</h2>
        <h3 className={`subtitulo-contato ${darkMode ? 'dark-text' : ''}`}>Contato</h3>
        <form className={`contato-form ${darkMode ? 'dark-form' : ''}`} onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={darkMode ? 'dark-input' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={darkMode ? 'dark-input' : ''}
              />
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="assunto"
              placeholder="Assunto"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              className={darkMode ? 'dark-input' : ''}
            />
          </div>
          <div className="input-group">
            <textarea
              name="mensagem"
              placeholder="Mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              className={darkMode ? 'dark-input' : ''}
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={darkMode ? 'dark-btn' : ''}
          >
            {isSubmitting ? 'Enviando...' : 'ENVIAR'}
          </button>
        </form>
      </div>

      <Contato darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Contatos;