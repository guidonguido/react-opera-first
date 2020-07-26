import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button'

function SuccessAlert( props ) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert show={props.show && show} variant='success'>
        <Alert.Heading>Iscrizione Inviata con successo</Alert.Heading>
        <p>
          Gentile {props.nome} {props.cognome}, abbiamo ricevuto la tua richiesta di iscrizione. Nei prossimi giorni sarai
          contattato da un responsabile OPERA per confermare l'esito della tua iscrizione.
        </p>
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
          <Button onClick={() => {setShow(false); props.hideAlert()}} variant='outline-success'>
            Ho capito
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default SuccessAlert;
