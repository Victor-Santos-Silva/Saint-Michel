import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatBotWidget.css";

function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [welcomeSent, setWelcomeSent] = useState(false);
  const [mode, setMode] = useState(null);
  const [awaitingContinue, setAwaitingContinue] = useState(false);
  const messagesEndRef = useRef(null);
  const widgetRef = useRef(null);

  const predefinedAnswers = {
    "🕒 Quais são os horários de atendimento?": "Nosso hospital funciona de segunda a sexta, das 7h às 18h.",
    "📍 Qual o endereço do hospital?": "Estamos localizados na Av. Central, 1234 - Centro.",
    "🩺 Quais convênios são aceitos?": "Atendemos convênios como Unimed, Bradesco Saúde, Amil e SulAmérica.",
    "📞 Qual o telefone de contato?": "Você pode nos ligar no (11) 1234-5678.",
    "💻 O hospital tem atendimento online?": "Sim, oferecemos teleconsultas. Agende pelo nosso site ou telefone.",
    "👨‍⚕️ Como agendar uma consulta?": "Você pode agendar pelo site, app ou ligando para (11) 1234-5678.",
  };

  const toggleWidget = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen && !welcomeSent) {
      showInitialOptions();
      setWelcomeSent(true);
    }
  }, [isOpen, welcomeSent]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const showInitialOptions = () => {
    setMessages([
      {
        from: "bot",
        type: "text",
        text: "Olá, eu sou o ChatSaint! Como posso ajudar você hoje?",
      },
      {
        from: "bot",
        type: "options",
        text: "Você pode escolher uma opção ou fazer qualquer pergunta:",
        options: [
          { label: "🏥 Saber sobre o hospital", value: "hospital" },
          { label: "💬 Chat livre", value: "chat" },
        ],
      },
    ]);
  };

  const showHospitalOptions = () => {
    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        type: "options",
        text: "Aqui estão algumas perguntas frequentes sobre o hospital. Mas sinta-se à vontade para perguntar o que quiser:",
        options: [
          ...Object.keys(predefinedAnswers).map((question) => ({
            label: question,
            value: question,
          })),
          { label: "🔄 Ir para o chat livre", value: "__switch_to_chat" },
        ],
      },
    ]);
  };

  const askContinueChat = () => {
    setAwaitingContinue(true);
    setMessages((prev) => [
      ...prev,
      {
        from: "bot",
        type: "options",
        text: "Quer continuar o chat?",
        options: [
          { label: "Sim", value: "continue_yes" },
          { label: "Não", value: "continue_no" },
        ],
      },
    ]);
  };

  const handleContinueResponse = (value) => {
    setAwaitingContinue(false);
    if (value === "continue_yes") {
      if (mode === "hospital") {
        showHospitalOptions();
      } else {
        setMessages((prev) => [
          ...prev,
          {
            from: "bot",
            type: "text",
            text: "Pode continuar perguntando o que quiser! 😊",
          },
        ]);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          type: "text",
          text: "Tudo bem! Selecione abaixo como deseja continuar:",
        },
        {
          from: "bot",
          type: "options",
          text: "Escolha uma opção:",
          options: [
            { label: "🏥 Saber sobre o hospital", value: "hospital" },
            { label: "💬 Chat livre", value: "chat" },
          ],
        },
      ]);
      setMode(null);
    }
  };

  const handleOptionSelect = (selectedMode) => {
    setMode(selectedMode);
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        type: "text",
        text:
          selectedMode === "hospital"
            ? "Quero saber sobre o hospital"
            : "Quero usar o chat livre",
      },
    ]);

    if (selectedMode === "hospital") {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          type: "text",
          text: "Aqui estão algumas perguntas frequentes sobre o hospital:",
        },
      ]);
      showHospitalOptions();
    } else {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          type: "text",
          text: "Você está no modo de chat livre! Pergunte o que quiser 😊",
        },
      ]);
    }
  };

  const handlePredefinedQuestion = async (question) => {
    if (question === "__switch_to_chat") {
      handleOptionSelect("chat");
      return;
    }

    setMessages((prev) => [...prev, { from: "user", type: "text", text: question }]);

    // Responde imediatamente se for uma pergunta pré-definida
    if (predefinedAnswers[question]) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", type: "text", text: predefinedAnswers[question] },
      ]);
      askContinueChat();
      return;
    }

    // Caso contrário, envia para o backend
    setLoading(true);
    try {
      const response = await axios.post("https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/chatbot/chat", { message: question });
      setMessages((prev) => [...prev, { from: "bot", type: "text", text: response.data.reply }]);
      askContinueChat();
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", type: "text", text: "❌ Erro ao obter resposta." }]);
    }
    setLoading(false);
  };

  const handleSend = async () => {
    if (!message && !image) return;

    setMessage("");

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

        response = await axios.post("https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/chatbot/image-chat", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("https://apisaintmichel-a2fjc0c4d3bygmhe.eastus2-01.azurewebsites.net/chatbot/chat", { message });
      }

      setMessages((prev) => [...prev, { from: "bot", type: "text", text: response.data.reply }]);
      askContinueChat();
    } catch (err) {
      setMessages((prev) => [...prev, { from: "bot", type: "text", text: "❌ Erro ao enviar mensagem." }]);
    }

    setImage(null);
    setLoading(false);
  };

  return (
    <div className="chatbot-widget" ref={widgetRef}>
      <div className="chatbot-button ping-animation" onClick={toggleWidget}>
        💬
        <span className="ping-ring" />
      </div>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <img
              src="/img/Mascote-SaintMichel-removebg-preview.png"
              alt="Mascote do ChatSaint"
              className="mascote-img-large"
            />
            ChatSaint • Assistente Virtual
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => {
              if (msg.from === "bot") {
                return (
                  <div key={i} className="message-container bot">
                    <img
                      src="/img/Mascote-SaintMichel-removebg-preview.png"
                      alt="Mascote bot"
                      className="mascote-avatar"
                    />
                    <div className="message bot">
                      {msg.type === "text" && msg.text}
                      {msg.type === "options" && (
                        <>
                          <div>{msg.text}</div>
                          <div className="chatbot-quick-replies">
                            {msg.options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  awaitingContinue
                                    ? handleContinueResponse(opt.value)
                                    : msg.options.some(
                                        (o) => o.value === "hospital" || o.value === "chat"
                                      )
                                    ? handleOptionSelect(opt.value)
                                    : handlePredefinedQuestion(opt.value)
                                }
                              >
                                {opt.label}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              } else if (msg.from === "user") {
                return (
                  <div key={i} className="message user">
                    {msg.type === "text" && msg.text}
                    {msg.type === "image" && (
                      <img src={msg.url} alt="imagem enviada" className="chat-image" />
                    )}
                  </div>
                );
              }
              return null;
            })}
            {loading && <div className="message bot">⏳ Pensando...</div>}
            <div ref={messagesEndRef} />
          </div>

          {(mode === "chat" || mode === "hospital") && (
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Digite sua pergunta..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
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
          )}

          {image && <span className="file-name">{image.name}</span>}
        </div>
      )}
    </div>
  );
}

export default ChatBotWidget;
