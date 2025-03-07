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
  const [especialidade, setEspecialidade] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');


  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook para navegar entre páginas

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (especialidade) {
      setLoading(true);
      fetch(`http://localhost:5000/medico/medicos?especialidade=${especialidade}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Erro ao buscar médicos');
          }
          return response.json();
        })
        .then(data => {
          console.log('Médicos encontrados:', data); // Adicionando log para depuração
          setMedicos(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erro ao buscar médicos:', error);
          setError(error.message);
          setLoading(false);
        });
    } else {
      setMedicos([]);
    }
  }, [especialidade]);

  const handleSelecionar = (opcao) => {
    if (opcao === 'Outra pessoa') {
      navigate('/agendamentos/dependente'); // Redireciona para a outra página
    } else {
      setAgendamentoPara(opcao);
      setShowModal(false);
    }
  };

  const handleAgendar = () => {

    if (!medicoSelecionado || !data || !hora) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    console.log("Médico selecionado:", medicoSelecionado);

    const token = localStorage.getItem('token'); // Obtemos o token do localStorage
    console.log('Token enviado: ', token);


    const agendamentoData = {
      especialidade,
      medico_id: medicoSelecionado,
      data,
      hora
    };

    try {
      // Envia os dados para o backend
      fetch('http://localhost:5000/agendamento/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(agendamentoData),
      })
        .then(response => response.json())
        .then(data => {
          alert('Agendamento realizado com sucesso!');
          console.log(data);
          // Se quiser resetar o formulário após o agendamento
          setEspecialidade('');
          setMedicoSelecionado('');
          setData('');
          setHora('');
        })
        .catch(error => {
          alert('Erro ao agendar a consulta');
          console.error('Erro:', error);
        });
    } catch (error) {
      alert('Erro ao agendar a consulta por algum santo motivo', error);
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
              <h2 className="tittle-contato">O exame é para você ou para outra pessoa?</h2>
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

          <div className="container-form-cliente" data-aos="fade-left">
            <h2 className="title">Agendamento de Consulta</h2>
            <p><strong>Agendamento para:</strong> {agendamentoPara}</p>

            <div className="form-grid">
              <div className="form-group">
                <label>Especialidade</label>
                <select value={especialidade} onChange={e => setEspecialidade(e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Ortopedista">Ortopedista</option>
                  <option value="Proctologista">Proctologista</option>
                  <option value="Oncologista">Oncologista</option>
                  <option value="Otorrinolaringologista">Otorrinolaringologista</option>
                  <option value="Oftalmologista">Oftalmologista</option>
                  <option value="Cardiologista">Cardiologista</option>
                  <option value="Pneumologista">Pneumologista</option>
                  <option value="Nefrologista">Nefrologista</option>
                  <option value="Gastroenterologista">Gastroenterologista</option>
                  <option value="Urologista">Urologista</option>
                  <option value="Dermatologista">Dermatologista</option>
                  <option value="Ginecologista">Ginecologista</option>
                </select>

                <label>Médico</label>
                <select
                  value={medicoSelecionado}
                  onChange={e => {
                    const selectedMedicoId = parseInt(e.target.value, 10);
                    setMedicoSelecionado(selectedMedicoId);
                    console.log("Médico selecionado:", selectedMedicoId); // Verifique o valor selecionado
                  }}
                >
                  {loading ? (
                    <option>Carregando...</option>
                  ) : error ? (
                    <option style={{ color: 'red' }}>{error}</option>
                  ) : (
                    <>
                      <option value="">Selecione um médico</option> {/* Valor inicial vazio */}
                      {medicos.map(medico => (
                        <option key={medico.id} value={medico.id}>
                          {medico.nome_completo}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label>Data</label>
                <input type="date" value={data} onChange={e => setData(e.target.value)} />
              </div>
            </div>

            <div className="form-group-hora">
              <label>Hora</label>
              <input type="time" value={hora} onChange={e => setHora(e.target.value)} />
            </div>
            <button onClick={handleAgendar} className="submit-btn">Agendar</button>
            <br />
          </div>
          <br />

        </>
      )}
      <Footer />
    </>
  );
};

export default Agendamentos;
