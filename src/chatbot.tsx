// Chatbot.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  role: string;
  content: string;
}

const Chatbot: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: inputMessage },
            ...conversation, // Include previous messages in the conversation
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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', // Replace with your actual API key
          },
        }
      );

      const newMessage: Message = { role: 'assistant', content: response.data.choices[0].message.content };
      setConversation([...conversation, newMessage]);
    } catch (error) {
      console.error('Error making ChatGPT API request:', error);
    }
  };

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
