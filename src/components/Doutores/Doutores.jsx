import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Doutores.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

const doctors = [
  { name: "Dr. Flávio", specialty: "Neurologista", image: "src/img/MedicoNego1.png" },
  { name: "Dr. Márcio", specialty: "Neurologista", image: "src/img/marcio.png" },
  { name: "Dra. Ellen", specialty: "Neurologista", image: "src/img/ellen.png" }
];

const DoctorCard = ({ name, specialty, image }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="card-info-doutores" data-aos="fade-down">
      <img src={image} alt={name} className="doctor-image" />
      <div className="texto-doutores">
        <h3 className="card-info-h3">{name}</h3>
        <p className="card-info-p"><b>{specialty}</b></p>
      </div>
      <div className="social-icons">
        <img src="src/img/icons8-facebook-novo-30.png" alt="Facebook" className="social-icon"/>
        <img src="src/img/icons8-instagram-30.png" alt="Instagram" className="social-icon"/>
        <img src="src/img/icons8-linkedin-30 (1).png" alt="LinkedIn" className="social-icon"/>
      </div>
      <button className="profile-button-doutores">Visualizar Perfil</button>
    </div>
  );
};

const Medico = () => (
  <>
    <div className="card-doutores" data-aos="fade-up">
      <div className="container-doutores">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} {...doctor} />
        ))}
      </div>
    </div>
  </>
);

export default Medico;
