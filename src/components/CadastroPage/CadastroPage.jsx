import React, { useState } from 'react';
import axios from 'axios';
import './CadastroPage.css';
import imagemFundo from '../../img/Paciente.png';
import { useNavigate } from 'react-router-dom';

function CadastroPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nomeCompleto: '',
        dataDeNascimento: '',
        cpf: '',
        rg: '',
        genero: '',
        endereco: '',
        telefone: '',
        convenioMedico: '',
        planoConvenio: '',
        tipoSanguineo: '',
        email: '',
        senha: '',
        confirmar_senha: ''
    });

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar o pop-up
    const [errorMessage, setErrorMessage] = useState(''); // Mensagem de erro específica

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'cpf' || name === 'telefone' ? value.replace(/\D/g, '') : value,
            ...(name === "convenioMedico" && { planoConvenio: "" }) // Reseta o plano ao trocar o convênio
        }));
    };

    // Função para validar todos os campos
    const validateFields = () => {
        const {
            nomeCompleto,
            dataDeNascimento,
            cpf,
            rg,
            genero,
            endereco,
            telefone,
            convenioMedico,
            planoConvenio,
            tipoSanguineo,
            email,
            senha,
            confirmar_senha
        } = formData;

        // Validação do Nome Completo
        if (!nomeCompleto.trim()) {
            return "O campo Nome Completo é obrigatório.";
        }

        // Validação da Data de Nascimento
        if (!dataDeNascimento) {
            return "O campo Data de Nascimento é obrigatório.";
        }
        const birthDate = new Date(dataDeNascimento);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18 || isNaN(birthDate.getTime())) {
            return "Você deve ter pelo menos 18 anos para se cadastrar.";
        }

        // Validação do CPF
        if (cpf.length !== 11) {
            return "CPF deve ter 11 dígitos.";
        }

        // Validação do RG
        if (rg.length < 7 || rg.length > 10) {
            return "RG deve ter entre 7 e 10 dígitos.";
        }

        // Validação do Gênero
        if (!genero) {
            return "O campo Gênero é obrigatório.";
        }

        // Validação do Endereço
        if (!endereco.trim()) {
            return "O campo Endereço é obrigatório.";
        }

        // Validação do Telefone
        if (telefone.length !== 11) {
            return "Telefone deve ter 11 dígitos.";
        }

        // Validação do Convênio Médico
        if (!convenioMedico) {
            return "O campo Convênio Médico é obrigatório.";
        }

        // Validação do Plano do Convênio
        if (convenioMedico && !planoConvenio) {
            return "O campo Plano do Convênio é obrigatório.";
        }

        // Validação do Tipo Sanguíneo
        if (!tipoSanguineo) {
            return "O campo Tipo Sanguíneo é obrigatório.";
        }

        // Validação do Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Email inválido.";
        }

        // Validação da Senha
        if (senha.length < 6) {
            return "A senha deve ter pelo menos 6 caracteres.";
        }

        // Validação da Confirmação de Senha
        if (senha !== confirmar_senha) {
            return "As senhas não coincidem.";
        }

        return null; // Retorna null se todos os campos forem válidos
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valida todos os campos
        const validationError = validateFields();
        if (validationError) {
            setErrorMessage(validationError);
            setShowPopup(true); // Exibe o pop-up de erro
            return;
        }

        const generoImagem = formData.genero === 'Masculino' ? '/img/pacienteM.png' :
            formData.genero === 'Feminino' ? '/img/pacienteF.png' :
                '/img/pacienteOutro.png';

        try {
            await axios.post('http://localhost:5000/paciente/cadastro', { ...formData, imagemGenero: generoImagem }, {
                headers: { 'Content-Type': 'application/json' }
            });

            alert('Cadastro realizado com sucesso!');
            setFormData({
                nomeCompleto: '',
                dataDeNascimento: '',
                cpf: '',
                rg: '',
                genero: '',
                endereco: '',
                telefone: '',
                convenioMedico: '',
                planoConvenio: '',
                tipoSanguineo: '',
                email: '',
                senha: '',
                confirmar_senha: ''
            });

            navigate('/login');

        } catch (error) {
            console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
        }
    };

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

    return (
        <div className='container-page-cadastro'>
            <img src={imagemFundo} alt="Plano de Fundo" className="container-imagem-fundo" />

            <div className='container-formulario-cadastro'>
                <h1 className='title-cadastro'>Cadastro</h1>

                <form onSubmit={handleSubmit} className='formulario-cadastro'>
                    {[
                        { label: "Nome Completo", name: "nomeCompleto", type: "text", placeholder: "Nome Completo" },
                        { label: "Data de Nascimento", name: "dataDeNascimento", type: "date" },
                        { label: "CPF", name: "cpf", type: "text", placeholder: "CPF", maxLength: "11" },
                        { label: "RG", name: "rg", type: "text", placeholder: "RG", maxLength: "10" },
                        { label: "Endereço", name: "endereco", type: "text", placeholder: "Endereço" },
                        { label: "Telefone", name: "telefone", type: "text", placeholder: "Telefone", maxLength: "11" },
                        { label: "Email", name: "email", type: "email", placeholder: "Email" },
                        { label: "Senha", name: "senha", type: "password", placeholder: "Senha" },
                        { label: "Confirmar Senha", name: "confirmar_senha", type: "password", placeholder: "Confirmar Senha" }
                    ].map(({ label, name, type, placeholder, maxLength }) => (
                        <div key={name} className='text-field'>
                            <label>{label}</label>
                            <input type={type} name={name} placeholder={placeholder} value={formData[name]} onChange={handleChange} maxLength={maxLength} className='input-cadastro' />
                        </div>
                    ))}

                    <div className='text-field'>
                        <label>Gênero</label>
                        <select name="genero" value={formData.genero} onChange={handleChange} className='input-cadastro'>
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className='text-field'>
                        <label>Convênio Médico</label>
                        <select name="convenioMedico" value={formData.convenioMedico} onChange={handleChange} className='input-cadastro'>
                            <option value="">Selecione um convênio</option>
                            {Object.keys(convenios).map((convenio) => (
                                <option key={convenio} value={convenio}>{convenio}</option>
                            ))}
                        </select>
                    </div>

                    {formData.convenioMedico && (
                        <div className='text-field'>
                            <label>Plano do Convênio</label>
                            <select name="planoConvenio" value={formData.planoConvenio} onChange={handleChange} className='input-cadastro'>
                                <option value="">Selecione um plano</option>
                                {convenios[formData.convenioMedico].map((plano) => (
                                    <option key={plano} value={plano}>{plano}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className='text-field'>
                        <label>Tipo Sanguíneo</label>
                        <select name="tipoSanguineo" value={formData.tipoSanguineo} onChange={handleChange} className='input-cadastro'>
                            {["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(tipo => (
                                <option key={tipo} value={tipo}>{tipo || "Selecione"}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className='btn-cadastro'>Cadastrar</button>
                </form>
            </div>

            {/* Pop-up de erro */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="error-icon">⚠️</div>
                        <h1 className="error-code">ERROR</h1>
                        <span className="error-message">{errorMessage}</span>
                        <button onClick={() => setShowPopup(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CadastroPage;