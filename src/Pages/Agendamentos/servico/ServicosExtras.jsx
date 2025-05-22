import React, { useState, useEffect } from 'react';
import './servicos.css';
import Navbar from '../../../components/Navbar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServicosExtras = () => {
  const [serviceType, setServiceType] = useState('');
  const [patientDetails, setPatientDetails] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [missingFields, setMissingFields] = useState([]);
  const [endereco, setEndereco] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setHorariosDisponiveis(gerarHorarios());
  }, [data]);

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

  const validateFields = () => {
    const requiredFields = [];
    if (!serviceType) requiredFields.push('serviceType');
    if (!patientDetails) requiredFields.push('patientDetails');
    if (!data) requiredFields.push('data');
    if (!hora) requiredFields.push('hora');

    if (serviceType === 'Atendimento Domiciliar' && !endereco) {
      requiredFields.push('endereco');
    }

    setMissingFields(requiredFields);
    return requiredFields.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      toast.error('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Você precisa estar logado para agendar o serviço!");
      navigate('/login');
      return;
    }

    try {
      const formData = {
        tipo_servico: serviceType,
        detalhes: patientDetails,
        data,
        hora,
        ...(serviceType === 'Atendimento Domiciliar' && { endereco })
      };

      const response = await axios.post(
        'http://localhost:5000/servicos-extras',
        formData,
        
        
        
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('Serviço agendado com sucesso!');
        navigate('/');
      }
      
    } catch (error) {
      console.error('Erro:', error);
      const errorMessage = error.response?.data?.message || 'Erro ao processar agendamento';
      toast.error(errorMessage);
    }
  };

  const isFieldMissing = (fieldName) => missingFields.includes(fieldName);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <img src="../img/Faça um agendamento.png" className="img-servicos" alt="Logo Serviços" data-aos="fade-down" />

      <div className="servicos-container">
        <h1 className="tittle-contato">Agendamento</h1>
        <h1 className="team-title">Serviços Extras</h1>
        <br />

        <form className="servicos-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <h2 className="title">Agendamento</h2>
            <label>Tipo de Serviço</label>
            <select
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value);
                setMissingFields(prev => prev.filter(f => f !== 'serviceType'));
                if (e.target.value !== 'Atendimento Domiciliar') setEndereco('');
              }}
              className={isFieldMissing('serviceType') ? 'campo-obrigatorio' : ''}
            >
              <option value="">Selecione o serviço</option>
              <option value="Atendimento Domiciliar">Atendimento Domiciliar</option>
              <option value="Pequena Cirurgia">Pequena Cirurgia</option>
              <option value="Fisioterapia">Fisioterapia</option>
            </select>
          </div>

          {serviceType === 'Atendimento Domiciliar' && (
            <div className="form-group">
              <label>Endereço</label>
              <textarea
                value={endereco}
                onChange={(e) => {
                  setEndereco(e.target.value);
                  setMissingFields(prev => prev.filter(f => f !== 'endereco'));
                }}
                className={isFieldMissing('endereco') ? 'campo-obrigatorio' : ''}
                placeholder="Digite o endereço completo (Rua, número, bairro, cidade - Estado)"
                rows="2"
              />
            </div>
          )}

          <div className="form-group">
            <label>Detalhes do serviço</label>
            <textarea
              value={patientDetails}
              onChange={(e) => {
                setPatientDetails(e.target.value);
                setMissingFields(prev => prev.filter(f => f !== 'patientDetails'));
              }}
              className={isFieldMissing('patientDetails') ? 'campo-obrigatorio' : ''}
              placeholder="Descreva a condição do paciente e necessidades especiais"
            />
          </div>

          <div className="form-group">
            <label>Data</label>
            <input
              type="date"
              value={data}
              min={getDataAtual()}
              onChange={(e) => {
                setData(e.target.value);
                setMissingFields(prev => prev.filter(f => f !== 'data'));
              }}
              className={isFieldMissing('data') ? 'campo-obrigatorio' : ''}
            />
          </div>

          <div className="form-group">
            <label>Hora</label>
            <select
              value={hora}
              onChange={(e) => {
                setHora(e.target.value);
                setMissingFields(prev => prev.filter(f => f !== 'hora'));
              }}
              className={isFieldMissing('hora') ? 'campo-obrigatorio' : ''}
            >
              <option value="">Selecione um horário</option>
              {horariosDisponiveis.map(horario => (
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

          <button type="submit" className="submit-btn">
            Agendar Serviço
          </button>
        </form>
      </div>






      <Footer />
    </>
  );
};

export default ServicosExtras;