import React, { useEffect } from "react";
import "./Medico.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Doutores from "../../components/Doutores/Doutores";
import Contato from '../../components/Contato/Contato'
import Aos from "aos";



export default function Medico() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out"
    });
  }, [])
  return (
    <>
      <Navbar />
      <img src="../src/img/nossos-medicos.png" className="img-servicos" alt="Logo Servicos" data-aos="fade-down"/>
      <br />
      <div className='titulo-subtitulo-sobre' data-aos="fade-up">
        <h1 className='titulo-sobre'>OS MELHORES</h1>
        <h2 className='subTitulo-sobre-2'>Nossos Médicos</h2>
      </div>
      <Doutores />
      <Doutores />
      <Footer />
    </>
  );
};

