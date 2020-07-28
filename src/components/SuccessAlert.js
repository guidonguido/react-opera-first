import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function SuccessAlert(props) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={props.show && show} variant='success'>
        <Alert.Heading>Iscrizione Inviata con successo</Alert.Heading>
        <p>
          Gentile {props.nome} {props.cognome}, abbiamo ricevuto la tua richiesta di iscrizione. Nei prossimi giorni sarai
          contattato da un responsabile OPERA per confermare l'esito della tua iscrizione.
        </p>

        {props.scadenzaPagamento && (
          <p>
            Ricorda che l'iscrizione sarà finalizzata solo a seguito del pagamento della quota di Iscrizione di 15€ (come da <a
              href='https://firebasestorage.googleapis.com/v0/b/guido-opera-first.appspot.com/o/Trattamento%20dati%2FREGOLAMENTO%20INTERNO%20ASSOCIAZIONE%2011-07.pdf?alt=media&token=07891542-d761-45d9-af7a-c6db1ae99775'
              target='_blank'
              rel='noopener noreferrer'> Regolamento{' '}
            </a>
            ). Il pagamento dovrà essere effettuato entro e non oltre il {props.scadenzaPagamento}.
          </p>
        )}

        {props.inviaDocumento ? (
          <p>
            Non avendo inviato un documento di identità, puoi consegnarne una copia in sede oppure inviarla tramite WhatsApp
            al numero +39 3462244752
          </p>
        ) : null}
        {props.minorenne ? (
          <p>
            Per gli iscritti minorenni è richiesta una ulteriore autorizzazione da un familiare. Riceverai istruzioni in
            seguito.
          </p>
        ) : null}
        <hr />
        <div className='d-flex justify-content-end'>
          <Button
            onClick={() => {
              setShow(false);
              props.hideAlert();
            }}
            variant='outline-success'>
            Ho capito
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default SuccessAlert;
