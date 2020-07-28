import React, { useState, useEffect } from 'react';
import API from './API/API';
import './css/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import IscrizionePage from './components/IscrizionePage';
import RinnovoIscrizionePage from './components/RinnovoIscrizionePage';
import IscrizioneTorneoPage from './components/IscrizioneTorneoPage';
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
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitValues, setSubmitValues] = useState(null);
  const [scadenzaPagamento, setScadenzaPagamento] = useState(null);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = (_) => {
    console('Logging out user ', user || 'null');
    setUser(null);
    setLoginError(null);
  };

  // ON FIRST MOUNT
  // Login Anonymous user and set it to the state
  // ON UNMOUNT
  // Logout Anonymous user and set the userState to null
  useEffect(() => {

    async function setupLogin(){
      try{
        API.initializeAuthObserver(loginUser); // Calls loginUser after an Auth state change
        await API.loginAnonymousUser();
      } catch (err) {
        console.log(err)
        window.scrollTo(0, 0);
        setLoginError(err);
      }
    }
    setupLogin();

    return () => {
      // TO-DO firebase.auth().signOut() 
      logoutUser();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showSidebar = () => {
    setOpenMobileMenu((prevOMM) => !prevOMM);
  };

  const handleSubmitError = (err) => {
    window.scrollTo(0, 0);
    setSubmitError(err);
    setSubmitSuccess(false);
    setLoading(false);
  };

  const handleErrorClose = (_) => {
    setSubmitError(false);
    setLoginError(false);
  };

  const handleSuccessClose = (_) => {
    setSubmitSuccess(false);
  };

  const handleSubmitSuccess = (values, addScadenzaIscrizione) => {
    window.scrollTo(0, 0);
    if (values) {
      setSubmitSuccess(true);
      setSubmitError(false);
      setLoginError(false);
      setSubmitValues(values);
      addScadenzaIscrizione && setScadenzaPagamento(moment().add('days', 30).format('DD-MM-YYYY'));

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
              scadenzaPagamento={scadenzaPagamento || false}
              inviaDocumento={submitValues.files && submitValues.files.length === 0}
              minorenne={submitValues.dataNascita && moment().diff(moment(submitValues.dataNascita), 'years') < 18}
              hideAlert={handleSuccessClose}
            />
          </Col>
        </Row>
      )}

      {submitError && (
        <Row className='justify-content-md-center below-nav mr-0'>
          <Col sm={7}>
            <ErrorAlert
              show={submitError}
              heading="Errore nell'invio della tua Iscrizione"
              description="Gentile utente, non è stato possibile concludere l'iscrizione."
              hideAlert={handleErrorClose}
            />
          </Col>
        </Row>
      )}

      {loginError && (
        <Row className='justify-content-md-center below-nav mr-0'>
          <Col sm={7}>
            <ErrorAlert
              show={loginError}
              heading='Errore nel server di autenticazione'
              description='Gentile utente, al momento non è possibile iscriversi nelle varie sezioni.'
              hideAlert={handleErrorClose}
            />
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

        <Route path='/rinnovoIscrizioneAssociazione'>
          <div className='below-nav'>
          <RinnovoIscrizionePage
              handleSubmitSuccess={handleSubmitSuccess}
              handleSubmitError={handleSubmitError}
              loading={handleLoading}
            />{' '}
          </div>
          <Footer position='sticky' />
        </Route>

        <Route path='/iscrizioneTorneo'>
          <div className='below-nav'>
            <IscrizioneTorneoPage
              handleSubmitSuccess={handleSubmitSuccess}
              handleSubmitError={handleSubmitError}
              loading={handleLoading}
            />
          </div>
          <Footer position='sticky' />
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
