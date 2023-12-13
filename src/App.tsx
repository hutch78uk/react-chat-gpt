// App.js
import React from 'react';
import './App.scss';
import ChatGPT from './chat-gpt';
import Chatbot from './chatbot';

function App() {
  return (
    <div>
      <div>
        <h1>ChatGPT React App</h1>
        <ChatGPT />
      </div>

      <div>
        <h1>HR Chatbot</h1>
        <h2 className="h3">Name</h2>
        <p>Input box</p>
        <h2 className="h3">People partner</h2>
        <div className="mb-3">
          <select className="form-select" aria-label="Default select example" defaultValue="Open this select menu">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
