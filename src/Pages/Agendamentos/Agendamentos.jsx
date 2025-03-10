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
  const [missingFields, setMissingFields] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (especialidade) {
      setLoading(true);
      fetch(`http://localhost:5000/medico/medicos?especialidade=${especialidade}`)
        .then(response => {
          if (!response.ok) throw new Error('Erro ao buscar médicos');
          return response.json();
        })
        .then(data => {
          setMedicos(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setMedicos([]);
    }
  }, [especialidade]);

  const handleSelecionar = (opcao) => {
    if (opcao === 'Outra pessoa') {
      navigate('/agendamentos/dependente');
    } else {
      setAgendamentoPara(opcao);
      setShowModal(false);
    }
  };

  const validateFields = () => {
    const requiredFields = [];
    if (!especialidade) requiredFields.push('especialidade');
    if (!medicoSelecionado) requiredFields.push('medico');
    if (!data) requiredFields.push('data');
    if (!hora) requiredFields.push('hora');

    setMissingFields(requiredFields);
    return requiredFields.length === 0;
  };

  const handleAgendar = () => {
    setError('');
    if (!validateFields()) {
      setError('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const token = localStorage.getItem('token');
    const agendamentoData = {
      especialidade,
      medico_id: medicoSelecionado,
      data,
      hora
    };

    fetch('http://localhost:5000/agendamento/agendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(agendamentoData),
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao agendar consulta');
      return response.json();
    })
    .then(data => {
      alert('Agendamento realizado com sucesso!');
      // Resetar formulário
      setEspecialidade('');
      setMedicoSelecionado('');
      setData('');
      setHora('');
    })
    .catch(error => {
      setError(error.message || 'Erro ao processar agendamento');
    });
  };

  const isFieldMissing = (fieldName) => missingFields.includes(fieldName);

  return (
    <>
      <Navbar />

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

            {error && <div className="error-message">{error}</div>}

            <div className="form-grid">
              <div className="form-group">
                <label>Especialidade</label>
                <select 
                  value={especialidade} 
                  onChange={e => {
                    setEspecialidade(e.target.value);
                    setMissingFields(prev => prev.filter(f => f !== 'especialidade'));
                  }}
                  className={isFieldMissing('especialidade') ? 'campo-obrigatorio' : ''}
                >
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
                    setMissingFields(prev => prev.filter(f => f !== 'medico'));
                  }}
                  className={isFieldMissing('medico') ? 'campo-obrigatorio' : ''}
                >
                  {loading ? (
                    <option>Carregando...</option>
                  ) : error ? (
                    <option style={{ color: 'red' }}>{error}</option>
                  ) : (
                    <>
                      <option value="">Selecione um médico</option>
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
                <input 
                  type="date" 
                  value={data} 
                  onChange={e => {
                    setData(e.target.value);
                    setMissingFields(prev => prev.filter(f => f !== 'data'));
                  }}
                  className={isFieldMissing('data') ? 'campo-obrigatorio' : ''}
                />
              </div>
            </div>

            <div className="form-group-hora">
              <label>Hora</label>
              <input 
                type="time" 
                value={hora} 
                onChange={e => {
                  setHora(e.target.value);
                  setMissingFields(prev => prev.filter(f => f !== 'hora'));
                }}
                className={isFieldMissing('hora') ? 'campo-obrigatorio' : ''}
              />
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