import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PerfilPage.css';

function PerfilPage() {
    const [dadosUsuario, setDadosUsuario] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/paciente/1`);
                setDadosUsuario(response.data);
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setError('Falha ao carregar os dados. Tente novamente.');
            }
        };

        fetchUserData();
    }, []);

    return (
        
        <div className="perfil-container">
            <h1>Perfil do Usuário</h1>
            <img src={dadosUsuario.imagemGenero} alt="Foto de perfil" className="perfil-foto" />
            <p><strong>Nome: {dadosUsuario.nomeCompleto}</strong></p>
            <p><strong>Email:</strong> {dadosUsuario.email}</p>
            <p><strong>Data de Nascimento:</strong> {dadosUsuario.dataDeNascimento}</p>
            <p><strong>CPF:</strong> {dadosUsuario.cpf}</p>
            <p><strong>RG:</strong> {dadosUsuario.rg}</p>
            <p><strong>Telefone:</strong> {dadosUsuario.telefone}</p>
            <p><strong>Endereço:</strong> {dadosUsuario.endereco}</p>
            <p><strong>Convênio Médico:</strong> {dadosUsuario.convenioMedico}</p>
            <p><strong>Plano:</strong> {dadosUsuario.planoConvenio}</p>
            <p><strong>Tipo Sanguíneo:</strong> {dadosUsuario.tipoSanguineo}</p>
        </div>
    );
}

export default PerfilPage;
