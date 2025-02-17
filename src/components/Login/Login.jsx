import React, { useState } from 'react';
import axios from 'axios';
import imagemFundo from '../../img/planoDeFundo.png'
import './login.css';

export default function Login() {

    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const [error, setError] = useState({
        email: false,
        senha: false
    });

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
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            alert(response.data.message);
            setFormData({ email: '', senha: '' }); // Limpa os campos após login bem-sucedido

        } catch (error) {
            console.error('Erro no login:', error.response?.data?.error || error.message);

            setError({
                email: true,
                senha: true
            });
        }
    };

    return (
        <>
            <img src={imagemFundo} alt="imagem de fundo" className='imagem-fundo-login' />

            <div className='container-login'>

                <h1>Login</h1>

                <form onSubmit={handleSubmit} className='form-login'>

                    <div className='formulario-login'>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ borderColor: error.email ? 'red' : '' }}
                        />
                        {error.email && <p style={{ color: 'red', fontSize: '14px' }}>Campo obrigatório</p>}
                    </div>

                    <div className='formulario-login'>
                        <input
                            className=''
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            value={formData.senha}
                            onChange={handleChange}
                            style={{ borderColor: error.senha ? 'red' : '' }}
                        />
                        {error.senha && <p style={{ color: 'red', fontSize: '14px' }}>Campo obrigatório</p>}

                    </div>

                    <button className='btn-login'>Logar</button>

                </form>
            </div>
        </>
    )
}
