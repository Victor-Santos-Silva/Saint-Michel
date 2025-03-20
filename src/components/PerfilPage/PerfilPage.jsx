import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './PerfilPage.css';

function PerfilPage() {
    const [dadosUsuario, setDadosUsuario] = useState(null);
    const [editando, setEditando] = useState(false);
    const { token, id } = useAuth();

    const calcularIdade = (dataNascimento) => {
        const nascimento = new Date(dataNascimento);
        const hoje = new Date();
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/paciente/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setDadosUsuario(response.data.usuario);
            } catch (err) {
                console.error("Erro na requisição:", err);
            }
        };

        if (token && id) fetchUserData();
    }, [token, id]);

    const handleSave = async (dadosAtualizados) => {
        try {
            const response = await axios.put(`http://localhost:5000/paciente/${id}`, dadosAtualizados, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDadosUsuario(response.data.usuario);
            setEditando(false);
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err);
        }
    };

    const handleCancel = () => setEditando(false);

    return (
        <div className='perfil-container'>
           
            {dadosUsuario ? (
                editando ? (
                    <form className='edit-form' onSubmit={(e) => {
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
                        <div className='user-header'>
                            <img src={dadosUsuario.imagemGenero} className='imagem-profile' alt="Perfil" />
                            <div className='form-group'>
                                <label>Nome Completo</label>
                                <input type='text' name='nomeCompleto' defaultValue={dadosUsuario.nomeCompleto} />
                            </div>
                        </div>

                        <div className='dados-section'>
                            <h3 className='dados-title'>Informações Pessoais</h3>
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Data de Nascimento</label>
                                    <input type='text' name='dataDeNascimento' defaultValue={dadosUsuario.dataDeNascimento} />
                                </div>
                                <div className='form-group'>
                                    <label>CPF</label>
                                    <input type='text' name='cpf' defaultValue={dadosUsuario.cpf} />
                                </div>
                                <div className='form-group'>
                                    <label>RG</label>
                                    <input type='text' name='rg' defaultValue={dadosUsuario.rg} />
                                </div>
                                <div className='form-group'>
                                    <label>Gênero</label>
                                    <input type='text' name='genero' defaultValue={dadosUsuario.genero} />
                                </div>
                                <div className='form-group'>
                                    <label>Endereço</label>
                                    <input type='text' name='endereco' defaultValue={dadosUsuario.endereco} />
                                </div>
                                <div className='form-group'>
                                    <label>Telefone</label>
                                    <input type='text' name='telefone' defaultValue={dadosUsuario.telefone} />
                                </div>
                                <div className='form-group'>
                                    <label>Convênio Médico</label>
                                    <input type='text' name='convenioMedico' defaultValue={dadosUsuario.convenioMedico} />
                                </div>
                                <div className='form-group'>
                                    <label>Plano do Convênio</label>
                                    <input type='text' name='planoConvenio' defaultValue={dadosUsuario.planoConvenio} />
                                </div>
                                <div className='form-group'>
                                    <label>Tipo Sanguíneo</label>
                                    <input type='text' name='tipoSanguineo' defaultValue={dadosUsuario.tipoSanguineo} />
                                </div>
                                <div className='form-group'>
                                    <label>Email</label>
                                    <input type='email' name='email' defaultValue={dadosUsuario.email} />
                                </div>
                            </div>
                        </div>

                        <div className='button-group'>
                            <button type='submit' className='btn-editar'>Salvar Alterações</button>
                            <button type='button' className='btn-editar' onClick={handleCancel}>Cancelar</button>
                        </div>
                    </form>
                ) : (
                    <div className='profile-content'>
                        <div className='left-section'>
                            <div className='user-header'>
                                <img src={dadosUsuario.imagemGenero} className='imagem-profile' alt="Perfil" />
                                <div className='user-info'>
                                    <h2>{dadosUsuario.nomeCompleto}</h2>
                                    <p>{dadosUsuario.email}</p>
                                </div>
                            </div>
                            
                            <div className='dados-grid personal-info'>
                                <div className='dados-item'>
                                    <strong>Idade</strong>
                                    <span>{calcularIdade(dadosUsuario.dataDeNascimento)} anos</span>
                                </div>
                                <div className='dados-item'>
                                    <strong>CPF</strong>
                                    <span>{dadosUsuario.cpf}</span>
                                </div>
                                <div className='dados-item'>
                                    <strong>RG</strong>
                                    <span>{dadosUsuario.rg}</span>
                                </div>
                                <div className='dados-item'>
                                    <strong>Data de Nascimento</strong>
                                    <span>{dadosUsuario.dataDeNascimento}</span>
                                </div>
                            </div>
                        </div>

                        <div className='right-section'>
                            <div className='dados-section'>
                                <h3 className='dados-title'>Dados do Perfil</h3>
                                <br />  
                                <div className='dados-grid'>
                                    <div className='dados-item'>
                                        <strong>Gênero</strong>
                                        <span>{dadosUsuario.genero}</span>
                                    </div>
                                    <div className='dados-item'>
                                        <strong>Endereço</strong>
                                        <span>{dadosUsuario.endereco}</span>
                                    </div>
                                    <div className='dados-item'>
                                        <strong>Telefone</strong>
                                        <span>{dadosUsuario.telefone}</span>
                                    </div>
                                    <div className='dados-item'>
                                        <strong>Convênio Médico</strong>
                                        <span>{dadosUsuario.convenioMedico}</span>
                                    </div>
                                    <div className='dados-item'>
                                        <strong>Plano do Convênio</strong>
                                        <span>{dadosUsuario.planoConvenio}</span>
                                    </div>
                                    <div className='dados-item'>
                                        <strong>Tipo Sanguíneo</strong>
                                        <span>{dadosUsuario.tipoSanguineo}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='button-group'>
                            <button className='btn-editar' onClick={() => setEditando(true)}>
                                Editar Perfil
                            </button>
                        </div>
                    </div>
                )
            ) : (
                <p className='carregando'>Carregando...</p>
            )}
        </div>
    );
}

export default PerfilPage;