import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Importa o useAuth
import './PerfilPage.css';

function PerfilPage() {
    const [dadosUsuario, setDadosUsuario] = useState(null); // Inicializa como null
    const [editando, setEditando] = useState(false); // Estado para controlar a edição
    const { token, id } = useAuth(); // Acessa o token e o id do AuthContext

    // Busca os dados do usuário
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
    }, [token, id]);

    // Função para salvar as alterações
    const handleSave = async (dadosAtualizados) => {
        try {
            const response = await axios.put(`http://localhost:5000/paciente/${id}`, dadosAtualizados, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setDadosUsuario(response.data.usuario); // Atualiza o estado com os novos dados
            setEditando(false); // Sai do modo de edição
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err);
        }
    };

    // Função para cancelar a edição
    const handleCancel = () => {
        setEditando(false); // Sai do modo de edição sem salvar
    };

    return (
        <div className='perfil-container'>
            <h1>Perfil do Usuário</h1>
            <div className='dados-usuario'>
                {dadosUsuario ? ( // Verifica se dadosUsuario não é null
                    editando ? ( // Modo de edição
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSave({
                                nomeCompleto: e.target.nomeCompleto.value,
                                dataDeNascimento: e.target.dataDeNascimento.value,
                                cpf: e.target.cpf.value,
                                rg: e.target.rg.value,
                                genero: e.target.genero.value,
                                endereco: e.target.endereco.value,
                                telefone: e.target.telefone.value,
                                convenioMedico: e.target.convenioMedico.value,
                                planoConvenio: e.target.planoConvenio.value,
                                tipoSanguineo: e.target.tipoSanguineo.value,
                                email: e.target.email.value,
                            });
                        }}>
                            <img src={dadosUsuario.imagemGenero} alt="imagem-menino" className='imagem-profile' />
                            <div className='form-group'>
                                <label>Nome completo:</label>
                                <input type='text' name='nomeCompleto' defaultValue={dadosUsuario.nomeCompleto} />
                            </div>
                            <div className='form-group'>
                                <label>Data de nascimento:</label>
                                <input type='text' name='dataDeNascimento' defaultValue={dadosUsuario.dataDeNascimento} />
                            </div>
                            <div className='form-group'>
                                <label>CPF:</label>
                                <input type='text' name='cpf' defaultValue={dadosUsuario.cpf} />
                            </div>
                            <div className='form-group'>
                                <label>RG:</label>
                                <input type='text' name='rg' defaultValue={dadosUsuario.rg} />
                            </div>
                            <div className='form-group'>
                                <label>Gênero:</label>
                                <input type='text' name='genero' defaultValue={dadosUsuario.genero} />
                            </div>
                            <div className='form-group'>
                                <label>Endereço:</label>
                                <input type='text' name='endereco' defaultValue={dadosUsuario.endereco} />
                            </div>
                            <div className='form-group'>
                                <label>Telefone:</label>
                                <input type='text' name='telefone' defaultValue={dadosUsuario.telefone} />
                            </div>
                            <div className='form-group'>
                                <label>Convênio Médico:</label>
                                <input type='text' name='convenioMedico' defaultValue={dadosUsuario.convenioMedico} />
                            </div>
                            <div className='form-group'>
                                <label>Plano do Convênio:</label>
                                <input type='text' name='planoConvenio' defaultValue={dadosUsuario.planoConvenio} />
                            </div>
                            <div className='form-group'>
                                <label>Tipo sanguíneo:</label>
                                <input type='text' name='tipoSanguineo' defaultValue={dadosUsuario.tipoSanguineo} />
                            </div>
                            <div className='form-group'>
                                <label>Email:</label>
                                <input type='email' name='email' defaultValue={dadosUsuario.email} />
                            </div>
                            <div className='form-buttons'>
                                <button type='submit'>Salvar</button>
                                <button type='button' onClick={handleCancel}>Cancelar</button>
                            </div>
                        </form>
                    ) : ( // Modo de visualização
                        <>
                            <img src={dadosUsuario.imagemGenero} alt="imagem-menino" className='imagem-profile' />
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
                            <button onClick={() => setEditando(true)}>Editar</button>
                        </>
                    )
                ) : (
                    <p className='carregando'>Carregando...</p> // Exibe uma mensagem de carregamento enquanto os dados são buscados
                )}
            </div>
        </div>
    );
}

export default PerfilPage;