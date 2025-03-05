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

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'cpf' || name === 'telefone' ? value.replace(/\D/g, '') : value,
            ...(name === "convenioMedico" && { planoConvenio: "" }) // Reseta o plano ao trocar o convênio
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmar_senha) {
            alert("As senhas não coincidem!");
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
                        { label: "RG", name: "rg", type: "text", placeholder: "RG" },
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
        </div>
    );
}

export default CadastroPage;
