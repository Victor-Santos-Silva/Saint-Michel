import React, { useState, useEffect } from 'react';
import './dependente.css';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/NavBar';

const AgendamentosDependentes = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [dataDeNascimento, setDataDeNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [genero, setGenero] = useState('');
  const [imagemPaciente, setImagemPaciente] = useState('/img/pacienteOutro.png');
  const [imagemGenero, setImagemGenero] = useState('/img/pacienteOutro.png');

  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [convenioMedico, setConvenioMedico] = useState('');
  const [planoConvenio, setPlanoConvenio] = useState('');
  const [etnia, setEtnia] = useState('');
  const [problemaSaude, setProblemaSaude] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');

  const [medicos, setMedicos] = useState([]);
  const [especialidade, setEspecialidade] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [camposFaltantes, setCamposFaltantes] = useState([]);

  const convenios = {
    "Amil": ["Amil 400", "Amil 500", "Amil 700", "Amil One", "Amil Fácil"],
    "Bradesco Saúde": ["Nacional Flex", "Top Nacional", "Efetivo", "Preferencial Plus"],
    "SulAmérica": ["Clássico", "Especial 100", "Executivo", "Prestige"],
    "Unimed": ["Unimed Nacional", "Unimed Estadual", "Unimed Local", "Unimed Fácil"],
    "Hapvida": ["Mix", "Pleno", "Master", "Nacional"],
    "NotreDame Intermédica": ["Smart", "Advance", "Premium", "Infinity"],
    "Porto Seguro Saúde": ["Bronze", "Prata", "Ouro", "Diamante"],
    "Golden Cross": ["Essencial", "Clássico", "Especial"],
    "Particular": ["Consulta Particular"],
  };

  useEffect(() => {
    let imgSrc = '/img/pacienteOutro.png';

    if (genero === 'Masculino') {
      imgSrc = '/img/pacienteM.png';
    } else if (genero === 'Feminino') {
      imgSrc = '/img/pacienteF.png';
    }

    setImagemPaciente(imgSrc);
    setImagemGenero(imgSrc);
  }, [genero]);

  const generateTimeSlots = (date) => {
    const slots = [];
    const startHour = 8;
    const endHour = 18;
    const interval = 30;
    const now = new Date();

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const time = new Date(date);
        time.setHours(hour, minute);
        if (time > now) {
          const timeString = time.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          });
          slots.push(timeString);
        }
      }
    }
    return slots;
  };

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      date.setHours(0, 0, 0, 0);
      const slots = generateTimeSlots(date);
      setAvailableTimes(slots);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (especialidade) {
      setLoading(true);
      fetch(`http://localhost:5000/medico/medicos?especialidade=${especialidade}`)
        .then(response => {
          if (!response.ok) throw new Error('Erro ao buscar médicos');
          return response.json();
        })
        .then(data => {
          console.log("Dados recebidos:", data);
          setMedicos(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Erro na requisição:", error);
          setError(error.message);
          setLoading(false);
        });
    } else {
      setMedicos([]);
    }
  }, [especialidade]);

  const handleAgendar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCamposFaltantes([]);

    try {
      const camposObrigatorios = {
        nomeCompleto,
        dataDeNascimento,
        cpf,
        rg,
        endereco,
        telefone,
        genero,
        imagemGenero,
        etnia,
        parentesco,
        selectedDate,
        selectedTime,
        especialidade,
        medicoSelecionado,
        convenioMedico,
        planoConvenio: convenioMedico !== 'Particular' ? planoConvenio || 'Não informado' : true

      };

      const faltantes = Object.keys(camposObrigatorios)
        .filter(key => camposObrigatorios[key] === undefined || camposObrigatorios[key] === null || camposObrigatorios[key] === '');


      if (faltantes.length > 0) {
        setCamposFaltantes(faltantes);
        throw new Error('Campos obrigatórios não preenchidos!');
      }

      const [hours, minutes] = selectedTime.split(':');
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      const now = new Date();
      now.setSeconds(0, 0);
      selectedDateTime.setSeconds(0, 0);
      if (selectedDateTime < now) {
        throw new Error('Não é possível agendar para datas/horários passados!');
      }

      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/agendamentoDocente/agendarDocente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          usuario_id: localStorage.getItem('userId'),
          medico_id: medicoSelecionado,
          especialidade,
          nomeCompleto,
          data: selectedDateTime.toISOString().split('T')[0],
          hora: selectedDateTime.toISOString().split('T')[1].slice(0, 5),
          cpf,
          rg,
          dataDeNascimento,
          telefone,
          endereco,
          genero,
          imagemGenero: imagemPaciente,
          etnia,
          problema_saude: problemaSaude,
          parentesco,
          convenioMedico,
          planoConvenio,
          tipoSanguineo,
        })
      });

      const dataDados = await response.json();
      console.log(dataDados);

      if (!response.ok) throw new Error(dataDados.message || 'Erro no agendamento');

      alert('Agendamento realizado com sucesso!');
      window.location.reload();

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isCampoFaltante = (campo) => camposFaltantes.includes(campo);

  return (
    <>
      <Navbar />
      <img src="../src/img/Faça um agendamento.png" className="img-servicos" alt="Logo Servicos" />
      <div className="calendar-container">
        <h1 className="tittle-contato">Faça já seu agendamento</h1>
        <h1 className="team-title">Agende agora</h1>
      </div>

      <div className="container-form-dependente">
        <h2 className="title">Agendamento para Dependentes</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-grid-dependente">
          {/* Campos do formulário com validação */}
          <div className={`form-group ${isCampoFaltante('nome') ? 'campo-obrigatorio' : ''}`}>
            <label>Nome Completo</label>
            <input
              type="text"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
            />
          </div>

          <div className={`form-group ${isCampoFaltante('dataNascimento') ? 'campo-obrigatorio' : ''}`}>
            <label>Data de Nascimento</label>
            <input
              type="date"
              value={dataDeNascimento}
              onChange={(e) => setDataDeNascimento(e.target.value)}
            />
          </div>

          <div className={`form-group ${isCampoFaltante('cpf') ? 'campo-obrigatorio' : ''}`}>
            <label>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className={`form-group ${isCampoFaltante('rg') ? 'campo-obrigatorio' : ''}`}>
            <label>RG</label>
            <input
              type="text"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
            />
          </div>

          <div className={`form-group ${isCampoFaltante('endereco') ? 'campo-obrigatorio' : ''}`}>
            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>

          <div className={`form-group ${isCampoFaltante('telefone') ? 'campo-obrigatorio' : ''}`}>
            <label>Telefone</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Gênero</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className={`form-group ${isCampoFaltante('etnia') ? 'campo-obrigatorio' : ''}`}>
            <label>Etnia</label>
            <select value={etnia} onChange={(e) => setEtnia(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Preto">Preto</option>
              <option value="Branco">Branco</option>
              <option value="Pardo">Pardo</option>
              <option value="Amarelo">Amarelo</option>
              <option value="Indígena">Indígena</option>
            </select>
          </div>

          <div className="form-group">
            <label className='opcional'>Problema de Saúde</label>
            <input
              type="text"
              value={problemaSaude}
              onChange={(e) => setProblemaSaude(e.target.value)}

            />
          </div>

          <div className={`form-group ${isCampoFaltante('parentesco') ? 'campo-obrigatorio' : ''}`}>
            <label>Parentesco</label>
            <select value={parentesco} onChange={(e) => setParentesco(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Pai/Mãe">Pai/Mãe</option>
              <option value="Filho(a)">Filho(a)</option>
              <option value="Cônjuge">Cônjuge</option>
              <option value="Irmão(ã)">Irmão(ã)</option>
              <option value="Avô(ó)">Avô(ó)</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className={`form-group ${isCampoFaltante('selectedDate') ? 'campo-obrigatorio' : ''}`}>
            <label>Data</label>
            <input
              type="date"
              value={selectedDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className={`form-group ${isCampoFaltante('selectedTime') ? 'campo-obrigatorio' : ''}`}>
            <label>Horário</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={!selectedDate}
            >
              <option value="">Selecione um horário</option>
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </select>
          </div>

          <div className={`form-group ${isCampoFaltante('especialidade') ? 'campo-obrigatorio' : ''}`}>
            <label>Especialidade</label>
            <select value={especialidade} onChange={(e) => setEspecialidade(e.target.value)}>
              <option value="">Selecione</option>
              <option value="Ortopedista">Ortopedista</option>
              <option value="Cardiologista">Cardiologista</option>
              <option value="Dermatologista">Dermatologista</option>
              <option value="Ginecologista">Ginecologista</option>
              <option value="Pediatra">Pediatra</option>
            </select>
          </div>

          <div className={`form-group ${isCampoFaltante('medicoSelecionado') ? 'campo-obrigatorio' : ''}`}>
            <label>Médico</label>
            <select
              value={medicoSelecionado}
              onChange={(e) => setMedicoSelecionado(e.target.value)}
              disabled={loading || !especialidade}
            >
              <option value="">Selecione um médico</option>
              {medicos.map((medico) => (
                <option key={medico.id} value={medico.id}>
                  {medico.nome_completo}
                </option>
              ))}
            </select>
          </div>

          <div className={`form-group ${isCampoFaltante('convenioMedico') ? 'campo-obrigatorio' : ''}`}>
            <label>Convênio Médico</label>
            <select
              value={convenioMedico}
              onChange={(e) => setConvenioMedico(e.target.value)}
            >
              <option value="">Selecione</option>
              {Object.keys(convenios).map((convenio) => (
                <option key={convenio} value={convenio}>{convenio}</option>
              ))}
            </select>
          </div>

          {convenioMedico && convenioMedico !== 'Particular' && (
            <div className={`form-group ${isCampoFaltante('planoConvenio') ? 'campo-obrigatorio' : ''}`}>
              <label>Plano</label>
              <select
                value={planoConvenio}
                onChange={(e) => setPlanoConvenio(e.target.value)}
              >
                <option value="">Selecione um plano</option>
                {convenios[convenioMedico].map((plano) => (
                  <option key={plano} value={plano}>{plano}</option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label className='opcional'>Tipo Sanguíneo</label>
            <select
              value={tipoSanguineo}
              onChange={(e) => setTipoSanguineo(e.target.value)}

            >
              {["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(tipo => (
                <option key={tipo} value={tipo}>{tipo || "Selecione"}</option>
              ))}
            </select>
          </div>

          <button
            className="submit-btn-dependente"
            onClick={handleAgendar}
            disabled={loading}
          >
            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default AgendamentosDependentes;