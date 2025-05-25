import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './PerfilPage.css';
import {
  FaPhone, FaMapMarkerAlt, FaEnvelope, FaEdit,
  FaSave, FaTimes, FaIdCard,
  FaBirthdayCake, FaVenusMars, FaTint, FaHospital,
  FaFileAlt, FaUserPlus
} from 'react-icons/fa';

function PerfilPage() {
  const [userData, setUserData] = useState(null);
  const [dependenteData, setDependenteData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDependentModal, setShowDependentModal] = useState(false);
  const { token, id } = useAuth();

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return 'Não informada';
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const diffMes = hoje.getMonth() - nascimento.getMonth();
    if (diffMes < 0 || (diffMes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await axios.get(`http://localhost:5000/paciente/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUserData(resposta.data.usuario);
      } catch (erro) {
        console.error("Erro na requisição:", erro);
      }
    };

    if (token && id) buscarDados();
  }, [token, id]);

  const salvarEdicao = async (dadosAtualizados) => {
    try {
      await axios.put(`http://localhost:5000/paciente/${id}`, dadosAtualizados, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUserData(prev => ({ ...prev, ...dadosAtualizados }));
      setIsEditing(false);
    } catch (erro) {
      console.error("Erro ao atualizar usuário:", erro);
    }
  };

  const adicionarDependente = async (e) => {
    e.preventDefault();

    const generoSelecionado = e.target.genero.value;
    const generoImagem =
      generoSelecionado === 'Masculino'
        ? '/img/pacienteM.png'
        : generoSelecionado === 'Feminino'
          ? '/img/pacienteF.png'
          : '/img/pacienteOutro.png';

    try {
      const novoDependente = {
        usuario_id: id,
        nomeCompleto: e.target.nome.value,
        parentesco: e.target.parentesco.value,
        dataNascimento: e.target.dataNascimento.value,
        cpf: e.target.cpf.value,
        tipoSanguineo: e.target.tipoSanguineo.value,
        genero: generoSelecionado,
        imagemGenero: generoImagem
      };

      await axios.post(`http://localhost:5000/dependente`, novoDependente, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const resposta = await axios.get(`http://localhost:5000/paciente/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserData(resposta.data.usuario);
      setShowDependentModal(false);
      toast.success('Dependente cadastrado com sucesso!');
    } catch (erro) {
      console.error("Erro ao adicionar dependente:", erro);
      toast.error('Erro ao cadastrar dependente');
    }
  };


  useEffect(() => {
    const fetchDependente = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/dependente/dependenteAdicionado/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setDependenteData(response.data);
        console.log("Dependente:", response.data);
      } catch (error) {
        console.error("Erro ao buscar dependente:", error);
      }
    };

    if (id) {
      fetchDependente();
    }
  }, [id]);

  if (!userData) {
    return <div className="carregando"><p>Carregando...</p></div>;
  }

  return (
    <div className='perfil'>
      {/* Modal Dependente */}
      {showDependentModal && (
        <div className="modal" onClick={() => setShowDependentModal(false)}>
          <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
            <div className="modal-topo">
              <h3>Adicionar Dependente</h3>
              <button onClick={() => setShowDependentModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={adicionarDependente}>
              <div className='form-linha'>
                <div className='form-grupo'>
                  <label>Nome Completo</label>
                  <input type="text" name="nome" required />
                </div>
                <div className='form-grupo'>
                  <label>Parentesco</label>
                  <select name="parentesco" required>
                    <option value="">Selecione</option>
                    <option value="Pai">Pai</option>
                    <option value="Mãe">Mãe</option>
                    <option value="Irmão">Irmão</option>
                    <option value="Irmã">Irmã</option>
                    <option value="Cônjuge">Cônjuge</option>
                    <option value="Filho">Filho</option>
                    <option value="Filha">Filha</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div className='form-grupo'>
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    required
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className='form-grupo'>
                  <label>CPF</label>
                  <input
                    type="text"
                    name="cpf"
                    required
                    pattern="\d{11}"
                    maxLength="11"
                    title="Digite os 11 números do CPF, sem pontos ou traços"
                  />
                </div>

                <div className='form-grupo'>
                  <label>Tipo Sanguineo</label>
                  <select name="tipoSanguineo" required>
                    <option value="">Selecione</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className='form-grupo'>
                  <label>Gênero</label>
                  <select name="genero" required>
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

              </div>
              <div className='form-botoes-dependente'>
                <button type="submit" className="salvarDependente">
                  <FaSave /> Salvar
                </button>
                <button
                  type="button"
                  className="cancelarDependente"
                  onClick={() => setShowDependentModal(false)}
                >
                  <FaTimes /> Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditing ? (
        <form
          className='form-editar'
          onSubmit={(e) => {
            e.preventDefault();
            salvarEdicao({
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
        >
          <div className='perfil-topo'>
            <img
              src={userData.imagemGenero}
              className='perfil-foto'
              alt="Perfil"
            />
            <div className='form-grupo'>
              <label>Nome Completo</label>
              <input type='text' name='nomeCompleto' defaultValue={userData.nomeCompleto} />
            </div>
          </div>

          <div className='secao'>
            <h3>Informações Pessoais</h3>
            <div className='form-linha'>
              <div className='form-grupo'>
                <label>Data de Nascimento</label>
                <input type='date' name='dataDeNascimento' defaultValue={userData.dataDeNascimento} />
              </div>
              <div className='form-grupo'>
                <label>CPF</label>
                <input type='text' name='cpf' defaultValue={userData.cpf} />
              </div>
              <div className='form-grupo'>
                <label>RG</label>
                <input type='text' name='rg' defaultValue={userData.rg} />
              </div>
              <div className='form-grupo'>
                <label>Gênero</label>
                <select name='genero' defaultValue={userData.genero}>
                  <option value="">Selecione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div className='form-grupo'>
                <label>Endereço</label>
                <input type='text' name='endereco' defaultValue={userData.endereco} />
              </div>
              <div className='form-grupo'>
                <label>Telefone</label>
                <input type='text' name='telefone' defaultValue={userData.telefone} />
              </div>
              <div className='form-grupo'>
                <label>Convênio Médico</label>
                <input type='text' name='convenioMedico' defaultValue={userData.convenioMedico} />
              </div>
              <div className='form-grupo'>
                <label>Plano do Convênio</label>
                <input type='text' name='planoConvenio' defaultValue={userData.planoConvenio} />
              </div>
              <div className='form-grupo'>
                <label>Tipo Sanguíneo</label>
                <input type='text' name='tipoSanguineo' defaultValue={userData.tipoSanguineo} />
              </div>
              <div className='form-grupo'>
                <label>Email</label>
                <input type='email' name='email' defaultValue={userData.email} />
              </div>
            </div>
          </div>

          <div className='form-botoes'>
            <button type='submit' className='botao botao-salvar'>
              <FaSave /> Salvar
            </button>
            <button type='button' className='botao botao-cancelar' onClick={() => setIsEditing(false)}>
              <FaTimes /> Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className='perfil-visualizar'>
          <div className='perfil-cartao'>
            <div className='perfil-topo'>
              <img
                src={userData.imagemGenero}
                className='perfil-foto'
                alt="Perfil"
              />
              <div className='perfil-info'>
                <h2>{userData.nomeCompleto}</h2>
                <p><FaEnvelope /> {userData.email}</p>
                <p><FaPhone /> {userData.telefone || 'Não informado'}</p>
                <p><FaMapMarkerAlt /> {userData.endereco || 'Não informado'}</p>
              </div>
            </div>

            <div className='perfil-botoes'>
              <button className='botao botao-primario' onClick={() => setIsEditing(true)}>
                <FaEdit /> Editar Perfil
              </button>
              <button className='botao botao-primario' onClick={() => setShowDependentModal(true)}>
                <FaUserPlus /> Adicionar Dependente
              </button>
            </div>
          </div>

          <div className='perfil-detalhes'>
            <div className='secao'>
              <h3>Informações Pessoais</h3>
              <div className='detalhes-grade'>
                <div className='detalhe-item'>
                  <FaBirthdayCake className="icone" />
                  <div>
                    <strong>Idade</strong>
                    <span>{calcularIdade(userData.dataDeNascimento)} anos</span>
                  </div>
                </div>
                <div className='detalhe-item'>
                  <FaBirthdayCake className="icone" />
                  <div>
                    <strong>Data de Nascimento</strong>
                    <span>{userData.dataDeNascimento || 'Não informada'}</span>
                  </div>
                </div>
                <div className='detalhe-item'>
                  <FaIdCard className="icone" />
                  <div>
                    <strong>CPF</strong>
                    <span>{userData.cpf || 'Não informado'}</span>
                  </div>
                </div>
                <div className='detalhe-item'>
                  <FaIdCard className="icone" />
                  <div>
                    <strong>RG</strong>
                    <span>{userData.rg || 'Não informado'}</span>
                  </div>
                </div>
                <div className='detalhe-item'>
                  <FaVenusMars className="icone" />
                  <div>
                    <strong>Gênero</strong>
                    <span>{userData.genero || 'Não informado'}</span>
                  </div>
                </div>
                <div className='detalhe-item'>
                  <FaTint className="icone" />
                  <div>
                    <strong>Tipo Sanguíneo</strong>
                    <span>{userData.tipoSanguineo || 'Não informado'}</span>
                  </div>
                </div>
                <div className='detalhe-item'>
                  <FaHospital className="icone" />
                  <div>
                    <strong>Convênio Médico</strong>
                    <span>{userData.convenioMedico || 'Não informado'}</span>
                  </div>
                </div>
                <div className='detalhe-item'>
                  <FaFileAlt className="icone" />
                  <div>
                    <strong>Plano do Convênio</strong>
                    <span>{userData.planoConvenio || 'Não informado'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className='perfil-dependentes'>
        <h3>Dependentes</h3>
        {dependenteData && dependenteData.length > 0 ? (
          <ul>
            {dependenteData.map((dependente) => (
              <li key={dependente.id}>
                <strong>{dependente.nomeCompleto}</strong> - {dependente.parentesco} - {dependente.dataNascimento}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum dependente cadastrado.</p>
        )}
      </div>

    </div>
  );
}

export default PerfilPage;