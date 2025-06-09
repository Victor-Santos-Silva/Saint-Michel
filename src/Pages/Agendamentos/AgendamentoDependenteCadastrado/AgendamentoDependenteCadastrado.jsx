import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/NavBar';
import Footer from '../../../components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import './agendamentoDependentes.css';

const AgendamentoDependenteCadastrado = () => {
    const { darkMode } = useTheme();

    const [especialidade, setEspecialidade] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [medicoSelecionado, setMedicoSelecionado] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

    const [missingFields, setMissingFields] = useState([]);
    const [dependenteSelecionado, setDependenteSelecionado] = useState(''); dependenteSelecionado
    const [dependentes, setDependentes] = useState([]);
    const token = localStorage.getItem('token');

    const isFieldMissing = (field) => missingFields.includes(field);

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
        const [horaAtualH, horaAtualM] = horaAtual.split(':').map(Number);
        const minutosAtuais = horaAtualH * 60 + horaAtualM;

        for (let h = 8; h < 18; h++) {
            for (let m = 0; m < 60; m += 30) {
                const horaStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                const minutosHorario = h * 60 + m;

                const isPassado = data === dataAtual && minutosHorario < minutosAtuais;

                horarios.push({
                    value: horaStr,
                    label: horaStr,
                    disabled: isPassado
                });
            }
        }
        return horarios;
    };
    useEffect(() => {
        setHorariosDisponiveis(gerarHorarios());
    }, [data]);
    useEffect(() => {
        async function fetchMedicos() {
            if (!especialidade) {
                setMedicos([]);
                return;
            }
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/medico/medicos?especialidade=${especialidade}`);
                setMedicos(response.data);
                console.log(response.data);
                console.log("ID do usuário:", id);

            } catch (err) {
                setError('Erro ao buscar médicos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchMedicos();
    }, [especialidade]);



    function getUserIdFromToken() {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);
            return payload.id || payload.userId || payload.sub;  // depende do campo usado no token
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
            return null;
        }
    }

    const id = getUserIdFromToken();

    useEffect(() => {
        const fetchDependente = async () => {
            if (!id) {
                console.error('Usuário não logado ou id inválido');
                return;
            }
            try {
                const response = await axios.get(`https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/dependente/dependenteAdicionado/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDependentes(response.data);
            } catch (error) {
                console.error("Erro ao buscar dependente:", error);
            }
        };

        fetchDependente();
    }, [id]);

    const handleAgendarConsulta = async () => {
        const camposObrigatorios = [];

        if (!especialidade) camposObrigatorios.push('especialidade');
        if (!medicoSelecionado) camposObrigatorios.push('medico');
        if (!data) camposObrigatorios.push('data');
        if (!hora) camposObrigatorios.push('hora');
        if (!dependenteSelecionado) camposObrigatorios.push('dependente');

        if (camposObrigatorios.length > 0) {
            setMissingFields(camposObrigatorios);
            toast.error('Preencha todos os campos obrigatórios');
            return;
        }

        try {
            const response = await axios.post('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/agendarDependente', {
                usuario_id: id,
                especialidade,
                medico_id: medicoSelecionado,
                dependente_id: dependenteSelecionado,
                data,
                hora
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            toast.success('Agendamento realizado com sucesso!');
            console.log('Agendamento:', response.data);

            setEspecialidade('');
            setMedicoSelecionado('');
            setData('');
            setHora('');
            setDependenteSelecionado('');
            setMissingFields([]);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Erro ao realizar agendamento');
        }
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <>
            <Navbar />
            <img src="../img/Faça um agendamento.png" alt="Logo Serviços" className="img-servicos" />
            <div className='agendamento-container '>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={darkMode ? 'dark' : 'light'}
                />

                <div>
                    <h1>Faça já seu agendamento</h1>
                    <h1>Agende agora</h1>
                </div>

                <div>
                    <div>
                        <label>Especialidade</label>
                        <select
                            value={especialidade}
                            onChange={e => {
                                setEspecialidade(e.target.value);
                                setMissingFields(prev => prev.filter(f => f !== 'especialidade'));
                                setMedicoSelecionado('');
                            }}
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

                    <div>
                        <label>Médico</label>
                        <select
                            value={medicoSelecionado}
                            onChange={e => {
                                setMedicoSelecionado(Number(e.target.value));
                                setMissingFields(prev => prev.filter(f => f !== 'medico'));
                            }}
                        >
                            <option value="">Selecione um médico</option>
                            {medicos.map(medico => (
                                <option key={medico.id} value={medico.id}>
                                    {medico.nome_completo}
                                </option>
                            ))}
                        </select>
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

                    <div>
                        <label>Dependente</label>
                        <select
                            value={dependenteSelecionado}
                            onChange={e => {
                                setDependenteSelecionado(Number(e.target.value));
                                setMissingFields(prev => prev.filter(f => f !== 'dependente'));
                            }}
                        >
                            <option value="">Selecione um dependente</option>
                            {dependentes.map(dependente => (
                                <option key={dependente.id} value={dependente.id}>
                                    {dependente.nomeCompleto}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleAgendarConsulta} className="submit-btn">Agendar</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AgendamentoDependenteCadastrado;
