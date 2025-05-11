import React from 'react';
import '../index.css'; 

const ChatBubble = ({ sender, text }) => {
  return (
    <div className={`message-wrapper ${sender}`}>
      <div className={`message ${sender}`}>
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
