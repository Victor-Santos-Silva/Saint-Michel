import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CadastroPage.css';
import imagemFundo from '../../img/planoDeFundo.png'
import { useNavigate } from 'react-router-dom';

function CadastroPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        email: '',
        senha: '',
        confirmar_senha: '',
        cpf: '',
        endereco: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'cpf' ? value.replace(/\D/g, '') : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação da senha
        const senha = formData.senha.trim();
        const repetir_senha = formData.confirmar_senha.trim();

        try {
            const response = await axios.post('http://localhost:5000/api/cadastro', {
                ...formData,
                senha,
                repetir_senha,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            alert('Cadastro realizado com sucesso!');
            setFormData({
                nome: '',
                idade: '',
                email: '',
                senha: '',
                confirmar_senha: '',
                cpf: '',
                endereco: ''
            });

            navigate('/login'); // indo para a pagina login

        } catch (error) {
            console.error('Erro ao cadastrar:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <>

            <div className='container-page-cadastro'>
                <img src={imagemFundo} alt="" className="container-imagem-fundo" />

                <div className='container-formulario-cadastro'>

                    <h1 className='title-cadastro'>Cadastro</h1>

                    <form onSubmit={handleSubmit}>

                        <div className='text-field'>
                            <label htmlFor="usuario">Nome Completo</label>
                            <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className='input-cadastro' />
                        </div>

                        <div className='text-field'>
                            <label htmlFor="idade">Idade</label>
                            <input type="number" name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} className='input-cadastro' />
                        </div>

                        <div className='text-field'>
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className='input-cadastro' />
                        </div>

                        <div className='text-field'>
                            <label htmlFor="senha">Senha</label>
                            <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} className='input-cadastro' />
                        </div>

                        <div className='text-field'>
                            <label htmlFor="confirmar_senha">Confirmar Senha</label>
                            <input type="password" name="confirmar_senha" placeholder="Confirmar Senha" value={formData.confirmar_senha} onChange={handleChange} className='input-cadastro' />
                        </div>

                        <div className='text-field'>
                            <label htmlFor="cpf">Cpf</label>
                            <input type="text" name="cpf" placeholder="Cpf" value={formData.cpf} onChange={handleChange} className='input-cadastro' />
                        </div>

                        <div className='text-field'>
                            <label htmlFor="endereco">Endereço</label>
                            <input type="text" name="endereco" placeholder="Endereco" value={formData.endereco} onChange={handleChange} className='input-cadastro' />
                        </div>

                        <button className='btn-cadastro'>Cadastrar</button>

                    </form>

                </div>
            </div>
        </>
    );


}


export default CadastroPage;