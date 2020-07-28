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

import ReCAPTCHA from 'react-google-recaptcha';

import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';

const IscrizioneTorneoPage = (props) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values) => {
    props.loading(true);

    API.addIscrizioneTorneo(values)
      .then(() => {
        setTimeout(() => {
          console.log(values);
          props.handleSubmitSuccess(values, false);
          setSubmitted(true);
        }, 2000);
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
          Iscriviti al Torneo Opera{' '}
          <span role='img' aria-label=''>
            ⚽
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
    email: Yup.string().email('Inserisci una email valida'),
    cell: Yup.string().length(10, 'Inserisci un numero valido').required('Campo obbligatorio'),
    captcha: Yup.string().required('Campo obbligatorio'),
    giocatori: Yup.array().of(
      Yup.object().shape({
        nome: Yup.string().required('Campo obbligatorio').max(14, 'Nome troppo lungo'),
        cognome: Yup.string().required('Campo obbligatorio').max(14, 'Cognome troppo lungo'),
      }),
    ),
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
        captcha: '',
        giocatori: [],
      }}
      onSubmit={(values) => {
        props.submitForm(values);
      }}>
      {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row className='mb-3 text-left'>
            <Form.Group as={Col} md='6' controlId='validationNome'>
              <Form.Label className='mr-auto font-weight-bold'> Nome Capitano* </Form.Label>
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
              <Form.Label className='font-weight-bold'> Cognome Capitano* </Form.Label>
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
            <Form.Label className='font-weight-bold'> Codice Fiscale Capitano* </Form.Label>
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

          <FieldArray name='giocatori'>
            {({ insert, remove, push }) => (
              <div>
                {values.giocatori &&
                  values.giocatori.length > 0 &&
                  values.giocatori.map((giocatore, index) => (
                    <div key={index}>
                      <Form.Row className='text-left mb-0 mt-0'>
                        <Form.Group as={Col} md='6'>
                          <Form.Label className='mr-auto font-weight-bold'> {`Nome Giocatore ${index + 1} *`} </Form.Label>
                          <Form.Control
                            type='text'
                            name={`giocatori.${index}.nome`}
                            isInvalid={
                              touched.giocatori &&
                              errors.giocatori &&
                              errors.giocatori[index] &&
                              errors.giocatori[index].nome
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.giocatori && errors.giocatori[index] && errors.giocatori[index].nome}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md='6'>
                          <Form.Label className='font-weight-bold'> Cognome* </Form.Label>
                          <Form.Control
                            type='text'
                            name={`giocatori.${index}.cognome`}
                            isInvalid={
                              touched.giocatori &&
                              errors.giocatori &&
                              errors.giocatori[index] &&
                              errors.giocatori[index].cognome
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors.giocatori && errors.giocatori[index] && errors.giocatori[index].cognome}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row className='mt-0'>
                        <Form.Group className='ml-auto mr-auto '>
                          {values.giocatori.length - 1 === index && (
                            <Button variant='danger' className='mb-md-4' onClick={() => remove(index)}>
                              Rimuovi Giocatore
                            </Button>
                          )}
                        </Form.Group>
                      </Form.Row>
                    </div>
                  ))}

                <Form.Row>
                  <Form.Group className='ml-auto mr-auto'>
                    <Button variant='success' onClick={() => push({ nome: '', cognome: '' })}>
                      Aggiungi Giocatore
                    </Button>
                  </Form.Group>
                </Form.Row>
              </div>
            )}
          </FieldArray>

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

export default IscrizioneTorneoPage;
