import React, { useState } from 'react';
import './Agendamentos.css';
import Navbar from '../../components/Navbar/NavBar';
import Footer from '../../components/Footer/Footer';
import Contato from '../../components/Contato/Contato';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Agendamentos = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState({});
  const [note, setNote] = useState('');
  const [time, setTime] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
  };

  const handleAddReminder = () => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    
    setReminders({
      ...reminders,
      [formattedDate]: [...(reminders[formattedDate] || []), { note, time }],
    });
    setNote('');
    setTime('');
  };

  const tileClassName = ({ date }) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    return reminders[formattedDate] ? 'highlight' : null;
  };

  return (
    <>
      <Navbar />

      <img src="../src/img/Faça um agendamento.png" className="img-servicos" alt="Logo Servicos" />

      <div className="calendar-container">
        <h2>Escolha uma data para o agendamento</h2>
        <Calendar onChange={handleDateChange} value={date} tileClassName={tileClassName} />

        <div className="reminder-section">
          <div className="reminder-container">
            <input
              type="text"
              placeholder="Digite um lembrete"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <button onClick={handleAddReminder}>Salvar</button>
          </div>

          {reminders[`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`] && (
            <div className="reminder-display">
              <h3>Lembretes para {formatDate(date)}:</h3>
              {reminders[`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`].map((reminder, index) => (
                <p key={index}>{reminder.note} às {reminder.time}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="map-container">
        <iframe
          title="Localização"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0192186343984!2d-122.41941518468147!3d37.77492977975914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cba3f0e2f%3A0x4c4e4c4c4c4c4c4c!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sbr!4v1615395398274!5m2!1sen!2sbr"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      <Contato />
      <Footer />
    </>
  );
};

export default Agendamentos;
