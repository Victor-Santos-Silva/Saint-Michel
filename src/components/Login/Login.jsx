import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imagemFundo from '../../img/Paciente.png';
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
    const [forgotPasswordData, setForgotPasswordData] = useState({
        email: '',
        senhaNova: ''
    });
    const [forgotPasswordErrors, setForgotPasswordErrors] = useState({
        email: false,
        senhaNova: false
    });

    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError({ ...error, [name]: false });
    };

    const handleForgotPasswordChange = (e) => {
        const { name, value } = e.target;
        setForgotPasswordData(prev => ({
            ...prev,
            [name]: value
        }));
        setForgotPasswordErrors(prev => ({
            ...prev,
            [name]: false
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.senha) {
            toast.error('Preencha todos os campos!');
            setError({ email: !formData.email, senha: !formData.senha });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/paciente/login', formData);
            login(response.data.usuario, response.data.token, response.data.id);
            setFormData({ email: '', senha: '' });

            toast.success('Login realizado com sucesso!', {
                onClose: () => navigate('/')
            });

        } catch (error) {
            console.error('Erro no login:', error.response?.data?.error || error.message);
            setError({ email: true, senha: true });
            toast.error(error.response?.data?.error || 'Erro no login. Tente novamente.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        const errors = {
            email: !forgotPasswordData.email,
            senhaNova: !forgotPasswordData.senhaNova || forgotPasswordData.senhaNova.length < 6
        };

        setForgotPasswordErrors(errors);

        if (errors.email || errors.senhaNova) {
            if (errors.email) toast.error('Email é obrigatório!');
            if (errors.senhaNova) toast.error('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(forgotPasswordData.email)) {
            toast.error('Email inválido');
            setForgotPasswordErrors(prev => ({ ...prev, email: true }));
            return;
        }

        try {
            await axios.patch('http://localhost:5000/paciente/esqueciSenha', {
                email: forgotPasswordData.email,
                senhaNova: forgotPasswordData.senhaNova
            });

            toast.success('Senha alterada com sucesso!');
            setShowForgotPassword(false);
            setForgotPasswordData({ email: '', senhaNova: '' });
        } catch (error) {
            toast.error(error.response?.data?.error || 'Erro ao redefinir senha');
        }
    };

    return (
        <div className='container-page-login'>
            <div className='container-formulario-login'>
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

                <h1 className='title-login'>Login</h1>

                <form onSubmit={handleSubmit} className='form-login'>
                    <div className='text-field'>
                        <input
                            className='input-login'
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ borderColor: error.email ? 'red' : '' }}
                        />
                        {error.email && <p className="error-message">Campo obrigatório</p>}
                    </div>

                    <div className='text-field'>
                        <input
                            className='input-login'
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                            style={{ borderColor: error.senha ? 'red' : '' }}
                        />
                        {error.senha && <p className="error-message">Campo obrigatório</p>}
                    </div>

                    <button type="submit" className='btn-login'>Entrar</button>
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
                            <h2>Redefinir Senha</h2>
                            <form onSubmit={handlePasswordReset}>
                                <div className='text-field'>
                                    <input
                                        className='input-login'
                                        type="email"
                                        name="email"
                                        placeholder="Email cadastrado"
                                        value={forgotPasswordData.email}
                                        onChange={handleForgotPasswordChange}
                                        style={{ borderColor: forgotPasswordErrors.email ? 'red' : '' }}
                                    />
                                    {forgotPasswordErrors.email && (
                                        <p className="error-message">Email inválido</p>
                                    )}
                                </div>

                                <div className='text-field'>
                                    <input
                                        className='input-login'
                                        type="password"
                                        name="senhaNova"
                                        placeholder="Nova senha (mínimo 6 caracteres)"
                                        value={forgotPasswordData.senhaNova}
                                        onChange={handleForgotPasswordChange}
                                        style={{ borderColor: forgotPasswordErrors.senhaNova ? 'red' : '' }}
                                    />
                                    {forgotPasswordErrors.senhaNova && (
                                        <p className="error-message">Mínimo 6 caracteres</p>
                                    )}
                                </div>

                                <div className='button-group'>
                                    <button type="submit" className='btn-confirm'>Redefinir Senha</button>
                                    <button 
                                        type="button" 
                                        className='btn-cancel'
                                        onClick={() => {
                                            setShowForgotPassword(false);
                                            setForgotPasswordData({ email: '', senhaNova: '' });
                                            setForgotPasswordErrors({ email: false, senhaNova: false });
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}