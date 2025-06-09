import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext'; // Ajuste o caminho conforme necessário
import './carrosselMedicos.css';

function CarouselMedico() {
  const carousel = useRef();
  const innerCarousel = useRef();
  const [width, setWidth] = useState(0);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme(); // Usando o contexto de tema

  // Busca os médicos do banco de dados
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await axios.get('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/medico');
        setMedicos(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);

  // Calcula a largura do carrossel após carregar os médicos
  useEffect(() => {
    if (carousel.current && innerCarousel.current && medicos.length > 0) {
      const carouselWidth = carousel.current.offsetWidth;
      const innerWidth = innerCarousel.current.scrollWidth;
      setWidth(innerWidth - carouselWidth);
    }
  }, [medicos]);

  if (loading) return <div className={`loading ${darkMode ? 'dark' : ''}`}>Carregando médicos...</div>;
  if (error) return <div className={`error ${darkMode ? 'dark' : ''}`}>Erro: {error}</div>;

  return (
    <div className={`divPrincipal ${darkMode ? 'dark' : ''}`}>
      <motion.div 
        ref={carousel} 
        className={`carrosselMedicos ${darkMode ? 'dark' : ''}`} 
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          ref={innerCarousel}
          className='inner'
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {medicos.map((medico) => (
            <motion.div className='item' key={medico.id}>
              <div className={`card-medico ${darkMode ? 'dark' : ''}`}>
                <div className="info-medico">
                  <img 
                    src={`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net${medico.foto}`} 
                    alt="" 
                    className='img-carrosel'
                  />
                  <h3 className={darkMode ? 'dark' : ''}>Dr. {medico.nome_completo}</h3>
                  <p className={darkMode ? 'dark' : ''}>{medico.especialidade}</p>
                  <p className={darkMode ? 'dark' : ''}>CRM: {medico.crm}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CarouselMedico;