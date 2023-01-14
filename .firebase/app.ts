import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyAojuelR6xl53IafUXbuXllrvJf-Nk7Ass',
  authDomain: 'clothing-store-ecae0.firebaseapp.com',
  databaseURL: 'https://clothing-store-ecae0-default-rtdb.firebaseio.com',
  projectId: 'clothing-store-ecae0',
  storageBucket: 'clothing-store-ecae0.appspot.com',
  messagingSenderId: '445821409325',
  appId: '1:445821409325:web:144f79ed504584538d80a4',
  measurementId: 'G-Z9XD5FVVW4'
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
