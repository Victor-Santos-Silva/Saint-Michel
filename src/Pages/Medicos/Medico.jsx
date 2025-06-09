import React, { useEffect, useState } from "react";
import "./Medico.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Doutores from "../../components/Doutores/Doutores";
import Aos from "aos";
import axios from "axios";
import { useTheme } from '../../context/ThemeContext';

export default function Medico() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });

    const fetchMedicos = async () => {
      try {
        const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/medico`);
        setMedicos(response.data);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar médicos:", error);
        setErro("Não foi possível carregar a lista de médicos. Tente novamente mais tarde.");
        setCarregando(false);
      }
    };

    fetchMedicos();
  }, []);

  useEffect(() => {
    Aos.refresh();
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <img
        src="../img/nossos-medicos.png"
        alt="Nossos Médicos"
        className="img-servicos"
        data-aos="fade-down"
      />
      <div className={`medico-header ${darkMode ? 'dark' : ''}`}>

        <div className={`titulo-subtitulo-sobre ${darkMode ? 'dark' : ''}`} data-aos="fade-up">
          <h2 className={`titulo-contato ${darkMode ? 'dark' : ''}`}>OS MELHORES</h2>
          <h3 className={`subtitulo-contato ${darkMode ? 'dark' : ''}`}>Médicos</h3>
        </div>
      </div>

      <div className={`medicos-container ${darkMode ? 'dark' : ''}`}>
        {carregando ? (
          <div className={`loading-spinner ${darkMode ? 'dark' : ''}`}>
            <div className="spinner"></div>
            <p>Carregando médicos...</p>
          </div>
        ) : erro ? (
          <div className={`error-message ${darkMode ? 'dark' : ''}`}>
            <p>{erro}</p>
            <button
              className={darkMode ? 'dark' : ''}
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <div className="medicos-grid">
            {medicos.map((medico) => (
              <Doutores
                key={medico.id}
                foto={`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net${medico.foto}`}
                nome={medico.nome_completo}
                especialidade={medico.especialidade}
                crm={medico.crm}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}