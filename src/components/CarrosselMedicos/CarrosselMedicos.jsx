import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; // ou sua biblioteca HTTP preferida
import './carrosselMedicos.css';

function CarouselMedico() {
  const carousel = useRef();
  const innerCarousel = useRef();
  const [width, setWidth] = useState(0);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os médicos do banco de dados
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        // Substitua pela URL da sua API
        const response = await axios.get('http://localhost:5000/medico');
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

  if (loading) return <div className="loading">Carregando médicos...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className='divPrincipal'>
      <motion.div ref={carousel} className='carrosselMedicos' whileTap={{ cursor: "grabbing" }}>
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
              <div className="card-medico">
                <div className="info-medico">
                  <img src={`http://localhost:5000${medico.foto}`} alt="" className='img-carrosel'/>
                  <h3>Dr. {medico.nome_completo}</h3>
                  <p>{medico.especialidade}</p>
                  <p>CRM: {medico.crm}</p>
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