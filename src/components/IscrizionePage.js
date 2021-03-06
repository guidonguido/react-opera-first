import React, { useState } from 'react';
import '../css/IscrizionePage.css'
import API from '../API/API';
import logo from '../logo-opera.svg';
import { Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DropzoneArea } from 'material-ui-dropzone';
import ReCAPTCHA from 'react-google-recaptcha';

import { Formik } from 'formik';
import * as Yup from 'yup';

const IscrizionePage = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values) => {
    props.loading(true);

    API.addIscrizioneAssociazione(values)
      .then(() => {
        if (values.files.length > 0) {
          API.addDocumentoIscrizioneAssociazione(values.files, values.cf)
            .then(() => {
              setTimeout(() => {
                console.log(values);
                props.handleSubmitSuccess(values, true);
                setSubmitted(true);
              }, 2000);
            })
            .catch((err) => {
              console.log(err);
              props.handleSubmitError(true);
              setSubmitted(true);
            });
        } else {
          setTimeout(() => {
            console.log(values);
            props.handleSubmitSuccess(values, true);
            setSubmitted(true);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(values);
        console.log(err);
        props.handleSubmitError(true);
        setSubmitted(true);
      });
  };

  if (submitted) {
    return <Redirect to='/' />;
  }

  return (
    <Container className='d-flex align-items-center flex-column '>
      <Row>
        <img src={logo} className='custom-logo-iscrizione' alt='logo'/>
      </Row>
      <Row>
        <h1>Iscriviti ad Opera</h1>
      </Row>
      <Row className=''>Inserisci i dati necessari</Row>
      <Row className='mb-5'>I campi contrassegnati da * sono obbligatori</Row>
      <IscrizioneForm submitForm={handleSubmit} />
    </Container>
  );
};

const IscrizioneForm = (props) => {
  const schema = Yup.object({
    nome: Yup.string().required('Campo obbligatorio').max(14, 'Hai un nome troppo lungo'),
    cognome: Yup.string().required('Campo obbligatorio').max(14, 'Hai un cognome troppo lungo'),
    cf: Yup.string()
      .required('Campo obbligatorio')
      .matches(
        /^[A-Za-z]{6}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{2}[A-Za-z]{1}[0-9LMNPQRSTUV]{3}[A-Za-z]{1}$/g,
        'Codice fiscale non valido',
      ),
    email: Yup.string().email('Inserisci una email valida'),
    cell: Yup.string().length(10, 'Inserisci un numero valido').required('Campo obbligatorio'),
    dataNascita: Yup.date().required('Campo obbligatorio'),
    cittaNascita: Yup.string().required('Campo obbligatorio').max(20, 'Che nome lungo'),
    provinciaNascita: Yup.string().required('Campo obbligatorio').max(15, 'Che provincia lunga'),
    cittaResidenza: Yup.string().required('Campo obbligatorio').max(15, 'Nome troppo lungo'),
    provinciaResidenza: Yup.string().required('Campo obbligatorio').max(15, 'Che provincia lunga'),
    indirizzo: Yup.string().required('Campo obbligatorio').max(25, 'Indirizzo troppo lungo'),
    civico: Yup.string().required('Campo obbligatorio'),
    captcha: Yup.string().required('Campo obbligatorio'),
    termini: Yup.bool().oneOf([true], "È richiesta l'Accettazione del Regolamento")
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        nome: '',
        cognome: '',
        email: '',
        cell: '',
        cf: '',
        files: [],
        dataNascita: '',
        cittaNascita: '',
        provinciaNascita: '',
        cittaResidenza: '',
        provinciaResidenza: '',
        via: 'Via',
        indirizzo: '',
        civico: '',
        captcha:'',
        termini: false,
      }}
      onSubmit={(values) => {
        props.submitForm(values);
      }}>
      {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, isValid, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row className='mb-3 text-left'>
            <Form.Group as={Col} md='6' controlId='validationNome'>
              <Form.Label className='mr-auto font-weight-bold'> Nome* </Form.Label>
              <Form.Control
                type='text'
                name='nome'
                value={values.nome}
                isInvalid={touched.nome && errors.nome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationCognome'>
              <Form.Label className='font-weight-bold'> Cognome* </Form.Label>
              <Form.Control
                type='text'
                name='cognome'
                value={values.cognome}
                isInvalid={touched.cognome && errors.cognome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.cognome}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row className='ml-md-auto mb-5'>
            <Form.Label className='font-weight-bold'> Codice Fiscale* </Form.Label>
            <Form.Control
              type='text'
              name='cf'
              value={values.cf}
              isInvalid={touched.cf && errors.cf}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type='invalid'>{errors.cf}</Form.Control.Feedback>
          </Form.Row>

          <Form.Row className='ml-md-auto mb-3'>
            <Form.Label className='font-weight-bold'> Data di nascita* </Form.Label>
            <Form.Control
              type='date'
              name='dataNascita'
              value={values.dataNascita}
              isInvalid={touched.dataNascita && errors.dataNascita}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type='invalid'>{errors.dataNascita}</Form.Control.Feedback>
          </Form.Row>

          <Form.Row className='mb-5 text-left'>
            <Form.Group as={Col} md='8' controlId='validationCittàN'>
              <Form.Label className='mr-auto font-weight-bold'> Città di Nascita* </Form.Label>
              <Form.Control
                type='text'
                name='cittaNascita'
                value={values.cittaNascita}
                isInvalid={touched.citta && errors.cittaNascita}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.cittaNascita}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationProvinciaN'>
              <Form.Label className='font-weight-bold'> Provincia* </Form.Label>
              <Form.Control
                type='text'
                name='provinciaNascita'
                value={values.provinciaNascita}
                isInvalid={touched.provinciaNascita && errors.provinciaNascita}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.provinciaNascita}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row className='mb-3 text-left'>
            <Form.Group as={Col} md='6' controlId='validationCittàR'>
              <Form.Label className='mr-auto font-weight-bold'> Città di Residenza* </Form.Label>
              <Form.Control
                type='text'
                name='cittaResidenza'
                value={values.cittaResidenza}
                isInvalid={touched.cittaResidenza && errors.cittaResidenza}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.cittaResidenza}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationProvinciaR'>
              <Form.Label className='font-weight-bold'> Provincia* </Form.Label>
              <Form.Control
                type='text'
                name='provinciaResidenza'
                value={values.provinciaResidenza}
                isInvalid={touched.provinciaResidenza && errors.provinciaResidenza}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.provinciaResidenza}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row className='mb-5 text-left'>
            <Form.Group as={Col} md='3' controlId='validationVia'>
              <Form.Label className='font-weight-bold'> * </Form.Label>
              <Form.Control
                as='select'
                name='via'
                value={values.via}
                isInvalid={touched.via && errors.via}
                onChange={handleChange}
                onBlur={handleBlur}>
                <option>Via</option>
                <option>Viale</option>
                <option>C/da</option>
                <option>Corso</option>
                <option>Piazza</option>
              </Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.via}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='6' controlId='validationIndirizzo'>
              <Form.Label className='font-weight-bold'> Indirizzo Residenza* </Form.Label>
              <Form.Control
                type='text'
                name='indirizzo'
                value={values.indirizzo}
                isInvalid={touched.indirizzo && errors.indirizzo}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.indirizzo}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md='3' controlId='validationCivico'>
              <Form.Label className='mr-auto font-weight-bold'> N. Civico* </Form.Label>
              <Form.Control
                type='text'
                name='civico'
                value={values.civico}
                isInvalid={touched.civico && errors.civico}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Control.Feedback type='invalid'>{errors.civico}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Form.Row className='ml-md-auto mb-3'>
            <Form.Label className='font-weight-bold'> Numero di Cellulare* </Form.Label>
            <Form.Control
              type='text'
              name='cell'
              value={values.cell}
              isInvalid={touched.cell && errors.cell}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type='invalid'>{errors.cell}</Form.Control.Feedback>
          </Form.Row>

          <Form.Row className='ml-md-auto mb-5'>
            <Form.Label className='font-weight-bold'> Email </Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={values.email}
              isInvalid={touched.nome && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
          </Form.Row>

          <Form.Row className='text-left mb-5'>
            <Form.Label>
              {' '}
              <p className='mb-1 font-weight-bold'>Foto del documento di identità</p>
              <p className='mb-0'>Lascia libero se hai intenzione di portare </p>
              <p>una copia del documento in sede</p>
            </Form.Label>
            <DropzoneArea
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp, .pdf']}
              maxFileSize={5000000}
              filesLimit={2}
              dropzoneText='Foto o PDF'
              showFileNames
              value={values.files}
              onChange={(acceptedFiles) => {
                setFieldValue('files', acceptedFiles);
              }}
            />
          </Form.Row>

          <Form.Row >
            <Form.Group className='ml-md-auto mr-auto'>
            <Form.Check
              type='switch'
              name="termini"
              onChange={handleChange}
              isInvalid={touched.termini && errors.termini}
              feedback={errors.termini}
              id="validationFormik106"
              label={<div>Acconsento alla <a href='https://firebasestorage.googleapis.com/v0/b/guido-opera-first.appspot.com/o/Trattamento%20dati%2FREGOLAMENTO%20INTERNO%20ASSOCIAZIONE%2011-07.pdf?alt=media&token=07891542-d761-45d9-af7a-c6db1ae99775' target="_blank"  rel="noopener noreferrer"> Informativa sulla privacy </a> e <a href='https://firebasestorage.googleapis.com/v0/b/guido-opera-first.appspot.com/o/Trattamento%20dati%2FREGOLAMENTO%20INTERNO%20ASSOCIAZIONE%2011-07.pdf?alt=media&token=07891542-d761-45d9-af7a-c6db1ae99775' target="_blank"  rel="noopener noreferrer"> Regolamento </a></div>}
            /></Form.Group>
          </Form.Row>

          <Form.Row>
          <ReCAPTCHA className='ml-auto mr-auto mb-2 mt-5'  sitekey='6LeXQrQZAAAAAIaBCicMfbWEI6xaY4ebOhwVFU8R' value={values.captcha} onChange={(response) => { setFieldValue("captcha", response); }}  />
          </Form.Row>

          <Button type='submit' className='font-weight-bold' style={{ margin: '20px', width: '6rem', height: '3rem' }}>
            Invia
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default IscrizionePage;
