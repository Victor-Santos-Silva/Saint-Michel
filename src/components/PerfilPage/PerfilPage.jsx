import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './PerfilPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function PerfilPage() {
    const [dadosUsuario, setDadosUsuario] = useState(null);
    const [editando, setEditando] = useState(false);
    const [showDependenteModal, setShowDependenteModal] = useState(false);
    const { token, id } = useAuth();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 120
        });
    }, []);

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
            setDadosUsuario(prev => ({
                ...prev,
                ...dadosAtualizados
            }));
            setEditando(false);
            
            await axios.put(`http://localhost:5000/paciente/${id}`, dadosAtualizados, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
        } catch (err) {
            console.error("Erro ao atualizar usuário:", err);
        }
    };

    const handleAdicionarDependente = async (e) => {
        e.preventDefault();
        try {
            const novoDependente = {
                nome: e.target.nome.value,
                parentesco: e.target.parentesco.value,
                dataNascimento: e.target.dataNascimento.value,
                cpf: e.target.cpf.value,
                tipoSanguineo: e.target.tipoSanguineo.value
            };

            await axios.post(`http://localhost:5000/paciente/${id}/dependentes`, novoDependente, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Atualiza os dados do usuário
            const response = await axios.get(`http://localhost:5000/paciente/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setDadosUsuario(response.data.usuario);
            
            setShowDependenteModal(false);
        } catch (err) {
            console.error("Erro ao adicionar dependente:", err);
        }
    };

    const handleCancel = () => setEditando(false);

    if (!dadosUsuario) {
        return <p className='carregando'>Carregando...</p>;
    }

    return (
        <div className='perfil-container' data-aos="fade-up">
            {showDependenteModal && (
                <div className="modal-overlay" onClick={() => setShowDependenteModal(false)}>
                    <div 
                        className="popup-container" 
                        onClick={(e) => e.stopPropagation()}
                        data-aos="zoom-in"
                    >
                        <div className="popup-header">
                            <h3>Adicionar Dependente</h3>
                            <button 
                                className="popup-close"
                                onClick={() => setShowDependenteModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleAdicionarDependente}>
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label>Nome Completo</label>
                                    <input type="text" name="nome" required />
                                </div>
                                <div className='form-group'>
                                    <label>Parentesco</label>
                                    <input type="text" name="parentesco" required />
                                </div>
                                <div className='form-group'>
                                    <label>Data de Nascimento</label>
                                    <input type="date" name="dataNascimento" required />
                                </div>
                                <div className='form-group'>
                                    <label>CPF</label>
                                    <input type="text" name="cpf" required />
                                </div>
                                <div className='form-group'>
                                    <label>RG</label>
                                    <input type="text" name="cpf" required />
                                </div>
                                <div className='form-group'>
                                    <label>Convênio</label>
                                    <input type="text" name="cpf" required />
                                </div>
                                <div className='form-group'>
                                    <label>Tipo Sanguíneo</label>
                                    <input type="text" name="tipoSanguineo" required />
                                </div>
                            </div>
                            <div className='button-group'>
                                <button type="submit" className="btn-editar">Salvar</button>
                                <button 
                                    type="button" 
                                    className="btn-editar"
                                    onClick={() => setShowDependenteModal(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editando ? (
                <form 
                    className='edit-form' 
                    onSubmit={(e) => {
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
                    }}
                    data-aos="zoom-in"
                >
                    <div className='user-header' data-aos="fade-right" data-aos-delay="200">
                        <img 
                            src={dadosUsuario.imagemGenero} 
                            className='imagem-profile' 
                            alt="Perfil" 
                            data-aos="zoom-in"
                            data-aos-delay="300"
                        />
                        <div className='form-group' data-aos="fade-left" data-aos-delay="400">
                            <label>Nome Completo</label>
                            <input type='text' name='nomeCompleto' defaultValue={dadosUsuario.nomeCompleto} />
                        </div>
                    </div>

                    <div className='dados-section' data-aos="fade-up" data-aos-delay="500">
                        <h3 className='dados-title' data-aos="fade-down">Informações Pessoais</h3>
                        <div className='form-row'>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="600">
                                <label>Data de Nascimento</label>
                                <input type='text' name='dataDeNascimento' defaultValue={dadosUsuario.dataDeNascimento} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="650">
                                <label>CPF</label>
                                <input type='text' name='cpf' defaultValue={dadosUsuario.cpf} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="700">
                                <label>RG</label>
                                <input type='text' name='rg' defaultValue={dadosUsuario.rg} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="750">
                                <label>Gênero</label>
                                <input type='text' name='genero' defaultValue={dadosUsuario.genero} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="800">
                                <label>Endereço</label>
                                <input type='text' name='endereco' defaultValue={dadosUsuario.endereco} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="850">
                                <label>Telefone</label>
                                <input type='text' name='telefone' defaultValue={dadosUsuario.telefone} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="900">
                                <label>Convênio Médico</label>
                                <input type='text' name='convenioMedico' defaultValue={dadosUsuario.convenioMedico} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="950">
                                <label>Plano do Convênio</label>
                                <input type='text' name='planoConvenio' defaultValue={dadosUsuario.planoConvenio} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="1000">
                                <label>Tipo Sanguíneo</label>
                                <input type='text' name='tipoSanguineo' defaultValue={dadosUsuario.tipoSanguineo} />
                            </div>
                            <div className='form-group' data-aos="fade-up" data-aos-delay="1050">
                                <label>Email</label>
                                <input type='email' name='email' defaultValue={dadosUsuario.email} />
                            </div>
                        </div>
                    </div>

                    <div className='button-group' data-aos="fade-up" data-aos-delay="1100">
                        <button type='submit' className='btn-salvarinfo'>Salvar Alterações</button>
                        <button type='button' className='btn-editar' onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            ) : (
                <div className='profile-content'>
                    <div className='left-section' data-aos="fade-right" data-aos-delay="200">
                        <div className='user-header'>
                            <img 
                                src={dadosUsuario.imagemGenero} 
                                className='imagem-profile' 
                                alt="Perfil" 
                                data-aos="zoom-in"
                                data-aos-delay="300"
                            />
                            <div className='user-info' data-aos="fade-left" data-aos-delay="400">
                                <h2>{dadosUsuario.nomeCompleto}</h2>
                                <p>{dadosUsuario.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className='right-section' data-aos="fade-left" data-aos-delay="500">
                        <div className='dados-section'>
                            <h3 className='dados-title' data-aos="fade-down" data-aos-delay="600">Dados do Perfil</h3>
                            <div className='dados-grid'>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="700">
                                    <strong>Idade</strong>
                                    <span>{calcularIdade(dadosUsuario.dataDeNascimento)} anos</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="750">
                                    <strong>Data de Nascimento</strong>
                                    <span>{dadosUsuario.dataDeNascimento}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="800">
                                    <strong>CPF</strong>
                                    <span>{dadosUsuario.cpf}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="850">
                                    <strong>RG</strong>
                                    <span>{dadosUsuario.rg}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="900">
                                    <strong>Gênero</strong>
                                    <span>{dadosUsuario.genero}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="950">
                                    <strong>Endereço</strong>
                                    <span>{dadosUsuario.endereco}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="1000">
                                    <strong>Telefone</strong>
                                    <span>{dadosUsuario.telefone}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="1050">
                                    <strong>Convênio Médico</strong>
                                    <span>{dadosUsuario.convenioMedico}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="1100">
                                    <strong>Plano do Convênio</strong>
                                    <span>{dadosUsuario.planoConvenio}</span>
                                </div>
                                <div className='dados-item' data-aos="fade-up" data-aos-delay="1150">
                                    <strong>Tipo Sanguíneo</strong>
                                    <span>{dadosUsuario.tipoSanguineo}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='button-group' data-aos="fade-up" data-aos-delay="1200">
                        <button 
                            className='btn-editar' 
                            onClick={() => setEditando(true)}
                            data-aos="zoom-in"
                        >
                            Editar Perfil
                        </button>
                        <br /><br />
                        <button 
                            className='btn-editar'
                            onClick={() => setShowDependenteModal(true)}
                            data-aos="zoom-in"
                        >
                            Adicionar Dependente
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PerfilPage;