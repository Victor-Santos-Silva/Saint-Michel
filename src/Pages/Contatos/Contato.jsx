import React, { useState } from 'react';
import './Contato.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';

const ContactInfo = [
  { title: "EMERGÊNCIA", info: "(11) 6918-1525", img: "../src/img/icons8-siren-96.png" },
  { title: "LOCALIZAÇÃO", info: "Av. Manoel da Silva, 3400", img: "../src/img/LocationIcon.png" },
  { title: "E-MAIL", info: "saintmichiel@gmail.com", img: "../src/img/emailicon.png" },
  { title: "HORÁRIO DE TRABALHO", info: "Dom-Dom 09:00-20:00", img: "../src/img/icons8-clock-50.png" }
];

const Contatos = () => {
  // Estados para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Estados para erros de validação
  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  // Função para validar o email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Função para validar o formulário
  const validateForm = () => {
    let valid = true;
    const newErrors = { nome: '', email: '', assunto: '', mensagem: '' };

    // Validação do Nome
    if (!nome.trim()) {
      newErrors.nome = 'O nome é obrigatório.';
      valid = false;
    }

    // Validação do Email
    if (!email.trim()) {
      newErrors.email = 'O email é obrigatório.';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Por favor, insira um email válido.';
      valid = false;
    }

    // Validação do Assunto
    if (!assunto.trim()) {
      newErrors.assunto = 'O assunto é obrigatório.';
      valid = false;
    }

    // Validação da Mensagem
    if (!mensagem.trim()) {
      newErrors.mensagem = 'A mensagem é obrigatória.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Se o formulário for válido, pode enviar os dados
      alert('Formulário enviado com sucesso!');
      // Aqui você pode adicionar a lógica para enviar os dados para o backend
      console.log({ nome, email, assunto, mensagem });

      // Limpar os campos após o envio
      setNome('');
      setEmail('');
      setAssunto('');
      setMensagem('');
      setErrors({ nome: '', email: '', assunto: '', mensagem: '' });
    } else {
      alert('Por favor, corrija os erros antes de enviar.');
    }
  };

  return (
    <>
      <Navbar />
      <img src="../src/img/Contatos.png" className="img-servicos" alt="Logo Servicos" />
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
                required
                className={errors.nome ? 'input-error' : ''}
              />
              {errors.nome && <span className="error-message">{errors.nome}</span>}
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="assunto"
              placeholder="Assunto"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              required
              className={errors.assunto ? 'input-error' : ''}
            />
            {errors.assunto && <span className="error-message">{errors.assunto}</span>}
          </div>
          <div className="input-group">
            <textarea
              name="mensagem"
              placeholder="Mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              required
              className={errors.mensagem ? 'input-error' : ''}
            />
            {errors.mensagem && <span className="error-message">{errors.mensagem}</span>}
          </div>
          <button type="submit">ENVIAR</button>
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