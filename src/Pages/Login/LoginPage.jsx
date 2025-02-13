import React, { useState, useEffect } from 'react';
import './LoginPage.css'
import Navbar from '../../components/Navbar/NavBar'
import Footer from '../../components/Footer/Footer'

function LoginPage() {
    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        email: '',
        senha: '',
        cpf: '',
    });
    return (
        <>
            <Navbar />
            <div className="mainlogin">
                <div className="leftlogin">
                </div>
                <div className="right-login">
                    <div className="card-login">
                        <h1>Login</h1>
                        <div className="textfield">
                            <label for="usuario">Usuário</label>
                            <input type="text" name="usuario" placeholder="Usuário" />
                        </div>
                        <div className="textfield">
                            <label for="email">Email</label>
                            <input type="text" name="email" placeholder="Email" />
                        </div>
                        <div className="textfield">
                            <label for="senha">Senha</label>
                            <input type="text" name="senha" placeholder="Senha" />
                        </div>
                        <div className="textfield">
                            <label for="cpf">Cpf</label>
                            <input type="text" name="cpf" placeholder="Cpf" />
                        </div>
                        <button className="btn-login">Logar</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LoginPage;
