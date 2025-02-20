import React from "react";
import { FaPhone, FaClock, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; // Importando o hook de autenticação
import fotoPerfil from '../../img/foto de perfil.png'
import "./Navbar.css"; // Importando o CSS


export default function Navbar() {

  const { isLoggedIn, username, logout } = useAuth(); // Acessando o estado do usuário

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          <img src="../src/img/LogoTipo+Frase.png" alt="Logo" className="logo-img" />
        </div>
        <div className="contact-info">
          <div className="info-item modern-item">
            <FaPhone className="icon-img" />
            <div>
              <strong>EMERGÊNCIA</strong>
              <br /> (11) 6818-1255
            </div>
          </div>
          <div className="info-item modern-item">
            <FaClock className="icon-img" />
            <div>
              <strong>HORÁRIO DE TRABALHO</strong>
              <br /> 09:00 - 20:00 Todo dia
            </div>
          </div>
          <div className="info-item modern-item">
            <FaMapMarkerAlt className="icon-img" />
            <div>
              <strong>LOCALIZAÇÃO</strong>
              <br /> Av. Marechal Tito, 3400
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="nav-links">
          <Link to='/'>Home</Link>
          <Link to='/sobre'>Sobre</Link>
          <Link to='/servicos'>Serviços</Link>
          <Link to='/doutores'>Doutores</Link>
          <Link to='/agendamentos'>Agendamentos</Link>
          <Link to='/contato'>Contato</Link>
        </div>

        <div className="container-login-cadastro">
          {isLoggedIn ? (
            <div className="perfil-usuario">

              <p className="nome-usuario">Olá, {username}</p>
              <img src={fotoPerfil} alt="foto-perfil" className="foto-de-Perfil" />
              <Link onClick={logout} className="btn-sair-perfil">Sair</Link>

            </div>
          ) : (
            <>
              <div className="nav-actions">
                <Link to='/login' className="login-button">Login</Link>
              </div>
              <div className="nav-actions">
                <Link to='/cadastro' className="cadastro-button">Cadastro</Link>
              </div>
            </>
          )}

        </div>
      </nav >
    </header >
  );
}