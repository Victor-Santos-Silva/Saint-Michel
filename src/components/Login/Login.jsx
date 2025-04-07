import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.senha) {
            toast.error('Preencha todos os campos!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            setError({ email: !formData.email, senha: !formData.senha });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/paciente/login', formData);
            login(response.data.usuario, response.data.token, response.data.id);
            setFormData({ email: '', senha: '' });

            // Notificação de sucesso com redirecionamento
            toast.success('Login realizado com sucesso!', {
                position: "top-right",
                autoClose: 500, // Corrigido o tempo para 3 segundos
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                onClose: () => navigate('/') // Redireciona após fechar a notificação
            });

        } catch (error) {
            console.error('Erro no login:', error.response?.data?.error || error.message);
            setError({ email: true, senha: true });
            
            toast.error(error.response?.data?.error || 'Erro no login. Tente novamente.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    };

    const handleForgotPassword = async () => {
        if (!forgotPasswordEmail) {
            toast.warn('Por favor, insira seu email.', {
                position: "top-right",
                autoClose: 3000,
                theme: "colored",
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/paciente/forgot-password', {
                email: forgotPasswordEmail
            });

            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 4000,
                theme: "colored",
            });
            
            setShowForgotPassword(false);
        } catch (error) {
            console.error('Erro ao enviar email:', error.response?.data?.error || error.message);
            toast.error(error.response?.data?.error || 'Erro ao enviar email. Tente novamente.', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });
        }
    };

    return (
        <>
            <img src={imagemFundo} alt="imagem de fundo" className='imagem-fundo-login' />
            <div className='container-login'>
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
                    theme="colored"
                />
                
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