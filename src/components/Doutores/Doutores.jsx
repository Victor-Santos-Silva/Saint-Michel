import React from 'react';
import { Link } from 'react-router-dom';
import './Doutores.css';

function Doutores({ id, nome, especialidade, crm, foto }) {
  return (
    <div className="doutor-card" data-aos="fade-up">
      <div className="doutor-image-container">
        <img
          src={foto}
          alt={`Dr. ${nome}`}
          className="doutor-image"
        />
      </div>

      <div className="doutor-info">
        <h3 className="doutor-nome">Dr. {nome}</h3>
        <p className="doutor-especialidade">{especialidade}</p>
        <p className="doutor-crm">CRM: {crm}</p>
      </div>
    </div>
  );
}

export default Doutores;