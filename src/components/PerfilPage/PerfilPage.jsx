import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Importa o useAuth
import './PerfilPage.css';

function PerfilPage() {
    const [dadosUsuario, setDadosUsuario] = useState([]);
    const { token, id } = useAuth(); // Acessa o token e o id do AuthContext

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("ID do usuário:", id); // Verifique o id no console
                const response = await axios.get(`http://localhost:5000/paciente/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Dados do usuário recebidos:", response.data.usuario);
                setDadosUsuario(response.data.usuario);
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
            <div>
                {dadosUsuario.length > 0 ? (
                    dadosUsuario.map((item, index) => (
                        <div key={index}>
                            <p>Nome completo:  {item.nomeCompleto}</p>
                            <p>Data de nascimento: {item.dataDeNascimento}</p>
                            <p>CPF: {item.cpf}</p>
                            <p>RG: {item.rg}</p>
                            <p>Gênero: {item.genero}</p>
                            <p>Endereço: {item.endereco}</p>
                            <p>Telefone: {item.telefone}</p>
                            <p>Convênio Médico:{item.convenioMedico}</p>
                            <p>Plano do Convênio:{item.planoConvenio}</p>
                            <p>Tipo sanguíneo:{item.tipoSanguineo}</p>
                            <p>Email:{item.email}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhum paciente encontrado.</p>
                )}
            </div>
        </div>
    );
}

export default PerfilPage;