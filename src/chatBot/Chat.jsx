import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';
import axios from 'axios';

const Chat = () => {
  const [status, setStatus] = useState('');
  const historyBoxRef = useRef(null);

  const initialChatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
  const [chatHistory, setChatHistory] = useState(initialChatHistory);

  useEffect(() => {
    const history = historyBoxRef.current;

    // Limpar o histórico atual antes de renderizar as mensagens para evitar duplicatas
    history.innerHTML = '';

    chatHistory.forEach(({ user, response }) => {
      const boxMyMessage = document.createElement('div');
      boxMyMessage.className = 'box-my-message';

      const myMessage = document.createElement('p');
      myMessage.className = 'my-message';
      myMessage.innerHTML = user;

      boxMyMessage.appendChild(myMessage);

      const boxResponseMessage = document.createElement('div');
      boxResponseMessage.className = 'box-response-message';

      const chatResponse = document.createElement('p');
      chatResponse.className = 'response-message';
      chatResponse.innerHTML = response;

      boxResponseMessage.appendChild(chatResponse);

      history.appendChild(boxMyMessage);
      history.appendChild(boxResponseMessage);
    });

    // Manter a rolagem na parte inferior ao recarregar a página
    history.scrollTop = history.scrollHeight;
  }, [chatHistory]);

  const navigate = useNavigate();
  const apiKey = 'Coloque sua API'; // Substitua pela sua chave de API

  const sendMessage = async () => {
    const messageInput = document.getElementById('message-input');
    if (!messageInput.value) {
      messageInput.style.border = '1px solid red';
      return;
    }
    messageInput.style.border = 'none';

    setStatus('Carregando...');

    fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: messageInput.value,
        max_tokens: 150, // tamanho da resposta
        temperature: 0.5, // criatividade na resposta
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const r = response.choices[0].text;
        setStatus('');
        showHistory(messageInput.value, r);
        messageInput.value = '';
      })
      .catch((e) => {
        console.log(`Error -> ${e}`);
        setStatus('Erro, tente novamente mais tarde...');
      });
  };

  const showHistory = (message, response) => {
    const updatedChatHistory = [
      ...chatHistory,
      { user: message, response: response },
    ];

    setChatHistory(updatedChatHistory);
    localStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
  };
  const handleLogout = async (e) => {
    navigate("/login")
};

  useEffect(() => {
    if (localStorage.getItem('authenticated') !== 'true') navigate('/login');
  }, []);

  return (
    <div className="container">
      <div className="box-questions">
        <div className="header">
          <p>Perguntas e respostas - CHATGPT</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
        <p id="status">{status}</p>
        <div ref={historyBoxRef} id="history">
          {/* Aqui vai o chat gerado conforme as respostas */}
        </div>
        <div className="footer">
          <input
            className="input_chat"
            type="text"
            id="message-input"
            placeholder="Pergunte aqui..."
          />
          <button className="btn-submit" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
