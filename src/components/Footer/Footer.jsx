import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <img src="../src/img/FooterLogo.png" />
        </div>

        <div className="footer-section">
          <h3>Links Importantes</h3>
          <ul>
            <li><a href="/agendamentos">Agendamentos</a></li>
            <li><a href="/doutores">Doutores</a></li>
            <li><a href="/servicos">Serviços</a></li>
            <li><a href="/sobre">Sobre nós</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Fale Conosco</h3>
          <p><strong>Telefone:</strong> (11) 6818-1255</p>
          <p><strong>Email:</strong> saintmichel@gmail.com</p>
          <p><strong>Endereço:</strong> Av. Marechal Tito, 3400</p>
          <p>Brasil</p>
        </div>
      </div>

      <hr />

      <div className="footer-bottom">
        <p className="direitos">© 2025 Direitos reservados Hospital Saint-Michel by PNTEC-LTD</p>
        <div>
          <span>Parcerias:</span> <strong className="libbs-footer">Libbs</strong>
        </div>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/saint-michael-hospital-47ab05359/" target="_blank"><FaLinkedin /></a>
          <a href="https://www.instagram.com/hospital.saintmichel/" target="_blank"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
}
