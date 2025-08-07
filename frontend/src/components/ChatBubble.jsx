import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../index.css'; 

const ChatBubble = ({ sender, text }) => {
  return (
    <div className={`message-wrapper ${sender}`}>
      <div className={`message ${sender}`}>
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatBubble;
