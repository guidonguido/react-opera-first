import React, { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import IscrizionePage from './components/IscrizionePage';
import { Switch, Route } from 'react-router-dom';

import Collapse from 'react-bootstrap/Collapse';
import Col from 'react-bootstrap/Col';

import { SemipolarLoading } from 'react-loadingg';

function App() {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitValues, setSubmitValues] = useState(null);

  const showSidebar = () => {
    setOpenMobileMenu((prevOMM) => !prevOMM);
  };

  const handleSubmitError = (err) => {
    setSubmitError(err);
    setSubmitSuccess(false);
    setLoading(false);
  };

  const handleSubmitSuccess = (values) => {
    if (values) {
      setSubmitSuccess(true);
      setSubmitError(false);
      setSubmitValues(values);
      setLoading(false);

      console.log(values);
    } else {
      setSubmitValues(null);
      setSubmitSuccess(false);
      setLoading(false);
    }
  };

  const handleLoading = (val) => {
    setLoading(val);
  };

  return (
    <div className='App'>
      <Header showSidebar={showSidebar} openMobileMenu={openMobileMenu} />
      <Collapse in={openMobileMenu} timeout={0}>
        <Col sm={4} bg='light' id='sidebar' className='collapse d-sm-none below-nav custom-sidebar'>
          <Sidebar showSidebar={showSidebar} />
        </Col>
      </Collapse>

      {submitSuccess ? <h1 className='below-nav'> GENTILE RICHIESTA DI ISCRIZIONE INVIATA CORRETTAMENTE </h1> : null}
      {submitError ? (
        <h1 className='below-nav'> LA RICHIESTA DI ISCRIZIONE NON è STATA INVIATA A CAUSA DI UN ERRORE</h1>
      ) : null}
      {loading ? (
        <SemipolarLoading
          style={{ position: 'fixed', top: '50% ', left: '48%', zIndex:'100' }}
          size='large'
          color='#e41e32c4'
        />
      ) : null}

      <Switch>
        <Route path='/iscrizioneAssociazione'>
          <div className='below-nav'>
            <IscrizionePage
              handleSubmitSuccess={handleSubmitSuccess}
              handleSubmitError={handleSubmitError}
              loading={handleLoading}
            />{' '}
          </div>
          <Footer position='sticky' />
        </Route>

        <Route path='/iscrizioneTorneo'>
          <div className='below-nav'>
            {' '}
            <p>Pagina di Iscrizione al torneo in allestimento</p>
          </div>
            <Footer position='fixed' />
        </Route>

        <Route>
          <MainContent openMobileMenu={openMobileMenu} />
          <Footer position='fixed' />
        </Route>
      </Switch>

      
    </div>
  );
}

export default App;
