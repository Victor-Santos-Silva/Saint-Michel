import React from 'react';
import './Contato.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import Contato from '../../components/Contato/Contato';

const ContactInfo = [
  { title: "EMERGÊNCIA", info: "(11) 6918-1525", img: "../src/img/icons8-siren-96.png" },
  { title: "LOCALIZAÇÃO", info: "Av. Manoel da Silva, 3400", img: "../src/img/LocationIcon.png" },
  { title: "E-MAIL", info: "saintmichiel@gmail.com", img: "../src/img/emailicon.png" },
  { title: "HORÁRIO DE TRABALHO", info: "Dom-Dom 09:00-20:00", img: "../src/img/icons8-clock-50.png" }
];

const Contatos = () => {
  return (
    <>
      <Navbar />
      <img src="../src/img/Contatos.png" className="img-servicos" alt="Logo Servicos" />
<br /><br />
        <div className="map-container">
          <iframe
            title="Localização"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192186343984!2d-122.41941518468147!3d37.77492977975914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cba3f0e2f%3A0x4c4e4c4c4c4c4c4c4c!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sbr!4v1615395398274!5m2!1sen!2sbr"
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
        <form className="contato-form">
          <div className="form-row">
            <input type="text" name="nome" placeholder="Nome" required className="placeholder-branco" />
            <input type="email" name="email" placeholder="Email" required className="placeholder-branco" />
          </div>
          <input type="text" name="assunto" placeholder="  Assunto" required className="placeholder-branco" />
          <textarea name="mensagem" placeholder="  Mensagem" required className="placeholder-branco"></textarea>
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
