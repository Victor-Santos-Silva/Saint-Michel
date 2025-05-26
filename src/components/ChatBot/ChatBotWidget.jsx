import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChatBotWidget.css";

function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [welcomeSent, setWelcomeSent] = useState(false);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  // Mensagem de boas-vindas
  useEffect(() => {
    if (isOpen && !welcomeSent) {
      setMessages([
        {
          from: "bot",
          type: "text",
          text: "Olá, eu sou o ChatSaint! Como posso ajudar você hoje?",
        },
      ]);
      setWelcomeSent(true);
    }
  }, [isOpen, welcomeSent]);

  const handleSend = async () => {
    if (!message && !image) return;

    const newMessages = [...messages];

    if (message) {
      newMessages.push({ from: "user", type: "text", text: message });
    }

    if (image) {
      const imageURL = URL.createObjectURL(image);
      newMessages.push({ from: "user", type: "image", url: imageURL });
    }

    setMessages(newMessages);
    setLoading(true);

    try {
      let response;

      if (image) {
        const formData = new FormData();
        formData.append("message", message);
        formData.append("image", image);

        response = await axios.post("http://localhost:5000/chatbot/image-chat", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("http://localhost:5000/chatbot/chat", { message });
      }

      setMessages(prev => [...prev, { from: "bot", type: "text", text: response.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: "bot", type: "text", text: "❌ Erro ao enviar mensagem." }]);
    }

    setMessage("");
    setImage(null);
    setLoading(false);
  };

  return (
    <div className="chatbot-widget">
      <div className="chatbot-button" onClick={toggleWidget}>
        💬
      </div>

      {isOpen && (
        <div className="chatbot-window">
          {/* Título personalizado do ChatSaint */}
          <div className="chatbot-header">
            🤖 ChatSaint • Assistente de Saúde
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from}`}>
                {msg.type === "text" ? (
                  <>
                    {msg.from === "bot" && <span className="bot-avatar">🤖</span>}
                    {msg.text}
                  </>
                ) : (
                  <img src={msg.url} alt="imagem enviada" className="chat-image" />
                )}
              </div>
            ))}
            {loading && <div className="message bot">⏳ Pensando...</div>}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Digite sua pergunta de saúde..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <label className="custom-file-upload" title="Anexar imagem">
              <span>📎 Anexar</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>

            <button onClick={handleSend}>Enviar</button>
          </div>

          {image && <span className="file-name">{image.name}</span>}
        </div>
      )}
    </div>
  );
}

export default ChatBotWidget;
