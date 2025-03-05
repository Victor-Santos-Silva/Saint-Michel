import React, { useState, useEffect } from 'react';
import './dependente.css';
import Footer from '../../../components/Footer/Footer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../../../components/Navbar/NavBar';

const AgendamentosDependentes = () => {
  return (
    <>
      <Navbar />

      <img src="../src/img/Faça um agendamento.png" className="img-servicos" alt="Logo Servicos" data-aos="fade-down" />

      <div className="calendar-container" data-aos="fade-up">
      <h1 className="tittle-contato" data-aos="fade-right">Faça já seu agendamento</h1>
      <h1 className="team-title" data-aos="fade-left">Agende agora</h1>
      </div>

      <div className="container-form">
        <h2 className="title">Agendamento de Consulta</h2>
        <div className="form-grid">
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Data de nascimento</label>
            <input type="date" />
          </div>
          <div className="form-group">
            <label>CPF</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Endereço</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Gênero</label>
            <select>
              <option>
                Masculino
              </option>
              <option>
                Feminino
              </option>
              <option>
                Outro
              </option>
            </select>
          </div>
          <div className="form-group">
            <label>Etnia</label>
            <select>
              <option>Preto</option>
              <option>Branco</option>
              <option>Pardo</option>
              <option>Amarelo</option>
              <option>Indígena</option>
            </select>
          </div>
          <div className="form-group">
            <label>Algum problema de saúde?</label>
            <input type="text" />
          </div>
          <div className="form-group full-width">
            <label>Parentesco</label>
            <input type="text" />
          </div>
        </div>
        <br />
        <div className="form-group">
        <label>Tipo de Exame</label>
        <select>
          <optgroup label='Exames de Rotina'>
            <option>Hemograma</option>
            <option>Colesterol</option>
            <option>Glicose</option>
            <option>TSH e T4</option>
            <option>Ureia e Creatina</option>
            <option>Transaminases "ALT e AST", TGP e TGO</option>
            <option>Dosagem de vitaminas e minerais</option>
            <option>Urina e fezes</option>
          </optgroup>

          <optgroup label='Exames de Imagem'>
            <option>Radiografia</option>
            <option>Eletrocardiograma</option>
            <option>Ultrassom</option>
            <option>Tomografia</option>
            <option> Ressonância Magnética</option>
          </optgroup>

          <optgroup label='Exames Clínicos'>
            <option>Anamnese</option>
            <option>Exame Físico</option>
          </optgroup>

          <optgroup label='Procedimentos Diagnósticos'>
            <option>Auscultação</option>
            <option>Esstudos com radiografia de bário</option>
            <option>Biópsia</option>
            <option>Medição de Pressão Arterial</option>
          </optgroup>

          <optgroup label='Outros Exames'>
            <option>Papanicolau</option>
            <option>Perfil Lipídico</option>
            <option>Dosagem de hormonios de Tireóide</option>
          </optgroup>
        </select>
      </div>
      <br />
        <button className="submit-btn">Ir para o próximo formulário</button>
        <br />
      </div>
      <br />
      
      <Footer />
    </>
  );
};

export default AgendamentosDependentes;
