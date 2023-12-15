import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  role: string;
  content: string;
}

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('API key not found');
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
  };

  const [department, setDepartment] = useState<string | undefined>('');

  // Event handler for dropdown change
  const handleDeptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDept = event.target.value;
    setDepartment(selectedDept);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if the pressed key is the "Enter" key (key code 13)
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const [showInputBox, setShowInputBox] = useState(false); // Added state for conditional rendering

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: `You are a helpful assistant for a company HR department in the UK. You should always greet them using their name and department.` },
            { role: 'system', content: `You are speaking to a company employee, ${name}, who works in ${department}` },
            { role: 'system', content: `UK employees have a holiday allowance of 25 days per year.` },
            { role: 'system', content: `Company HR policy states employees must clear provisional time off with their line manager.` },
            { role: 'system', content: `Company HR policy states that at peak times only one employee can be off at any point. Holiday requests may not be approved under certain circumstances` },
            { role: 'system', content: `Company policy states that employees must give four weeks notice for time off, or six weeks during peak times.` },
            { role: 'system', content: `Company policy states that IT department employees must give an extra weeks notice for time off.` },            
            { role: 'user', content: inputMessage },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      const newAssistantMessage: Message = {
        role: 'assistant',
        content: response.data.choices[0].message.content,
      };
  
      // Update the conversation with the user's input and the assistant's response
      setConversation([...conversation, { role: 'user', content: inputMessage }, newAssistantMessage]);

      // Show the input box after the first question has been asked
      if (!showInputBox) {
        setShowInputBox(true);
      }
  
      // Clear the input field after sending the message
      setInputMessage('');
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

      {!showInputBox && (
        <div className='mb-3' style={fieldWidthStyle}>
          <label htmlFor="question" className="form-label">How can we help?</label>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your question here..."
            className="me-3 mb-3 form-control"
            id='question'
            onKeyDown={handleKeyDown} // Add the event listener for the "keydown" event
          />
          <button onClick={sendMessage} className='btn btn-primary'>Send</button>
        </div>
      )}

      <div style={fieldWidthStyle}>
        {conversation.map((message, index) => (
          <div key={index} className={message.role}>
            {message.content}
          </div>
        ))}

        {showInputBox && (
          <div className="user">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message here..."
              onKeyDown={handleKeyDown} // Add the event listener for the "keydown" event
            />
            <button onClick={sendMessage} className='btn btn-primary'>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
