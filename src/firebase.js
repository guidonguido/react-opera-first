import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database'
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCqxkpeFkHKaQUIm4dSi2IeEGoJCja2c2Y',
  authDomain: 'guido-opera-first.firebaseapp.com',
  databaseURL: 'https://guido-opera-first.firebaseio.com',
  projectId: 'guido-opera-first',
  storageBucket: 'guido-opera-first.appspot.com',
  messagingSenderId: '97611574327',
  appId: '1:97611574327:web:34ade6873ea64055c8a3b2',
  measurementId: 'G-8JJYPVCGN0',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
