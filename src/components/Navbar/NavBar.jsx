import React, { useEffect, useState } from "react";
import { FaPhone, FaClock, FaMapMarkerAlt, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import fotoPerfil from '../../img/foto de perfil.png';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { isLoggedIn, nomeCompleto, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [notificacoes, setNotificacoes] = useState([]);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const buscarNotificacoes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/notificacoes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNotificacoes(data);
        setNotificacoesNaoLidas(data.filter(n => !n.lida).length);
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
    }
  };

  const marcarComoLida = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/notificacoes/${id}/ler`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      buscarNotificacoes();
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const limparNotificacoes = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/notificacoes/limpar', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNotificacoes([]);
      setNotificacoesNaoLidas(0);
    } catch (error) {
      console.error("Erro ao limpar notificações:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      buscarNotificacoes();
    }
  }, [isLoggedIn]);

  return (
    <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
      <div className="top-bar">
        <div className="logo">
          <Link to="/">
            <img 
              src="/img/LogoTipo+Frase.png" 
              alt="Logo" 
              className={`logo-img ${darkMode ? 'dark-logo' : ''}`}
            />
          </Link>
        </div>

      <div className="contact-info">
          <div className={`info-item modern-item ${darkMode ? 'dark-item' : ''}`}>
            <FaPhone className={`icon-img ${darkMode ? 'dark-icon' : ''}`} />
            <div>
              <strong>EMERGÊNCIA</strong>
              <br /> (11) 6818-1255
            </div>
          </div>
          <div className={`info-item modern-item ${darkMode ? 'dark-item' : ''}`}>
            <FaClock className={`icon-img ${darkMode ? 'dark-icon' : ''}`} />
            <div>
              <strong>HORÁRIO DE FUNCIONAMENTO</strong>
              <br /> 24 HORAS POR DIA
            </div>
          </div>
          <div className={`info-item modern-item ${darkMode ? 'dark-item' : ''}`}>
            <FaMapMarkerAlt className={`icon-img ${darkMode ? 'dark-icon' : ''}`} />
            <div>
              <strong>LOCALIZAÇÃO</strong>
              <br /> Av. Marechal Tito, 3400
            </div>
          </div>
        </div>
      </div>

      <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
        <div className="nav-links">
          {['/', '/sobre', '/servicos', '/doutores', '/agendamentos', '/contato'].map((path, idx) => (
            <Link 
              key={idx}
              to={path}
              className="nav-link"
              style={{ transition: 'all 0.3s ease-in-out' }}
            >
              {['Home', 'Sobre', 'Serviços', 'Doutores', 'Agendamentos', 'Contato'][idx]}
            </Link>
          ))}
        </div>

        <div className="container-login-cadastro">
          <button 
            onClick={toggleTheme} 
            className={`theme-toggle ${darkMode ? 'dark-toggle' : ''}`}
            style={{ transition: 'all 0.3s ease-in-out' }}
          >
            {darkMode ? '🌞' : '🌙'}
          </button>

          {isLoggedIn ? (
            <div className="perfil-usuario">
              <div className="usuario-info">
                <p className={`nome-usuario ${darkMode ? 'dark-text' : ''}`}>Olá, {nomeCompleto}</p>
                <div className="notificacao-container">
                  <button
                    className={`botao-notificacao ${darkMode ? 'dark-notification' : ''}`}
                    onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}
                    style={{ transition: 'all 0.3s ease-in-out' }}
                  >
                    <FaBell size={20} className={darkMode ? 'dark-icon' : ''} />
                    {notificacoesNaoLidas > 0 && (
                      <span className={`contador-notificacao ${darkMode ? 'dark-counter' : ''}`}>
                        {notificacoesNaoLidas}
                      </span>
                    )}
                  </button>

                  <div className={`lista-notificacoes ${mostrarNotificacoes ? 'mostrar' : ''} ${darkMode ? 'dark-list' : ''}`}>
                    {notificacoes.length > 0 ? (
                      <>
                        {notificacoes.map((notificacao) => (
                          <div
                            key={notificacao.id}
                            className={`notificacao-item ${notificacao.lida ? '' : 'nao-lida'} ${darkMode ? 'dark-item' : ''}`}
                            onClick={() => marcarComoLida(notificacao.id)}
                          >
                            <div className="notificacao-conteudo">
                              <p className="notificacao-titulo">{notificacao.titulo}</p>
                              <p className="notificacao-mensagem">{notificacao.mensagem}</p>
                              <p className="notificacao-data">
                                {formatarData(notificacao.data)}
                              </p>
                            </div>
                          </div>
                        ))}
                        <button
                          className={`limpar-notificacoes ${darkMode ? 'dark-clear' : ''}`}
                          onClick={limparNotificacoes}
                        >
                          Limpar Todas
                        </button>
                      </>
                    ) : (
                      <div className="sem-notificacoes">
                        Nenhuma notificação disponível
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="usuario-acoes">
                <img
                  src={fotoPerfil}
                  alt="foto-perfil"
                  className={`foto-de-Perfil ${darkMode ? 'dark-profile' : ''}`}
                  onClick={() => navigate('/perfil')}
                  style={{ transition: 'all 0.3s ease-in-out' }}
                />
                <button 
                  onClick={logout} 
                  className={`btn-sair-perfil ${darkMode ? 'dark-logout' : ''}`}
                  style={{ transition: 'all 0.3s ease-in-out' }}
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link 
                to='/login' 
                className={`login-button ${darkMode ? 'dark-link' : ''}`}
                style={{ transition: 'all 0.3s ease-in-out' }}
              >
                Login
              </Link>
              <Link 
                to='/cadastro' 
                className={`cadastro-button ${darkMode ? 'dark-link' : ''}`}
                style={{ transition: 'all 0.3s ease-in-out' }}
              >
                Cadastro
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}