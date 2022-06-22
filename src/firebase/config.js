import firebase from '@firebase/app-compat';
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB3Hyq-GCT9bDCM3ryKG4AZ9HwVBqZ8QYc",
    authDomain: "muso-ninjas-c5e17.firebaseapp.com",
    projectId: "muso-ninjas-c5e17",
    storageBucket: "muso-ninjas-c5e17.appspot.com",
    messagingSenderId: "10504648112",
    appId: "1:10504648112:web:b5795abd1aa315ae4ed275"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }