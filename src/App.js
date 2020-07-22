import React, { useState } from 'react';
import './css/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import IscrizionePage from './components/IscrizionePage';
import SuccessAlert from './components/SuccessAlert';
import ErrorAlert from './components/ErrorAlert';

import { Switch, Route } from 'react-router-dom';
import moment from 'moment';

import Collapse from 'react-bootstrap/Collapse';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
    window.scrollTo(0,0);
    setSubmitError(err);
    setSubmitSuccess(false);
    setLoading(false);
  };

  const handleErrorClose = _ => {
    setSubmitError(false);
  }

  const handleSuccessClose = _ => {
    setSubmitSuccess(false);
  }

  const handleSubmitSuccess = (values) => {
    window.scrollTo(0,0);
    if (values) {
      setSubmitSuccess(true);
      setSubmitError(false);
      setSubmitValues(values);
      setLoading(false);

      console.log(values);
    } else {
      console.log('NO VALUES');
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

      {submitValues && submitSuccess && (
        <Row className='justify-content-md-center below-nav mr-0'>
          <Col sm={7}>
            <SuccessAlert
              show={submitSuccess}
              nome={submitValues.nome}
              cognome={submitValues.cognome}
              inviaDocumento={submitValues.files.length === 0}
              minorenne={moment().diff(moment(submitValues.dataNascita), 'years') < 18}
              hideAlert={handleSuccessClose}
            />
          </Col>
        </Row>
      )}

      {submitError && (
        <Row className='justify-content-md-center below-nav mr-0'>
          <Col sm={7}>
            <ErrorAlert show={submitError} hideAlert={handleErrorClose} />
          </Col>
        </Row>
      )}
      {loading ? (
        <SemipolarLoading
          style={{ position: 'fixed', top: '50% ', left: '48%', zIndex: '100' }}
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
