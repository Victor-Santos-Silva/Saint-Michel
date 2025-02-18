import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo" style={{ marginLeft: '-30px' }}> 
          <img src="src/img/FooterLogo.png" alt="Logo do Hospital Saint-Michel" style={{width: '15rem', marginRight: '5rem'}} />
        </div>
<br />
        <div style={{ marginRight: '8rem' }}>
          <h3>Links Importantes</h3>
          <ul>
            <li><a href="/agendamentos">Agendamentos</a></li>
            <li><a href="/doutores">Doutores</a></li>
            <li><a href="/servicos">Serviços</a></li>
            <li><a href="/sobre">Sobre nós</a></li>
          </ul>
        </div>

        <div style={{ marginRight: '6rem' }}>
          <h3>Fale Conosco</h3>
          <p><strong>Telefone:</strong> (11) 6818-1255</p>
          <p><strong>Email:</strong> saintmichel@gmail.com</p>
          <p><strong>Endereço:</strong> Av. Marechal Tito, 3400</p>
          <p>Brasil</p>
        </div>

        <div>
          <h3>Informações</h3>
          <div className="newsletter-box">
            <input type="email" placeholder="Digite seu email aqui" />
            <button><FaPaperPlane /></button>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 Direitos reservados Hospital Saint-Michel by PNTEC-LTD</p>
        <div>
          <span>Parcerias:</span> <strong>Libbs</strong>
        </div>
        <div className="footer-social">
          <FaLinkedin />
          <FaFacebook />
          <FaInstagram />
        </div>
      </div>
    </footer>
  );
}
