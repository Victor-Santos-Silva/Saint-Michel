import React, { useEffect, useState } from "react";
import { FaPhone, FaClock, FaMapMarkerAlt, FaBell } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import fotoPerfil from '../../img/foto de perfil.png';
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isLoggedIn, nomeCompleto, logout } = useAuth();
  const navigate = useNavigate();
  
  const [notificacoes, setNotificacoes] = useState([]);
  const [notificacoesNaoLidas, setNotificacoesNaoLidas] = useState(0);
  const [mostrarNotificacoes, setMostrarNotificacoes] = useState(false);

  // Função para formatar data (substitui o date-fns)
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

  // Função simplificada para adicionar dias
  const adicionarDias = (data, dias) => {
    const result = new Date(data);
    result.setDate(result.getDate() + dias);
    return result;
  };

  // Função para buscar notificações do backend
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

  // Funções de manipulação de notificações (marcar como lida, limpar)
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
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          <Link to="/">
            <img src="../src/img/LogoTipo+Frase.png" alt="Logo" className="logo-img" />
          </Link>
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
              <strong>HORÁRIO DE FUNCIONAMENTO</strong>
              <br /> 24 HORAS POR DIA
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
              <p className="nome-usuario">Olá, {nomeCompleto}</p>
              
              <div className="notificacao-container">
                <button 
                  className="botao-notificacao"
                  onClick={() => setMostrarNotificacoes(!mostrarNotificacoes)}
                >
                  <FaBell 
                    size={20} 
                    style={{ 
                      color: 'white',
                      filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
                    }} 
                  />
                  {notificacoesNaoLidas > 0 && (
                    <span className="contador-notificacao">
                      {notificacoesNaoLidas}
                    </span>
                  )}
                </button>
                
                {mostrarNotificacoes && (
                  <div className="lista-notificacoes">
                    {notificacoes.length > 0 ? (
                      <>
                        {notificacoes.map((notificacao) => (
                          <div 
                            key={notificacao.id} 
                            className={`notificacao-item ${notificacao.lida ? '' : 'nao-lida'}`}
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
                          className="limpar-notificacoes"
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
                )}
              </div>

              <img
                src={fotoPerfil}
                alt="foto-perfil"
                className="foto-de-Perfil"
                onClick={() => navigate('/perfil')} 
              />
              <button onClick={logout} className="btn-sair-perfil">
                Sair
              </button>
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
      </nav>
    </header>
  );
}