// Chatbot.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  role: string;
  content: string;
}

const Chatbot: React.FC = () => {
  const fieldWidthStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '500px'
  };

  const [inputMessage, setInputMessage] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);

  const [name, setName] = useState<string>('');
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(`Name is: ${name}`);
  };

  const [department, setDept] = useState<string>('');
  const handleDeptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDept(event.target.value);
    console.log(`Department is: ${department}`);
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `You are a helpful assistant for a company HR department. You should always welcome employees to the chat by asking their name.` },
            { role: 'system', content: `You are speaking to a company employee, ${name}, who works in ${department}` },
            { role: 'system', content: `Joe Noname has a holiday allowance of 25 days, and has used 4.` },
            { role: 'system', content: `Company peak times are during the summer.` },
            { role: 'system', content: `Company HR policy states employees must clear provisional time off with their line manager.` },
            { role: 'system', content: `Company HR policy states that at peak times only one employee can be off at any point.` },
            { role: 'system', content: `Company policy states that employees must give four weeks notice for time off, or six weeks during peak times.` },
            { role: 'system', content: `Company policy states that IT department employees must give an extra weeks notice for time off.` },            
            { role: 'user', content: inputMessage },
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
      <div className="mb-3" style={fieldWidthStyle}>
        <label htmlFor="name" className="form-label">Name</label>
        <input type="name" className="form-control" id="name" aria-describedby="name" value={name} onChange={handleNameChange} />
      </div>

      <div className="mb-3" style={fieldWidthStyle}>
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>

      <div className="mb-3" style={fieldWidthStyle}>
        <label htmlFor="department" className="form-label">Department</label>
        <select className="form-select" aria-label="Department" value={department} id='department' onChange={handleDeptChange}>
          <option>Select...</option>
          <option value="1">IT</option>
          <option value="2">HR</option>
          <option value="3">Payroll</option>
        </select>
      </div>

      <div className='mb-3' style={fieldWidthStyle}>
        <label htmlFor="question" className="form-label">How can we help?</label>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your question here..."
          className="me-3 mb-3 form-control"
          id='question'
        />
        <button onClick={sendMessage} className='btn btn-primary'>Send</button>
      </div>

      <div style={fieldWidthStyle}>
        {conversation.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
