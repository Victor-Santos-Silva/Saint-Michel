import React from "react";
import "./Doutores.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

const doctors = [
  { name: "Dr. Flávio", specialty: "Neurologista", image: "src/img/MedicoNego1.png" },
  { name: "Dr. Márcio", specialty: "Neurologista", image: "src/img/marcio.png" },
  { name: "Dra. Ellen", specialty: "Neurologista", image: "src/img/ellen.png" },
  { name: "Dr. Flávio", specialty: "Neurologista", image: "src/img/MedicoNego1.png" },
  { name: "Dr. Márcio", specialty: "Neurologista", image: "src/img/marcio.png" },
  { name: "Dra. Ellen", specialty: "Neurologista", image: "src/img/ellen.png" },
];

const DoctorCard = ({ name, specialty, image }) => {
  return (
    <>
      <div>
        <div className="card-info-doutores">
        <img src={image} alt={name} className="doctor-image" />
    
          <div className="texto-doutores">
            <h3 className="card-info-h3">{name}</h3>
            <p className="card-info-p"><b>{specialty}</b></p>
          </div>
          <div className="social-icons">
            <i className="fab fa-facebook"><img src="src/img/icons8-facebook-novo-30.png" alt="" /></i>
            <i className="fab fa-instagram"><img src="src/img/icons8-instagram-30.png" alt="" /></i>
            <i className="fab fa-linkedin"><img src="src/img/icons8-linkedin-30 (1).png" alt="" /></i>
          </div>
          <button className="profile-button-doutores">Visualizar Perfil</button>
        </div>
      </div>
    </>
  );
};

const Medico = () => {
  return (
    <>
      <div className="card-doutores">
        <div className="container-doutores">
          {doctors.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Medico;
