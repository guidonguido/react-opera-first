import React, { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Switch, Route } from 'react-router-dom';

import Collapse from 'react-bootstrap/Collapse'
import Col from 'react-bootstrap/Col';

function App() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const showSidebar = () => {
    setOpenMobileMenu((prevOMM) => !prevOMM);
  };

  return (
    <div className='App'>
      <Header showSidebar={showSidebar} openMobileMenu={openMobileMenu}/>
      <Collapse in={openMobileMenu} timeout={0} >
        <Col sm={4} bg='light' id='sidebar' className='collapse d-sm-none below-nav custom-sidebar'>
          <Sidebar showSidebar={showSidebar} />
        </Col>
      </Collapse>

      <Switch>
        <Route path='/iscrizioneAssociazione'>
          <div className='below-nav'>
            {' '}
            <p>Pagina di Iscrizione all'associazione in allestimento</p>
          </div>
        </Route>

        <Route path='/iscrizioneTorneo'>
          <div className='below-nav'>
            {' '}
            <p>Pagina di Iscrizione al torneo in allestimento</p>
          </div>
        </Route>

        <Route>
          <MainContent openMobileMenu={openMobileMenu} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
