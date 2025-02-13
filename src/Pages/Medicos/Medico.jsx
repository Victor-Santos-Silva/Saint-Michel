import React from "react";
import "./Medico.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Doutores from "../../components/Doutores/Doutores";
import Banner from '../../components/Banner/Banner'
import Contato from '../../components/Contato/Contato'



const Medico = () => {
  return (
    <>
      <Navbar />
      <img src="../src/img/logo servico.png" className="img-servicos" alt="Logo Servicos" />
      <br />
      <div className='titulo-subtitulo-sobre' data-aos="fade-up">
        <h1 className='titulo-sobre'>OS MELHORES</h1>
        <h2 className='subTitulo-sobre-2'>Nossos Médicos</h2>
      </div>
      <Doutores />
      <Doutores />

      <Banner />
      <Contato />
      <Footer />
    </>
  );
};

export default Medico;
