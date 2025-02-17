import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import "./Footer.css"; // Importando o CSS

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="src/img/FooterLogo.png" alt="Logo do Hospital Saint-Michel" className="logo-footer" style={{ width: '280px' }}  />
          <p>Cuidar de você é nossa missão divina</p>
        </div>

        <div className="footer-links">
          <h3 className="sub-bold">Links Importantes</h3>
          <ul>
            <br />
            <li><a href="/agendamentos">Agendamentos</a></li>
            <li><a href="/doutores">Doutores</a></li>
            <li><a href="/servicos">Serviços</a></li>
            <li><a href="/sobre">Sobre nós</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3 className="sub-bold">Fale Conosco</h3>
          <br />
          <p><strong>Telefone:</strong> (11) 6818-1255</p>
          <p><strong>Email:</strong> saintmichel@gmail.com</p>
          <p><strong>Endereço:</strong> Av. Marechal Tito, 3400</p>
          <p>Brasil</p>
        </div>

        <div className="footer-newsletter">
          <h3 className="sub-bold">Informações</h3>
          <br />
          <div className="newsletter-box">
            <input type="email" placeholder="Digite seu email aqui" />
            <button><FaPaperPlane /></button>
          </div>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p>© 2025 Direitos reservados hospital Saint-Michel by PNTEC-LTD</p>
        <div className="footer-partners">
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
