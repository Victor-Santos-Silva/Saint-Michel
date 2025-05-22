import React from "react";
import "./Contato.css";
import { useTheme } from '../../context/ThemeContext'; // Importe o hook do tema

const ContactInfo = [
  { title: "EMERGÊNCIA", info: "(11) 6918-1525", img: "../../img/icons8-siren-96.png" },
  { title: "LOCALIZAÇÃO", info: "Av. Marechal Tito, 3400", img: "../../img/LocationIcon.png" },
  { title: "E-MAIL", info: "saintmichiel@gmail.com", img: "../../img/emailicon.png" },
  { title: "HORÁRIO DE TRABALHO", info: "Dom-Dom 24 Horas", img: "../../img/icons8-clock-50.png" }
];

export default function Contato() {
  const { darkMode } = useTheme(); // Use o hook do tema

  return (
    <>
      <div className={`contact-section ${darkMode ? 'dark' : ''}`}>
        <p className="titulo">ENTRE EM CONTATO</p>
        <h3 className="CONTATO">Contato</h3>
        <div className="contact-grid">
          {ContactInfo.map((item, index) => (
            <div key={index} className={`contact-card ${darkMode ? 'dark' : ''}`}>
              <div className="contact-img">
                <img
                  src={item.img}
                  alt={item.title}
                  className={darkMode ? 'dark-icon' : ''} // Classe para ícones
                />
              </div>
              <h4>{item.title}</h4>
              <p>{item.info}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}