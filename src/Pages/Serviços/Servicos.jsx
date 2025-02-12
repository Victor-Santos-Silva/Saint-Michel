import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Servicos.css";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import Contato from "../../components/Contato/Contato";

const cards = [
  { id: 1, title: "Clínico Geral", description: "O serviço de Clínica Geral é a porta de entrada para o cuidado com a sua saúde. Nossos profissionais estão preparados para realizar atendimentos abrangentes, oferecendo diagnósticos precisos e orientações sobre os mais diversos problemas de saúde. O clínico geral avalia sintomas, solicita exames quando necessário e acompanha o tratamento de condições comuns, como gripes, dores, alergias, hipertensão, diabetes, entre outras. Além disso, ele atua na prevenção de doenças, promovendo check-ups regulares e aconselhamento sobre hábitos saudáveis. Agende sua consulta e cuide da sua saúde com quem entende do assunto!", 
    img: "src/img/ClinicoGeral.jpg"
  },
  { id: 2, title: "Pediatria", description: "O serviço de Pediatria é dedicado ao cuidado da saúde infantil, oferecendo acompanhamento médico desde os primeiros dias de vida até a adolescência. Nossos pediatras são especializados no diagnóstico e tratamento de doenças comuns em crianças, como infecções, alergias, doenças respiratórias, entre outras. Além disso, o pediatra acompanha o desenvolvimento físico, emocional e social da criança, realizando check-ups regulares, monitorando o crescimento e fornecendo orientações sobre alimentação, vacinação e hábitos saudáveis. A pediatria também é essencial para a prevenção de doenças, com ênfase na imunização e no aconselhamento para uma infância saudável. Agende sua consulta e garanta o cuidado especializado para o bem-estar de seu filho!",
    img: "src/img/pediatra-card.jpg"
  },
  { id: 3, title: "Proctologista", description: "O serviço de Proctologia é especializado no cuidado da saúde do reto, ânus e do trato intestinal inferior. Nossos proctologistas estão preparados para diagnosticar e tratar uma variedade de condições, como hemorroidas, fissuras anais, doenças inflamatórias intestinais, constipação crônica, incontinência fecal, entre outras. Além disso, o proctologista realiza exames de rotina, como a avaliação do câncer colorretal, e oferece orientações sobre cuidados com a saúde intestinal, alimentação e hábitos saudáveis. Este especialista também orienta sobre a prevenção de doenças e trata desconfortos e complicações relacionadas ao sistema digestivo inferior. Agende sua consulta e cuide da sua saúde com quem é especialista no assunto!",
    img: "src/img/proctologista-card.jpg"
  },
  { id: 4, title: "Dermatologia", description: "O serviço de Dermatologia é especializado no cuidado da saúde da pele, cabelo e unhas. Nossos dermatologistas estão preparados para diagnosticar e tratar uma ampla gama de condições dermatológicas, desde problemas comuns como acne, eczema, psoríase, até doenças mais complexas, como câncer de pele. Eles realizam exames detalhados, oferecem orientações sobre cuidados diários com a pele, recomendam tratamentos e procedimentos estéticos, além de tratar alergias e infecções cutâneas. O dermatologista também tem um papel importante na prevenção, realizando exames de pele para identificar precocemente sinais de doenças graves, como o melanoma. Agende sua consulta e tenha a pele bem cuidada e protegida com os melhores profissionais!",
    img: "src/img/desmartologista-card.png"
  }
];

export default function HealthPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação (1s)
      once: true, // A animação ocorre apenas uma vez por elemento
      easing: "ease-in-out"
    });
  }, []);

  return (
    <>
      <Navbar />

      <img src="../src/img/logo servico.png" className="img-servicos" alt="Logo Serviços" data-aos="fade-down" />
      <h1 className="tittle-contato" data-aos="fade-right">Nossos Serviços</h1>
      <h1 className="team-title" data-aos="fade-left">Principais serviços da nossa rede</h1>

      <div className="team-section">
        <div className="image-container">
          {cards.map((card, index) => (
            <div key={card.id} className={`card-servico ${index % 2 === 0 ? 'normal' : 'reversed'}`} data-aos="fade-up">
              <div className="image-servico" style={{ flex: 1.2 }}>
                <img src={card.img} alt={card.title} className="imgCard-servico" />
              </div>
              <div className="content-servico">
                <h3 className="title-card">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <button className="team-button">Saiba Mais</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Contato />
      <Footer />
    </>
  );
}