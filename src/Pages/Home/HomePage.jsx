import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import Aos from 'aos';
import './HomePage.css';

import medicos from '../../img/medicos.png';
import medicosFelizes from '../../img/medicos-felizes.png';
import cuidadoSaudeDoMedico from '../../img/cuidados-saude-do-medico.png';
import casalDeMedicos from '../../img/casal de medicos.png';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import checkup from '../../img/checkup.png';
import cardiograma from '../../img/cardiograma.png';
import dna from '../../img/dna.png';
import bancoSangue from '../../img/bancoSangue.png';
import grupo from '../../img/grupo.png';
import cuidados from '../../img/cuidados.png';
import CarouselMedico from '../../components/CarrosselMedicos/CarrosselMedicos';

import coracaoEscuro from '../../img/coracaoEscuro.png';
import { Link } from 'react-router-dom';
import Contato from '../../components/Contato/Contato';

const services = [
    { img: checkup },
    { img: cardiograma },
    { img: dna },
    { img: bancoSangue }
];

const especialidades = [
    { nome: "Ortopedia", img: coracaoEscuro },
    { nome: "Proctologia", img: coracaoEscuro },
    { nome: "Oncologia", img: coracaoEscuro },
    { nome: "Otorrino", img: coracaoEscuro },
    { nome: "Oftalmologia", img: coracaoEscuro },
    { nome: "Cardiologia", img: coracaoEscuro },
    { nome: "Pneumologia", img: coracaoEscuro },
    { nome: "Renal", img: coracaoEscuro },
    { nome: "Gastro", img: coracaoEscuro },
    { nome: "Urologia", img: coracaoEscuro },
    { nome: "Dermatologia", img: coracaoEscuro },
    { nome: "Ginecologia", img: coracaoEscuro }
];

const HomePage = () => {
    useEffect(() => {
        Aos.init({ duration: 1000, once: true, easing: "ease-in-out" });
    }, []);

    return (
        <>
            <Navbar />
            <div className='homepage'>
                <div className='carrossel' data-aos="fade-up">
                    <Carousel>
                        <Carousel.Item>
                            <img className='imagem' src={medicosFelizes} alt="Imagem dois" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='imagem' src={cuidadoSaudeDoMedico} alt="Imagem dois" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className='imagem' src={casalDeMedicos} alt="Imagem dois" />
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div className="homepage-container" data-aos="fade-up">
                    <p className='titulo'>BEM VINDO A SAINT-MICHEL</p>
                    <h4 className='segundoTitulo'>Um ótimo lugar para receber cuidados</h4>
                    <p className='paragrafoHome'>Confira a história do nosso hospital.</p>
                    <p className='saibaMais'>
                        <Link to='/sobre'>Saiba mais</Link>
                        <img className='seta' src="../src/img/seta.png" />
                    </p>
                    <img className='medico' src={medicos} data-aos="fade-right" />
                </div>

                <p className='titulo' data-aos="fade-up">CUIDADO EM QUE VOCÊ PODE ACREDITAR</p>
                <h4 className='segundoTitulo' data-aos="fade-up">Nossos Serviços</h4>

                <div className='conjunto-nossos-servicos'>
                    <div className="menu-servicos-homepage" data-aos="fade-up">
                        {services.map((service, index) => (
                            <div key={index} className={'menu-item-homepage'}>
                                <img src={service.img} alt="Serviço" className='img-menu-servicos' />
                            </div>
                        ))}
                        <div className="ver-tudo"><Link to='/servicos'>Ver tudo</Link></div>
                    </div>

                    <div>
                        <h1 className='frase-homepage' data-aos="fade-up"><b>Paixão por colocar os pacientes em primeiro lugar.</b></h1>
                        <div className='lista-homepage'>
                            <ul>
                                <li>Uma paixão pela cura</li>
                                <li>Um legado de excelência</li>
                                <li>Profissionais capacitados</li>
                            </ul>
                            <ul>
                                <li>Ambiente seguro e moderno</li>
                                <li>Atendimento humanizado</li>
                                <li>Tecnologia de ponta</li>
                            </ul>
                        </div>
                        <div className='segundoParagrafoHome' data-aos="fade-up">
                            <p>Na Rede Hospitalar Saint Michel, temos uma paixão pela cura que guia cada passo do nosso trabalho, sustentada por um legado de excelência em cuidados médicos...</p>
                        </div>
                    </div>

                    <div className='imgLateral'>
                        <img src={grupo} alt="Grupo" data-aos="fade-left" />
                        <img src={cuidados} alt="Cuidados" data-aos="fade-left" />
                    </div>
                </div>

                <div className='subtitulosHome' data-aos="fade-up">
                    <p className='titulo'>SEMPRE CUIDANDO</p>
                    <h4 className='segundoTitulo'>Nossas Especialidades</h4>
                </div>

                <div className="especialidades-grid" data-aos="fade-up">
                    {especialidades.map((item, index) => (
                        <div key={index} className={`especialidade`}>
                            <img src={item.img} alt={item.nome} />
                            <p>{item.nome}</p>
                        </div>
                    ))}
                </div>

                <img className='medicoBranco' src="../src/img/medicoBranco.png" data-aos="fade-up" />

                <div className='titulosFinais' data-aos="fade-up">
                    <p className='titulo'>CUIDADO CONFIÁVEL</p>
                    <h4 className='segundoTitulo'>Nossos Médicos</h4>
                </div>

                <CarouselMedico />
                <Contato />
                <Footer />
            </div>
        </>
    );
};

export default HomePage;