import firebase from '../firebase';

async function addIscrizioneAssociazione(iscrizione) {
  let files = null;
  if(iscrizione.files) {
    files = iscrizione.files.map(file => file.name )
  }
  const iscrizioneAssociazione = {
    nome: iscrizione.nome,
    cognome: iscrizione.cognome,
    cf: iscrizione.cf,
    cell: iscrizione.cell,
    email: iscrizione.email,
    files: files,
  }

  console.log(iscrizioneAssociazione);
  return firebase.firestore().collection('iscrizioniAssociazione').add(iscrizioneAssociazione);
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

const API = { addIscrizioneAssociazione, addDocumentoIscrizioneAssociazione };

export default API;
