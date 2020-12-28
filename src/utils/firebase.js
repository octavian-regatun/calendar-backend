import firebase from 'firebase/app'
import 'firebase/storage'
import { decode, encode } from 'base-64'
import xhr2 from 'xhr2'

global.XMLHttpRequest = xhr2

global.btoa = encode
global.atob = decode

const firebaseConfig = {
  apiKey: 'AIzaSyDnd6HOyU3TOfzBwo1Dw3SBwMhvuyEKgpQ',
  authDomain: 'calendar-923.firebaseapp.com',
  projectId: 'calendar-923',
  storageBucket: 'calendar-923.appspot.com',
  messagingSenderId: '598590342870',
  appId: '1:598590342870:web:62305000fe78fed366eb77',
  measurementId: 'G-C2GPM916W1'
}

firebase.initializeApp(firebaseConfig)

const firebaseStorage = firebase.storage()

export { firebase as default, firebaseStorage }
