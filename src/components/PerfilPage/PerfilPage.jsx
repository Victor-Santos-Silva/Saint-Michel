import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Importa o useAuth
import './PerfilPage.css';

function PerfilPage() {
    const [dadosUsuario, setDadosUsuario] = useState(null); // Inicializa como null
    const { token, id } = useAuth(); // Acessa o token e o id do AuthContext

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/paciente/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDadosUsuario(response.data.usuario); // Atualiza o estado com os dados do usuário
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        };

        if (token && id) { // Só faz a requisição se o token e o id existirem
            fetchUserData();
        }
    }, [token, id]); // Dependência do useEffect: token e id

    return (
        <div className='perfil-container'>
            <h1>Perfil do Usuário</h1>
            <div className='dados-usuario'>
                {dadosUsuario ? ( // Verifica se dadosUsuario não é null
                    <>
                        <img src={dadosUsuario.imagemGenero} alt="" />
                        <p><strong>Nome completo:</strong> {dadosUsuario.nomeCompleto}</p>
                        <p><strong>Data de nascimento:</strong> {dadosUsuario.dataDeNascimento}</p>
                        <p><strong>CPF:</strong> {dadosUsuario.cpf}</p>
                        <p><strong>RG:</strong> {dadosUsuario.rg}</p>
                        <p><strong>Gênero:</strong> {dadosUsuario.genero}</p>
                        <p><strong>Endereço:</strong> {dadosUsuario.endereco}</p>
                        <p><strong>Telefone:</strong> {dadosUsuario.telefone}</p>
                        <p><strong>Convênio Médico:</strong> {dadosUsuario.convenioMedico}</p>
                        <p><strong>Plano do Convênio:</strong> {dadosUsuario.planoConvenio}</p>
                        <p><strong>Tipo sanguíneo:</strong> {dadosUsuario.tipoSanguineo}</p>
                        <p><strong>Email:</strong> {dadosUsuario.email}</p>
                    </>
                ) : (
                    <p className='carregando'>Carregando...</p> // Exibe uma mensagem de carregamento enquanto os dados são buscados
                )}
            </div>
        </div>
    );
}

export default PerfilPage;