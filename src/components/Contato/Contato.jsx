import React from "react";
import "./Contato.css";



const ContactInfo = [
  { title: "EMERGÊNCIA", info: "(11) 6918-1525", img: "../src/img/icons8-siren-96.png" },
  { title: "LOCALIZAÇÃO", info: "Av. Marechal Tito, 3400", img: "../src/img/LocationIcon.png" },
  { title: "E-MAIL", info: "saintmichiel@gmail.com", img: "../src/img/emailicon.png" },
  { title: "HORÁRIO DE TRABALHO", info: "Dom-Dom 09:00-20:00", img: "../src/img/icons8-clock-50.png" }
];

export default function Contato() {
  return (
    <>

      <div className="contact-section">
        <h2>ENTRE EM CONTATO</h2>
        <h3 className="CONTATO">Contato</h3>
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

    </>
  );
}