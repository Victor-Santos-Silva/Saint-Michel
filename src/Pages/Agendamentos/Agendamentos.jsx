import React, { useState, useEffect } from 'react';
import './Agendamentos.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const examesPorTipo = {
  'Imagem': ['Raio-X', 'Ultrassom', 'Ressonância Magnética', 'Tomografia Computadorizada'],
  'Laboratorial': ['Exames de Sangue', 'Teste de Urina', 'Perfil Lipídico', 'Glicemia'],
  'Cardíaco': ['Eletrocardiograma', 'Teste de Esforço', 'Ecocardiograma']
};

const Agendamentos = () => {
  const [showModal, setShowModal] = useState(true);
  const [showServiceTypeModal, setShowServiceTypeModal] = useState(false);
  const [agendamentoPara, setAgendamentoPara] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [error, setError] = useState('');
  const [missingFields, setMissingFields] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [tipoExame, setTipoExame] = useState('');
  const [exameSelecionado, setExameSelecionado] = useState('');

  const navigate = useNavigate();

  // Função para resetar todos os estados
  const resetAllStates = () => {
    setShowModal(true);
    setShowServiceTypeModal(false);
    setAgendamentoPara('');
    setServiceType('');
    setEspecialidade('');
    setMedicos([]);
    setData('');
    setHora('');
    setMedicoSelecionado('');
    setError('');
    setMissingFields([]);
    setTipoExame('');
    setExameSelecionado('');
  };

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    setHorariosDisponiveis(gerarHorarios());
  }, [data]);

  useEffect(() => {
    if (especialidade && serviceType === 'consulta') {
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
  }, [especialidade, serviceType]);

  useEffect(() => {
    if (serviceType === 'exame') {
      setExameSelecionado('');
    }
  }, [tipoExame]);

  const getDataAtual = () => {
    const agora = new Date();
    return `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;
  };

  const getHoraAtual = () => {
    const agora = new Date();
    return `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
  };

  const gerarHorarios = () => {
    const horarios = [];
    const dataAtual = getDataAtual();
    const horaAtual = getHoraAtual();

    for (let h = 8; h <= 18; h++) {
      for (let m = 0; m < 60; m += 30) {
        const horaStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        const isPassado = data === dataAtual && horaStr < horaAtual;

        horarios.push({
          value: horaStr,
          label: horaStr,
          disabled: isPassado
        });
      }
    }
    return horarios;
  };

  const handleSelecionar = (opcao) => {
    if (opcao === 'Outra pessoa') {
      navigate('/agendamentos/dependente');
    } else {
      setAgendamentoPara(opcao);
      setShowModal(false);
      setShowServiceTypeModal(true);
    }
  };

  const handleServiceTypeSelect = (tipo) => {
    setServiceType(tipo);
    setShowServiceTypeModal(false);
  };

  const validateFields = () => {
    const requiredFields = [];

    if (serviceType === 'consulta') {
      if (!especialidade) requiredFields.push('especialidade');
      if (!medicoSelecionado) requiredFields.push('medico');
    }
    else if (serviceType === 'exame') {
      if (!tipoExame) requiredFields.push('tipoExame');
      if (!exameSelecionado) requiredFields.push('exame');
    }

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

    const dataAtual = getDataAtual();
    const horaAtual = getHoraAtual();

    if (data < dataAtual) {
      setError('Não é possível agendar para datas passadas.');
      return;
    }

    if (data === dataAtual && hora < horaAtual) {
      setError('Não é possível agendar para horários passados.');
      return;
    }

    const [horaSelecionada] = hora.split(':').map(Number);
    if (horaSelecionada < 8 || horaSelecionada > 18) {
      setError('O horário deve estar entre 08:00 e 18:00.');
      return;
    }

    const token = localStorage.getItem('token');
    const agendamentoData = {
      tipo: serviceType,
      ...(serviceType === 'consulta' && {
        especialidade,
        medico_id: medicoSelecionado
      }),
      ...(serviceType === 'exame' && {
        tipoExame,
        exame: exameSelecionado
      }),
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
        if (!response.ok) throw new Error('Erro ao agendar');
        return response.json();
      })
      .then(data => {
        alert('Agendamento realizado com sucesso!');
        resetAllStates();
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
              <button
                className="close-modal-button"
                onClick={resetAllStates}
              >
                X
              </button>
              <h2 className="tittle-contato">O serviço é para você ou outra pessoa?</h2>
              <button onClick={() => handleSelecionar('consulta')}>Para mim</button>
              <button onClick={() => handleSelecionar('Outra pessoa')}>Outra pessoa</button>
            </div>
          </div>
        </div>
      )}

      {showServiceTypeModal && (
        <div className="container-modal">
          <div className="modal">
            <div className="modal-content">
              <button
                className="close-modal-button"
                onClick={resetAllStates}
              >
                X
              </button>
              <h2 className="tittle-contato">Que tipo de serviço deseja agendar?</h2>
              <button onClick={() => handleServiceTypeSelect('consulta')}>Consulta Médica</button>
              <button onClick={() => handleServiceTypeSelect('exame')}>Exame</button>
            </div>
          </div>
        </div>
      )}

      {!showModal && !showServiceTypeModal && (
        <>
          <img src="../src/img/Faça um agendamento.png" className="img-servicos" alt="Logo Serviços" data-aos="fade-down" />

          <div className="calendar-container" data-aos="fade-up">
            <h1 className="tittle-contato" data-aos="fade-right">Faça já seu agendamento</h1>
            <h1 className="team-title" data-aos="fade-left">Agende agora</h1>
          </div>

          <div className="container-form-cliente" data-aos="fade-left">
            <h2 className="title">
              Agendamento de {serviceType === 'exame' ? 'Exame' : 'Consulta'}
            </h2>
    

            {error && <div className="error-message">{error}</div>}

            {serviceType === 'exame' ? (
              <div className="form-grid">
                <div className="form-group">
                  <label>Tipo de Exame</label>
                  <select
                    value={tipoExame}
                    onChange={(e) => {
                      setTipoExame(e.target.value);
                      setMissingFields(prev => prev.filter(f => f !== 'tipoExame'));
                    }}
                    className={isFieldMissing('tipoExame') ? 'campo-obrigatorio' : ''}
                  >
                    <option value="">Selecione o tipo</option>
                    {Object.keys(examesPorTipo).map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>

                  {tipoExame && (
                    <>
                      <label>Exame Específico</label>
                      <select
                        value={exameSelecionado}
                        onChange={(e) => {
                          setExameSelecionado(e.target.value);
                          setMissingFields(prev => prev.filter(f => f !== 'exame'));
                        }}
                        className={isFieldMissing('exame') ? 'campo-obrigatorio' : ''}
                      >
                        <option value="">Selecione o exame</option>
                        {examesPorTipo[tipoExame].map(exame => (
                          <option key={exame} value={exame}>{exame}</option>
                        ))}
                      </select>
                    </>
                  )}
              
              </div>
                  {/* Data  */}
                  <div>
                    <label>Data</label>
                    <input
                      type="date"
                      min={getDataAtual()}
                      value={data}
                      onChange={e => {
                        setData(e.target.value);
                        setMissingFields(prev => prev.filter(f => f !== 'data'));
                      }}
                      className={isFieldMissing('data') ? 'campo-obrigatorio' : ''}
                    />
                  </div>

                  {/* Hora  */}
                  <div>
                    <label>Hora</label>
                    <select
                      value={hora}
                      onChange={e => {
                        setHora(e.target.value);
                        setMissingFields(prev => prev.filter(f => f !== 'hora'));
                      }}
                      className={isFieldMissing('hora') ? 'campo-obrigatorio' : ''}
                    >
                      <option value="">Selecione um horário</option>
                      {horariosDisponiveis.map((horario) => (
                        <option
                          key={horario.value}
                          value={horario.value}
                          disabled={horario.disabled}
                        >
                          {horario.label}
                        </option>

                      ))}
                    </select>
                  </div>

                </div>
            ) : (
              <div className="form-grid">

                {/* Selecionar Especialidade */}
                <div>
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
                </div>

                {/* Selecionar medicos */}
                <div>
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


                {/* Data  */}
                <div>
                  <label>Data</label>
                  <input
                    type="date"
                    min={getDataAtual()}
                    value={data}
                    onChange={e => {
                      setData(e.target.value);
                      setMissingFields(prev => prev.filter(f => f !== 'data'));
                    }}
                    className={isFieldMissing('data') ? 'campo-obrigatorio' : ''}
                  />
                </div>

                {/* Hora  */}
                <div>
                  <label>Hora</label>
                  <select
                    value={hora}
                    onChange={e => {
                      setHora(e.target.value);
                      setMissingFields(prev => prev.filter(f => f !== 'hora'));
                    }}
                    className={isFieldMissing('hora') ? 'campo-obrigatorio' : ''}
                  >
                    <option value="">Selecione um horário</option>
                    {horariosDisponiveis.map((horario) => (
                      <option
                        key={horario.value}
                        value={horario.value}
                        disabled={horario.disabled}
                      >
                        {horario.label}
                      </option>

                    ))}
                  </select>
                </div>

              </div>
            )}
            <button onClick={handleAgendar} className="submit-btn">Agendar</button>
            <br />
          </div>
          <br />
        </>
      )
      }
      <Footer />
    </>
  );
};

export default Agendamentos;