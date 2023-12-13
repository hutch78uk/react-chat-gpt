// ChatGPT.js
import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', // Replace with the actual API endpoint
        {
          model: 'gpt-3.5-turbo', // Use the appropriate model name
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: inputText },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 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', // Replace with your actual API key
          },
        }
      );

      setOutputText(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error making ChatGPT API request:', error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={inputText} onChange={handleInputChange} />
        <button onClick={handleSendRequest}>Send</button>
      </div>
      <div>
        <strong>Response:</strong> {outputText}
      </div>
    </div>
  );
};

export default ChatGPT;
