import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Importando o hook de autenticação
import imagemFundo from '../../img/planoDeFundo.png';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const [error, setError] = useState({
        email: false,
        senha: false
    });

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const { login } = useAuth(); // Acesso à função login do contexto

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: false }); // Remove erro ao digitar
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.email || !formData.senha) {
            alert("Preencha todos os campos!");
            setError({ email: !formData.email, senha: !formData.senha });
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/paciente/login', formData);
    
            // Passa o nome, token e id para o contexto
            login(response.data.usuario, response.data.token, response.data.id);
    
            setFormData({ email: '', senha: '' });
            navigate('/');
        } catch (error) {
            console.error('Erro no login:', error.response?.data?.error || error.message);
            setError({ email: true, senha: true });
            setServerError(error.response?.data?.error || 'Erro no login. Tente novamente.');
        }
    };

    const handleForgotPassword = async () => {
        if (!forgotPasswordEmail) {
            alert("Por favor, insira seu email.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/paciente/forgot-password', {
                email: forgotPasswordEmail
            });

            alert(response.data.message);
            setShowForgotPassword(false);
        } catch (error) {
            console.error('Erro ao enviar email:', error.response?.data?.error || error.message);
            alert("Erro ao enviar email. Tente novamente.");
        }
    };

    return (
        <>
            <img src={imagemFundo} alt="imagem de fundo" className='imagem-fundo-login' />
            <div className='container-login'>
                <h1 className='title-cadastro'>Login</h1>

                <form onSubmit={handleSubmit} className='form-login'>
                    <div className='text-field'>
                        <input
                            className='input-cadastro'
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ borderColor: error.email ? 'red' : '' }}
                        />
                        {error.email && <p style={{ color: 'red', fontSize: '14px' }}>Campo obrigatório</p>}
                    </div>

                    <div className='text-field'>
                        <input
                            className='input-cadastro'
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                            style={{ borderColor: error.senha ? 'red' : '' }}
                        />
                        {error.senha && <p style={{ color: 'red', fontSize: '14px' }}>Campo obrigatório</p>}
                    </div>

                    <button className='btn-cadastro'>Logar</button>
                </form>

                <button
                    className='btn-forgot-password'
                    onClick={() => setShowForgotPassword(true)}
                >
                    Esqueci a senha
                </button>

                {showForgotPassword && (
                    <div className='forgot-password-popup'>
                        <div className='forgot-password-content'>
                            <h2 className=''>Insira o seu E-mail</h2>
                            <input
                                type="email"
                                placeholder="exemplo@gmail.com"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            />
                            <button onClick={handleForgotPassword}>Enviar</button>
                            <button onClick={() => setShowForgotPassword(false)}>Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}