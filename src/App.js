import React from 'react';
import logo from './logo-opera-test.svg';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <div className="custom-main-content">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="custom-welcome-message">
          Benvenuto nel sito ufficiale di Opera A.P.S
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    </div>
  );
}

export default App;
