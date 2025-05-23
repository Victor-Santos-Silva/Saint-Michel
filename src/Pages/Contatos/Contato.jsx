import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contato.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const ContactInfo = [
  { title: "EMERGÊNCIA", info: "(11) 6918-1525", img: "/img/icons8-siren-96.png" },
  { title: "LOCALIZAÇÃO", info: "Av. Marechal Tito, 3400", img: "/img/LocationIcon.png" },
  { title: "E-MAIL", info: "saintmichiel@gmail.com", img: "../img/emailicon.png" },
  { title: "HORÁRIO DE TRABALHO", info: "Dom-Dom 24 Horas", img: "/img/icons8-clock-50.png" }
];

const Contatos = () => {
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
      const response = await fetch('http://localhost:5000/contato', {
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
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
      />
      
      <Navbar />
      <img src="../img/Contatos.png" className="img-servicos" alt="Logo Servicos" />
      <br /><br />
      <div className="map-container">
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
      <div className="contato-container">
        <h2 className="titulo-contato">ENTRE EM CONTATO</h2>
        <h3 className="subtitulo-contato">Contato</h3>
        <form className="contato-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <input
                type="text"
                name="nome"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          <div className="input-group">
            <textarea
              name="mensagem"
              placeholder="Mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'ENVIAR'}
          </button>
        </form>
      </div>

      <div className="contact-section">
        <div className="contact-grid">
          {ContactInfo.map((item, index) => (
            <div key={index} className="contact-card">
              <div className="contact-img">
                <img src={item.img} alt={item.title} />
              </div>
              <h4>{item.title}</h4>
              <p>{item.info}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contatos;