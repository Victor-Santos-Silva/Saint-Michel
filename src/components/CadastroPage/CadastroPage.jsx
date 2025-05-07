import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CadastroPage.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

function CadastroPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        nomeCompleto: '',
        dataDeNascimento: '',
        cpf: '',
        rg: '',
        genero: '',
        endereco: '',
        telefone: '',
        convenioMedico: '',
        planoConvenio: '',
        tipoSanguineo: '',
        email: '',
        senha: '',
        confirmar_senha: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: ['cpf', 'telefone', 'rg'].includes(name) ? value.replace(/\D/g, '') : value,
            ...(name === "convenioMedico" && { planoConvenio: "" })
        }));
    };

    const nextStep = () => {
        // Validação básica dos campos do passo atual
        if (step === 1 && (!formData.nomeCompleto || !formData.dataDeNascimento || !formData.cpf || !formData.rg)) {
            toast.error("Preencha todos os campos antes de continuar");
            return;
        }
        if (step === 2 && (!formData.endereco || !formData.telefone || !formData.email)) {
            toast.error("Preencha todos os campos antes de continuar");
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const validateFields = () => {
        const {
            nomeCompleto,
            dataDeNascimento,
            cpf,
            rg,
            genero,
            endereco,
            telefone,
            convenioMedico,
            planoConvenio,
            tipoSanguineo,
            email,
            senha,
            confirmar_senha
        } = formData;

        if (!nomeCompleto.trim()) return "O campo Nome Completo é obrigatório.";
        if (!dataDeNascimento) return "O campo Data de Nascimento é obrigatório.";
        
        const birthDate = new Date(dataDeNascimento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 18 || isNaN(birthDate.getTime())) return "Você deve ter pelo menos 18 anos para se cadastrar.";
        if (cpf.length !== 11) return "CPF deve ter 11 dígitos.";
        if (rg.length < 7 || rg.length > 10) return "RG deve ter entre 7 e 10 dígitos.";
        if (!genero) return "O campo Gênero é obrigatório.";
        if (!endereco.trim()) return "O campo Endereço é obrigatório.";
        if (telefone.length !== 11) return "Telefone deve ter 11 dígitos.";
        if (!convenioMedico) return "O campo Convênio Médico é obrigatório.";
        if (convenioMedico && !planoConvenio) return "O campo Plano do Convênio é obrigatório.";
        if (!tipoSanguineo) return "O campo Tipo Sanguíneo é obrigatório.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Email inválido.";
        if (senha.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
        if (senha !== confirmar_senha) return "As senhas não coincidem.";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateFields();

        if (validationError) {
            toast.error(validationError);
            return;
        }

        const generoImagem = formData.genero === 'Masculino' ? '/img/pacienteM.png' :
            formData.genero === 'Feminino' ? '/img/pacienteF.png' :
                '/img/pacienteOutro.png';

        try {
            await axios.post('http://localhost:5000/paciente/cadastro',
                { ...formData, imagemGenero: generoImagem },
                { headers: { 'Content-Type': 'application/json' } }
            );

            toast.success('Cadastro realizado com sucesso!', {
                onClose: () => navigate('/login')
            });

        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Erro ao realizar cadastro';
            toast.error(errorMessage);
        }
    };

    const convenios = {
        "Amil": ["Amil 400", "Amil 500", "Amil 700", "Amil One", "Amil Fácil"],
        "Bradesco Saúde": ["Nacional Flex", "Top Nacional", "Efetivo", "Preferencial Plus"],
        "SulAmérica": ["Clássico", "Especial 100", "Executivo", "Prestige"],
        "Unimed": ["Unimed Nacional", "Unimed Estadual", "Unimed Local", "Unimed Fácil"],
        "Hapvida": ["Mix", "Pleno", "Master", "Nacional"],
        "NotreDame Intermédica": ["Smart", "Advance", "Premium", "Infinity"],
        "Porto Seguro Saúde": ["Bronze", "Prata", "Ouro", "Diamante"],
        "Golden Cross": ["Essencial", "Clássico", "Especial"]
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className='text-field'>
                            <label>Nome Completo</label>
                            <input
                                type="text"
                                name="nomeCompleto"
                                value={formData.nomeCompleto}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label>Data de Nascimento</label>
                            <input
                                type="date"
                                name="dataDeNascimento"
                                value={formData.dataDeNascimento}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label>CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                maxLength="11"
                                className='input-cadastro'
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label>RG</label>
                            <input
                                type="text"
                                name="rg"
                                value={formData.rg}
                                onChange={handleChange}
                                maxLength="10"
                                className='input-cadastro'
                                required
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className='text-field'>
                            <label>Endereço</label>
                            <input
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label>Telefone</label>
                            <input
                                type="text"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                maxLength="11"
                                className='input-cadastro'
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label>Tipo Sanguíneo</label>
                            <select
                                name="tipoSanguineo"
                                value={formData.tipoSanguineo}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            >
                                {["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(tipo => (
                                    <option key={tipo} value={tipo}>{tipo || "Selecione"}</option>
                                ))}
                            </select>
                        </div>
                       
                    </>
                );
            case 3:
                return (
                    <>
                        <div className='text-field'>
                            <label>Gênero</label>
                            <select
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                        <div className='text-field'>
                            <label>Convênio Médico</label>
                            <select
                                name="convenioMedico"
                                value={formData.convenioMedico}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            >
                                <option value="">Selecione um convênio</option>
                                {Object.keys(convenios).map(convenio => (
                                    <option key={convenio} value={convenio}>{convenio}</option>
                                ))}
                            </select>
                        </div>
                        {formData.convenioMedico && (
                            <div className='text-field'>
                                <label>Plano do Convênio</label>
                                <select
                                    name="planoConvenio"
                                    value={formData.planoConvenio}
                                    onChange={handleChange}
                                    className='input-cadastro'
                                    required
                                >
                                    <option value="">Selecione um plano</option>
                                    {convenios[formData.convenioMedico].map(plano => (
                                        <option key={plano} value={plano}>{plano}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                );
            case 4:
                return (
                    <>

                        <div className='text-field'>
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label>Senha</label>
                            <input
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label>Confirmar Senha</label>
                            <input
                                type="password"
                                name="confirmar_senha"
                                value={formData.confirmar_senha}
                                onChange={handleChange}
                                className='input-cadastro'
                                required
                            />
                        </div>
                        
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className='container-page-cadastro'>
            <ToastContainer />
            
            <div className='container-formulario-cadastro'>
                <h1 className='title-cadastro'>Cadastro (Passo {step} de 4)</h1>

                <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
                    {renderStep()}

                    <div className="form-navigation">
                        {step > 1 && (
                            <button type="button" className='btn-prev' onClick={prevStep}>
                                Voltar
                            </button>
                        )}
                        {step < 4 ? (
                            <button type="button" className='btn-next' onClick={nextStep}>
                                Próximo
                            </button>
                        ) : (
                            <button type="submit" className='btn-submit'>
                                Finalizar Cadastro
                            </button>
                        )}
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default CadastroPage;