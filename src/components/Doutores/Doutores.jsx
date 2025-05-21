import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Doutores.css';

function Doutores({ id, nome, especialidade, crm, foto }) {
  const { darkMode } = useTheme();

  return (
    <div className={`doutor-card ${darkMode ? 'dark' : ''}`} data-aos="fade-up">
      <div className={`doutor-image-container ${darkMode ? 'dark' : ''}`}>
        <img
          src={foto}
          alt={`Dr. ${nome}`}
          className={`doutor-image ${darkMode ? 'dark' : ''}`}
        />
      </div>

      <div className={`doutor-info ${darkMode ? 'dark' : ''}`}>
        <h3 className={`doutor-nome ${darkMode ? 'dark' : ''}`}>Dr. {nome}</h3>
        <p className={`doutor-especialidade ${darkMode ? 'dark' : ''}`}>{especialidade}</p>
        <p className={`doutor-crm ${darkMode ? 'dark' : ''}`}>CRM: {crm}</p>
      </div>
    </div>
  );
}

export default Doutores;