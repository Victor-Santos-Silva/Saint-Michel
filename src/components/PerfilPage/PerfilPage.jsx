import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PerfilPage.css';

function PerfilPage() {
    const [dadosUsuario, setDadosUsuario] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/paciente`);
                console.log("✅ Dados do usuário recebidos:", response.data.usuario);
                setDadosUsuario(response.data.usuario);
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        };

        fetchUserData();
    }, []);

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
