import React from 'react';
import logo from '../logo-opera.svg';
import '../css/MainContent.css';

import { Link } from 'react-router-dom';

const MainContent = (props) => {
  return (
    <div className={props.openMobileMenu ? 'custom-main-content-sidebar' : 'custom-main-content'}>
      <img src={logo} className='App-logo' alt='logo' />
      <p className='custom-welcome-message'>Benvenuto nel sito ufficiale di Opera A.P.S</p>
      <Link to='/iscrizioneAssociazione' className='App-link '>
        {' '}
        <span role='img' aria-label=''>
          ✍🏼
        </span>{' '}
        Iscriviti{' '}
        <span role='img' aria-label=''>
          ✍🏼
        </span>{' '}
      </Link>
      <Link to='/iscrizioneAssociazione' className='App-link mt-4'>
        {' '}
        <span role='img' aria-label=''>
          ⚽
        </span>{' '}
        Iscriviti al Torneo{' '}
        <span role='img' aria-label=''>
          ⚽
        </span>{' '}
      </Link>
    </div>
  );
};

export default MainContent;
