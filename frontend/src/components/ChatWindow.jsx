import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ModelSelector from './ModelSelector';
import { getRespuesta } from '../api';

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy tu asistente virtual especializado en el Acuerdo 009 de la Universidad del Valle. Estoy aquí para ayudarte a resolver tus dudas sobre normativas académicas, derechos estudiantiles, procesos de evaluación y más!', timestamp: new Date() }
  ]);
  const [model, setModel] = useState('gemini');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleModelChange = (newModel) => {
    setModel(newModel);
    
    setMessages(prev => [
      ...prev,
      { 
        sender: 'bot', 
        text: `He cambiado al modelo ${newModel.toUpperCase()}. ¿En qué puedo ayudarte?`,
        timestamp: new Date()
      }
    ]);
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { 
      sender: 'user', 
      text, 
      timestamp: new Date() 
    }]);
    
    setIsLoading(true);
    
    try {
      const response = await getRespuesta(model, text);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: response, timestamp: new Date() }
      ]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: 'Ha ocurrido un error al procesar tu mensaje. Por favor, intenta nuevamente.', 
          timestamp: new Date() 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <strong>Chatbot 009</strong>
        </div>
        <ModelSelector 
          model={model} 
          setModel={handleModelChange} 
        />
        <ThemeToggle />
      </div>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <ChatBubble 
            key={i} 
            sender={msg.sender} 
            text={msg.text} 
            time={msg.timestamp ? formatTime(msg.timestamp) : ''} 
          />
        ))}
        {isLoading && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </>
  );
};

export default ChatWindow;