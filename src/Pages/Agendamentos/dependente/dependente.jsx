import React, { useState, useEffect } from 'react';
import './dependente.css';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/NavBar';

const AgendamentosDependentes = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [genero, setGenero] = useState('');
  const [etnia, setEtnia] = useState('');
  const [problemaSaude, setProblemaSaude] = useState('');
  const [parentesco, setParentesco] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [medicoSelecionado, setMedicoSelecionado] = useState('');
  const [convenioMedico, setConvenioMedico] = useState('');
  const [planoConvenio, setPlanoConvenio] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const convenios = {
    "Amil": ["Amil 400", "Amil 500", "Amil 700", "Amil One", "Amil Fácil"],
    "Bradesco Saúde": ["Nacional Flex", "Top Nacional", "Efetivo", "Preferencial Plus"],
    "SulAmérica": ["Clássico", "Especial 100", "Executivo", "Prestige"],
    "Unimed": ["Unimed Nacional", "Unimed Estadual", "Unimed Local", "Unimed Fácil"],
    "Hapvida": ["Mix", "Pleno", "Master", "Nacional"],
    "NotreDame Intermédica": ["Smart", "Advance", "Premium", "Infinity"],
    "Porto Seguro Saúde": ["Bronze", "Prata", "Ouro", "Diamante"],
    "Golden Cross": ["Essencial", "Clássico", "Especial"]
  };

  // Busca os médicos quando a especialidade é alterada
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


  const handleAgendar = async (e) => {
    e.preventDefault();

    if (
      !nome ||
      !dataNascimento ||
      !cpf ||
      !endereco ||
      !genero ||
      !etnia ||
      !problemaSaude ||
      !parentesco ||
      !dataHora ||
      !especialidade ||
      !medicoSelecionado ||
      !convenioMedico ||
      !planoConvenio ||
      !tipoSanguineo
    ) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const token = localStorage.getItem('token');

    const agendamentoData = {
      usuario_id: 1, // Substitua pelo ID do usuário logado
      medico_id: medicoSelecionado,
      especialidade,
      nome,
      data: dataHora.split('T')[0],
      hora: dataHora.split('T')[1],
      cpf,
      endereco,
      genero,
      etnia,
      problema_saude: problemaSaude,
      parentesco,
      convenioMedico,
      planoConvenio,
      tipoSanguineo,
    };

    try {
      const response = await fetch('http://localhost:5000/agendamentoDocente/agendarDocente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(agendamentoData),
      });

      if (!response.ok) {
        throw new Error('Erro ao agendar consulta.');
      }

      const data = await response.json();
      alert('Agendamento realizado com sucesso!');
      console.log(data);
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      alert('Erro ao agendar consulta. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <Navbar />
      <img src="../src/img/Faça um agendamento.png" className="img-servicos" alt="Logo Servicos" data-aos="fade-down" />
      <div className="calendar-container" data-aos="fade-up">
        <h1 className="tittle-contato" data-aos="fade-right">Faça já seu agendamento</h1>
        <h1 className="team-title" data-aos="fade-left">Agende agora</h1>
      </div>
      <div className="container-form">
        <h2 className="title">Agendamento de Consulta</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Data de nascimento</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gênero</label>
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Etnia</label>
            <select
              value={etnia}
              onChange={(e) => setEtnia(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Preto">Preto</option>
              <option value="Branco">Branco</option>
              <option value="Pardo">Pardo</option>
              <option value="Amarelo">Amarelo</option>
              <option value="Indígena">Indígena</option>
            </select>
          </div>
          <div className="form-group">
            <label>Algum problema de saúde?</label>
            <input
              type="text"
              value={problemaSaude}
              onChange={(e) => setProblemaSaude(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Parentesco</label>
            <select
              value={parentesco}
              onChange={(e) => setParentesco(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Pai/Mãe">Pai/Mãe</option>
              <option value="Filho/Filha">Filho/Filha</option>
              <option value="Cônjuge">Cônjuge</option>
              <option value="Irmão/Irmã">Irmão/Irmã</option>
              <option value="Avô/Avó">Avô/Avó</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
        </div>
        <br />
        <div className="form-group">
          <label>Data e horário</label>
          <input
            type="datetime-local"
            value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Especialidade</label>
          <select
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
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

        <div className="form-group">
          <label>Médico</label>
          <select
            value={medicoSelecionado}
            onChange={(e) => setMedicoSelecionado(parseInt(e.target.value, 10))}
          >
            {loading ? (
              <option>Carregando...</option>
            ) : error ? (
              <option style={{ color: 'red' }}>{error}</option>
            ) : (
              <>
                <option value="">Selecione um médico</option>
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nome_completo}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
        <div className='text-field'>
          <label>Convênio Médico</label>
          <select
            value={convenioMedico}
            onChange={(e) => setConvenioMedico(e.target.value)}
            className='input-cadastro'
          >
            <option value="">Selecione um convênio</option>
            {Object.keys(convenios).map((convenio) => (
              <option key={convenio} value={convenio}>{convenio}</option>
            ))}
          </select>
        </div>
        {convenioMedico && (
          <div className='text-field'>
            <label>Plano do Convênio</label>
            <select
              value={planoConvenio}
              onChange={(e) => setPlanoConvenio(e.target.value)}
              className='input-cadastro'
            >
              <option value="">Selecione um plano</option>
              {convenios[convenioMedico].map((plano) => (
                <option key={plano} value={plano}>{plano}</option>
              ))}
            </select>
          </div>
        )}
        <div className='text-field'>
          <label>Tipo Sanguíneo</label>
          <select
            value={tipoSanguineo}
            onChange={(e) => setTipoSanguineo(e.target.value)}
            className='input-cadastro'
          >
            {["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(tipo => (
              <option key={tipo} value={tipo}>{tipo || "Selecione"}</option>
            ))}
          </select>
        </div>
        <button className="submit-btn" onClick={handleAgendar}>Confirmar Agendamento</button>
        <br />
      </div>
      <br />
      <Footer />
    </>
  );
};

export default AgendamentosDependentes;