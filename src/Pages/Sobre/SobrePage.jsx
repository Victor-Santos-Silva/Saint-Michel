import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import { useTheme } from '../../context/ThemeContext';
import './sobrePage.css';

export default function SobrePage() {
    const { darkMode } = useTheme();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            startEvent: 'load', // Força a detecção inicial
        });
        
        // Atualiza as animações quando o tema muda
        return () => {
            AOS.refreshHard(); // Reinicialização mais completa
        };
    }, [darkMode]); // Adicione darkMode como dependência

    return (
        <>
            <Navbar />
            <div className={`sobre-page ${darkMode ? 'dark' : ''}`}>
                <img 
                    src="../../img/medicos em sobre.png" 
                    alt="" 
                    className="img-doutores-sobre" 
                    data-aos="fade-down"
                />

                <div className="container-sobre-master">
                    <img 
                        src="../../img/medicas em sobre.png" 
                        alt="" 
                        className="img-medicas-sobre" 
                        data-aos="fade-right"
                    />

                    <div className="child-sobre" data-aos="fade-left">
                        <div className="container-sobre">
                            <h1 className="titulo-sobre" data-aos="fade-up">
                                BEM-VINDO AO SAINT-MICHEL
                            </h1>
                            <h1 className="subTitulo-sobre" data-aos="fade-up" data-aos-delay="200">
                                Melhor lugar para
                            </h1>
                            <h1 className="subTitulo-sobre" data-aos="fade-up" data-aos-delay="400">
                                cuidar da sua saúde!
                            </h1>
                        </div>

                        <div className="container-listas" data-aos="zoom-in">
                            <ul className="ul-container-listas">
                                <li className="li-container-listas">Uma Paixão pela Cura</li>
                                <li className="li-container-listas">Todo o Nosso Melhor</li>
                                <li className="li-container-listas">Cuidando Sempre</li>
                            </ul>

                            <ul className="ul-container-listas">
                                <li className="li-container-listas">Atendimento 5 Estrelas</li>
                                <li className="li-container-listas">Acredite em Nós</li>
                                <li className="li-container-listas">Um Legado de Excelência</li>
                            </ul>
                        </div>

                        <div className="container-texto-sobre" data-aos="fade-up">
                            <p className="texto-sobre">
                                   Na Rede Hospitalar Saint Michel, temos uma paixão pela cura, dedicando todo o nosso melhor em cada detalhe do cuidado com o paciente. Nosso compromisso é cuidar sempre, oferecendo uma atenção personalizada e acolhedora que faz a diferença na vida de quem confia em nós. Reconhecidos por um atendimento 5 estrelas, unimos tecnologia de ponta e profissionais experientes para garantir a melhor experiência possível. Ao escolher a Saint Michel, você pode acreditar em nós e em um legado de excelência que coloca sua saúde e bem-estar em primeiro lugar.
                        </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}