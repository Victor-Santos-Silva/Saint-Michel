import React, { useEffect, useState } from "react";
import "./Medico.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Doutores from "../../components/Doutores/Doutores";
import Aos from "aos";
import axios from "axios";

export default function Medico() {
  const [medicos, setMedicos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // Inicializa animações
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });

    // Busca médicos da API
    const fetchMedicos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/medico`);
        setMedicos(response.data);
        console.log(response.data);

        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar médicos:", error);
        setErro("Não foi possível carregar a lista de médicos. Tente novamente mais tarde.");
        setCarregando(false);
      }
    };

    fetchMedicos();
  }, []);

  return (
    <>
      <Navbar />

      <div className="medico-header">
        <img
          src="../src/img/nossos-medicos.png"
          className="img-servicos"
          alt="Nossos Médicos"
          data-aos="fade-down"
        />
        <div className='titulo-subtitulo-sobre' data-aos="fade-up">
          <h1 className='titulo-sobre'>OS MELHORES</h1>
          <h2 className='subTitulo-sobre-2'>Nossos Médicos</h2>
        </div>
      </div>

      <div className="medicos-container">
        {carregando ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Carregando médicos...</p>
          </div>
        ) : erro ? (
          <div className="error-message">
            <p>{erro}</p>
            <button onClick={() => window.location.reload()}>Tentar novamente</button>
          </div>
        ) : (
          <>
            <div className="medicos-grid">
              {medicos.map((medico) => (
                <Doutores
                  foto={`http://localhost:5000${medico.foto}`}
                  nome={medico.nome_completo}
                  especialidade={medico.especialidade}
                  crm={medico.crm}
                />
              ))}
            </div>
          </>

        )}
      </div>

      <Footer />
    </>
  );
}