import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'

function ErrorAlert( props ) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={props.show && show} variant='danger'>
        <Alert.Heading>Errore nell'invio della tua Iscrizione</Alert.Heading>
        <p>
          Gentile utente, non è stato possibile concludere l'iscrizione.
        </p>
        { <p>Errore: {props.show}</p>       }
        <p>Se il problema dovesse persistere, contatta il numero +39 3495513563 oppure recati in una sede OPERA.</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button onClick={() => {setShow(false); props.hideAlert()}} variant='outline-success'>
            Ho capito
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default ErrorAlert;
