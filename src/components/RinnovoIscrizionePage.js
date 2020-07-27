import React, { useState } from 'react';
import '../css/IscrizionePage.css';
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

const RinnovoIscrizionePage = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values) => {
    props.loading(true);

    API.addRinnovoIscrizioneAssociazione(values)
      .then(() => {
        if (values.files.length > 0) {
          API.addDocumentoRinnovoIscrizioneAssociazione(values.files, values.cf)
            .then(() => {
              setTimeout(() => {
                console.log(values);
                props.handleSubmitSuccess(values, 'associazione');
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
            props.handleSubmitSuccess(values, 'associazione');
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
        <img src={logo} className='custom-logo-iscrizione' alt='logo' />
      </Row>
      <Row>
        <h1>
          Rinnova la tua iscrizione ad Opera{' '}
          <span role='img' aria-label=''>
            👏🏼
          </span>
        </h1>
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
    captcha: Yup.string().required('Campo obbligatorio'),
  });

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        nome: '',
        cognome: '',
        cf: '',
        captcha: '',
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

          <Form.Row className='text-left'>
            <Form.Label>
              {' '}
              <p className='mb-1 font-weight-bold'>Foto del documento di identità rinnovato</p>
              <p className='mb-0'>Lascia libero il documento della scorsa </p>
              <p>iscrizione è ancora valido</p>
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

          <Form.Row>
            <ReCAPTCHA
              className='ml-auto mr-auto mb-2 mt-5'
              sitekey='6LeXQrQZAAAAAIaBCicMfbWEI6xaY4ebOhwVFU8R'
              value={values.captcha}
              onChange={(response) => {
                setFieldValue('captcha', response);
              }}
            />
          </Form.Row>

          <Button type='submit' className='font-weight-bold' style={{ margin: '20px', width: '6rem', height: '3rem' }}>
            Invia
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RinnovoIscrizionePage;
