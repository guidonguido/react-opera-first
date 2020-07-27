import firebase from '../firebase';
import moment from 'moment';

async function addIscrizioneAssociazione(iscrizione) {
  let files = null;
  if (iscrizione.files) {
    files = iscrizione.files.map((file) => file.name);
  }
  const iscrizioneAssociazione = {
    dataIscrizione: moment().format('YYYY-MM-DD HH:mm:ss'),
    nome: iscrizione.nome,
    cognome: iscrizione.cognome,
    cf: iscrizione.cf,
    cell: iscrizione.cell,
    email: iscrizione.email,
    files: files,
    dataNascita: iscrizione.dataNascita,
    cittaNascita: iscrizione.cittaNascita,
    provinciaNascita: iscrizione.provinciaNascita,
    cittaResidenza: iscrizione.cittaResidenza,
    provinciaResidenza: iscrizione.provinciaResidenza,
    viaResidenza: iscrizione.via,
    indirizzoResidenza: iscrizione.indirizzo,
    civicoResidenza: iscrizione.civico,
  };

  //console.log(iscrizioneAssociazione);
  //return firebase.firestore().collection('iscrizioniAssociazione').add(iscrizioneAssociazione);

  const iscrizioniAssociazioneRef = firebase.database().ref('iscrizioniAssociazione');
  const newIscrizioneRef = iscrizioniAssociazioneRef.push();
  return newIscrizioneRef.set(iscrizioneAssociazione);
}

async function addDocumentoIscrizioneAssociazione(files, cf) {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child('documentoIscrizioneAssociazione/' + cf + files[0].name).put(files[0]);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log('Default case. No info about the Upload');
            break;
        }
      },
      function (err) {
        reject(err.code);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
        });
        resolve();
      },
    );
  });
}

async function addRinnovoIscrizioneAssociazione(iscrizione) {
  let files = null;
  if (iscrizione.files) {
    files = iscrizione.files.map((file) => file.name);
  }
  const iscrizioneAssociazione = {
    dataRinnovo: moment().format('YYYY-MM-DD HH:mm:ss'),
    nome: iscrizione.nome,
    cognome: iscrizione.cognome,
    cf: iscrizione.cf,
    files: files,
  };

  const iscrizioniAssociazioneRef = firebase.database().ref('rinnovoIscrizioniAssociazione');
  const newIscrizioneRef = iscrizioniAssociazioneRef.push();
  return newIscrizioneRef.set(iscrizioneAssociazione);
}

async function addDocumentoRinnovoIscrizioneAssociazione(files, cf) {
  const storageRef = firebase.storage().ref();
  const uploadTask = storageRef.child('documentoRinnovoIscrizioneAssociazione/' + cf + files[0].name).put(files[0]);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function (snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log('Default case. No info about the Upload');
            break;
        }
      },
      function (err) {
        reject(err.code);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
        });
        resolve();
      },
    );
  });
}

async function utenteAssociazioExists(cf) {
  const iscrizioniTorneoRef = firebase.database().ref('iscrizioniAssociazione');

  const cfs = iscrizioniTorneoRef.orderByChild('cf').equalTo(cf);
  cfs.once('value', function (snapshot) {
    const exists = snapshot.exists();
    return exists;
  });
}

async function addIscrizioneTorneo(iscrizione) {
  const iscrizioneTorneo = {
    dataIscrizione: moment().format('YYYY-MM-DD HH:mm:ss'),
    nome: iscrizione.nome,
    cognome: iscrizione.cognome,
    cf: iscrizione.cf,
    cell: iscrizione.cell,
    email: iscrizione.email,
    giocatori: iscrizione.giocatori,
  };

  //console.log(iscrizioneAssociazione);
  //return firebase.firestore().collection('iscrizioniAssociazione').add(iscrizioneAssociazione);

  const iscrizioniTorneoRef = firebase.database().ref('iscrizioniTorneo');

  const newIscrizioneRef = iscrizioniTorneoRef.push();
  return newIscrizioneRef.set(iscrizioneTorneo);
}

async function utenteTorneoExists(cf) {
  const iscrizioniTorneoRef = firebase.database().ref('iscrizioniTorneo');

  const cfs = iscrizioniTorneoRef.orderByChild('cf').equalTo(cf);
  cfs.once('value', function (snapshot) {
    const exists = snapshot.exists();
    console.log('API CALLED: exists: ', exists);
    return exists;
  });
}

async function loginAnonymousUser() {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      return firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          console.log('User signed in anonymously');
        })
        .catch((error) => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }
          console.log(error);
          throw error.message;
        });
    })
    .catch((error) => {
      console.log(error);
      throw error.message;
    });
}

async function logoutUser() {
  return firebase.auth().signOut();
}

function initializeAuthObserver(loginUserInApp) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      loginUserInApp(user);
    }
  });
}


const API = {
  addIscrizioneAssociazione,
  addDocumentoIscrizioneAssociazione,
  addRinnovoIscrizioneAssociazione,
  addDocumentoRinnovoIscrizioneAssociazione,
  addIscrizioneTorneo,
  utenteAssociazioExists,
  utenteTorneoExists,
  loginAnonymousUser,
  initializeAuthObserver,
  logoutUser,
};

export default API;
