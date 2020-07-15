import React from 'react';
import logo from '../logo-opera-test.svg';
import '../css/MainContent.css';

const MainContent = (props) => {
  return (
    <div className={props.openMobileMenu? 'custom-main-content-sidebar':'custom-main-content'}>
      <img src={logo} className='App-logo' alt='logo' />
      <p className='custom-welcome-message'>Benvenuto nel sito ufficiale di Opera A.P.S</p>
      <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
        Learn React
      </a>
    </div>
  );
};

export default MainContent;