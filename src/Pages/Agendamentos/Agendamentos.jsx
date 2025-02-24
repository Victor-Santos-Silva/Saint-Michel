import React, { useState, useEffect } from 'react';
import './Agendamentos.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const Agendamentos = () => {
  const [showModal, setShowModal] = useState(true);
  const [agendamentoPara, setAgendamentoPara] = useState('');
  const navigate = useNavigate(); // Hook para navegar entre páginas

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  const handleSelecionar = (opcao) => {
    if (opcao === 'Outra pessoa') {
      navigate('/agendamentos/dependente'); // Redireciona para a outra página
    } else {
      setAgendamentoPara(opcao);
      setShowModal(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Modal de seleção */}
      {showModal && (
        <div className="container-modal">
        <div className="modal">
          <div className="modal-content">
            <h2  className="tittle-contato">O exame é para você ou para outra pessoa?</h2>
            <button onClick={() => handleSelecionar('Para mim')}>Para mim</button>
            <button onClick={() => handleSelecionar('Outra pessoa')}>Outra pessoa</button>
          </div>
        </div>
        </div>
      )}

      {!showModal && (
        <>
          <img src="../src/img/Faça um agendamento.png" className="img-servicos" alt="Logo Serviços" data-aos="fade-down" />

          <div className="calendar-container" data-aos="fade-up">
            <h1 className="tittle-contato" data-aos="fade-right">Faça já seu agendamento</h1>
            <h1 className="team-title" data-aos="fade-left">Agende agora</h1>
          </div>

          <div className="container-form" data-aos="fade-left">
            <h2 className="title">Agendamento de Consulta</h2>
            <p><strong>Agendamento para:</strong> {agendamentoPara}</p> {/* Exibe a escolha do usuário */}

            <div className="form-grid">
              <div className="form-group">
                <label>Departamento</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Profissional</label>
                <input type="text" />
              </div>
              <div className="form-group">
                <label>Data</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Hora</label>
                <input type="time" />
              </div>
              <div className="form-group">
                <label>Tipo de Consulta</label>
                <select>
                  <option>Presencial</option>
                  <option>Online</option>
                </select>
              </div>
              <div className="form-group">
                <label>Convênio</label>
                <select>
                  <option>Convênio A</option>
                  <option>Convênio B</option>
                  <option>Convênio C</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Plano</label>
                <select>
                  <option>Plano Básico</option>
                  <option>Plano Intermediário</option>
                  <option>Plano Premium</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Exame</label>
                <select>
                  <optgroup label='Exames de Rotina'>
                    <option>Hemograma</option>
                    <option>Colesterol</option>
                    <option>Glicose</option>
                    <option>TSH e T4</option>
                    <option>Ureia e Creatina</option>
                  </optgroup>
                  <optgroup label='Exames de Imagem'>
                    <option>Radiografia</option>
                    <option>Ultrassom</option>
                    <option>Tomografia</option>
                    <option>Ressonância Magnética</option>
                  </optgroup>
                </select>
              </div>

            </div>
            <button className="submit-btn">Agendar</button>
            <br />
          </div>
          
        </>
      )}
<br />
      <Footer />
    </>
  );
};

export default Agendamentos;
