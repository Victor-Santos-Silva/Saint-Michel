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
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.senha !== formData.confirmar_senha) {
            alert("As senhas não coincidem!");
            return;
        }

        // Adicionando a imagem com base no gênero
        let generoImagem = '';
        if (formData.genero === 'Masculino') {
            generoImagem = '/img/pacienteM.png'; // Caminho relativo a partir da pasta public
        } else if (formData.genero === 'Feminino') {
            generoImagem = '/img/pacienteF.png'; // Caminho relativo a partir da pasta public
        } else if (formData.genero === 'Outro') {
            generoImagem = '/img/pacienteOutro.png'; // Caminho relativo a partir da pasta public
        }

        // Atualizando formData com a imagem
        const dataToSubmit = { ...formData, imagemGenero: generoImagem };

        try {
            const response = await axios.post('http://localhost:5000/paciente/cadastro', dataToSubmit, {
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

    return (
        <div className='container-page-cadastro'>
            <img src={imagemFundo} alt="Plano de Fundo" className="container-imagem-fundo" />

            <div className='container-formulario-cadastro'>
                <h1 className='title-cadastro'>Cadastro</h1>

                <form onSubmit={handleSubmit} className='formulario-cadastro'>
                    <div className='text-field'>
                        <label>Nome Completo</label>
                        <input type="text" name="nomeCompleto" placeholder="Nome Completo" value={formData.nomeCompleto} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>Data de Nascimento</label>
                        <input type="date" name="dataDeNascimento" value={formData.dataDeNascimento} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>CPF</label>
                        <input type="text" name="cpf" placeholder="CPF" maxLength="11" value={formData.cpf} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>RG</label>
                        <input type="text" name="rg" placeholder="RG" value={formData.rg} onChange={handleChange} className='input-cadastro' />
                    </div>

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
                        <label>Endereço</label>
                        <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>Telefone</label>
                        <input type="text" name="telefone" placeholder="Telefone" maxLength="11" value={formData.telefone} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>Convênio Médico</label>
                        <input type="text" name="convenioMedico" placeholder="Convênio Médico" value={formData.convenioMedico} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>Tipo Sanguíneo</label>
                        <select name="tipoSanguineo" value={formData.tipoSanguineo} onChange={handleChange} className='input-cadastro'>
                            <option value="">Selecione</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div className='text-field'>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>Senha</label>
                        <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <div className='text-field'>
                        <label>Confirmar Senha</label>
                        <input type="password" name="confirmar_senha" placeholder="Confirmar Senha" value={formData.confirmar_senha} onChange={handleChange} className='input-cadastro' />
                    </div>

                    <button type="submit" className='btn-cadastro'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default CadastroPage;
