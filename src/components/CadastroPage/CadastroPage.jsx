import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CadastroPage.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useTheme } from '../../context/ThemeContext';
import { IMask, IMaskInput } from 'react-imask';

function CadastroPage() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const { darkMode } = useTheme();

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

    const validateStep = (currentStep) => {
        if (currentStep === 1) {
            if (!formData.nomeCompleto.trim()) return "O campo Nome Completo é obrigatório.";
            if (!formData.dataDeNascimento) return "O campo Data de Nascimento é obrigatório.";
            if (formData.cpf.length !== 11) return "CPF deve ter 11 dígitos.";
            if (formData.rg.length < 7 || formData.rg.length > 10) return "RG deve ter entre 7 e 10 dígitos.";
            return null;
        }

        if (currentStep === 2) {
            if (!formData.endereco.trim()) return "O campo Endereço é obrigatório.";
            if (formData.telefone.length !== 11) return "Telefone deve ter 11 dígitos.";
            if (!formData.tipoSanguineo) return "O campo Tipo Sanguíneo é obrigatório.";
            return null;
        }

        if (currentStep === 3) {
            if (!formData.genero) return "O campo Gênero é obrigatório.";
            if (!formData.convenioMedico) return "O campo Convênio Médico é obrigatório.";
            if (formData.convenioMedico && !formData.planoConvenio) return "O campo Plano do Convênio é obrigatório.";
            return null;
        }

        return null;
    };

    const nextStep = () => {
        const validationError = validateStep(step);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const validateFinalFields = () => {
        const {
            nomeCompleto,
            dataDeNascimento,
            email,
            senha,
            confirmar_senha
        } = formData;

        const birthDate = new Date(dataDeNascimento);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18 || isNaN(birthDate.getTime())) return "Você deve ter pelo menos 18 anos para se cadastrar.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return "Email inválido.";

        if (senha.length < 6) return "A senha deve ter pelo menos 6 caracteres.";
        if (senha !== confirmar_senha) return "As senhas não coincidem.";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationError = validateFinalFields();

        if (validationError) {
            toast.error(validationError);
            return;
        }

        const generoImagem = formData.genero === 'Masculino' ? '/img/pacienteM.png' :
            formData.genero === 'Feminino' ? '/img/pacienteF.png' :
                '/img/pacienteOutro.png';

        try {
            const response = await axios.post('https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/paciente/cadastro',
                {
                    ...formData,
                    imagemGenero: generoImagem
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success('Cadastro realizado com sucesso!', {
                    onClose: () => navigate('/login')
                });
            } else {
                toast.error(response.data.message || 'Erro ao realizar cadastro');
            }

        } catch (error) {
            console.error('Erro no cadastro:', error);
            const errorMessage = error.response?.data?.message ||
                error.response?.data?.error ||
                'Erro ao conectar com o servidor';
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

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            const mask = IMask(inputRef.current, {
                mask: '000.000.000-00', // Formato do CPF
            });

            // Atualiza o estado com o valor SEM máscara
            mask.on('accept', () => {
                handleChange({
                    target: {
                        name: 'cpf',
                        value: mask.unmaskedValue // Remove pontos e traço
                    }
                });
            });

            // Limpeza ao desmontar
            return () => mask.destroy();
        }
    }, []); // Executa apenas no mount

    const rgRef = useRef(null);

    useEffect(() => {
        if (rgRef.current) {
            const mask = IMask(rgRef.current, {
                mask: '00.000.000-0', // Formato do RG
            });

            // Atualiza o estado com o valor SEM máscara
            mask.on('accept', () => {
                handleChange({
                    target: {
                        name: 'rg',
                        value: mask.unmaskedValue // Remove pontos e traço
                    }
                });
            });

            return () => mask.destroy();
        }
    }, []);

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Nome Completo</label>
                            <input
                                type="text"
                                name="nomeCompleto"
                                value={formData.nomeCompleto}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Data de Nascimento</label>
                            <input
                                type="date"
                                name="dataDeNascimento"
                                value={formData.dataDeNascimento}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>CPF</label>
                            <input
                                ref={inputRef}
                                type="text"
                                name="cpf"
                                defaultValue={formData.cpf} // Use defaultValue ao invés de value
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>RG</label>
                            <input
                                ref={rgRef}
                                type="text"
                                name="rg"
                                defaultValue={formData.rg}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Endereço</label>
                            <input
                                type="text"
                                name="endereco"
                                value={formData.endereco}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Telefone</label>
                            <IMaskInput
                                mask="(00) 00000-0000"
                                name="telefone"
                                value={formData.telefone}
                                onAccept={(value) =>
                                    setFormData((prev) => ({ ...prev, telefone: value }))
                                }
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>

                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Tipo Sanguíneo</label>
                            <select
                                name="tipoSanguineo"
                                value={formData.tipoSanguineo}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
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
                            <label className={darkMode ? 'dark' : ''}>Gênero</label>
                            <select
                                name="genero"
                                value={formData.genero}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                        </div>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Convênio Médico</label>
                            <select
                                name="convenioMedico"
                                value={formData.convenioMedico}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
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
                                <label className={darkMode ? 'dark' : ''}>Plano do Convênio</label>
                                <select
                                    name="planoConvenio"
                                    value={formData.planoConvenio}
                                    onChange={handleChange}
                                    className={`input-cadastro ${darkMode ? 'dark' : ''}`}
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
                            <label className={darkMode ? 'dark' : ''}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Senha</label>
                            <input
                                type="password"
                                name="senha"
                                value={formData.senha}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
                                required
                            />
                        </div>
                        <div className='text-field'>
                            <label className={darkMode ? 'dark' : ''}>Confirmar Senha</label>
                            <input
                                type="password"
                                name="confirmar_senha"
                                value={formData.confirmar_senha}
                                onChange={handleChange}
                                className={`input-cadastro ${darkMode ? 'dark' : ''}`}
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
        <div className={`container-page-cadastro ${darkMode ? 'dark' : ''}`}>
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />

            <div className={`container-formulario-cadastro ${darkMode ? 'dark' : ''}`}>
                <h1 className={`title-cadastro ${darkMode ? 'dark' : ''}`}>Cadastro (Passo {step} de 4)</h1>

                <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
                    {renderStep()}

                    <div className="form-navigation">
                        {step > 1 && (
                            <button type="button" className={`btn-prev ${darkMode ? 'dark' : ''}`} onClick={prevStep}>
                                Voltar
                            </button>
                        )}
                        {step < 4 ? (
                            <button type="button" className={`btn-next ${darkMode ? 'dark' : ''}`} onClick={nextStep}>
                                Próximo
                            </button>
                        ) : (
                            <button type="submit" className={`btn-submit ${darkMode ? 'dark' : ''}`}>
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