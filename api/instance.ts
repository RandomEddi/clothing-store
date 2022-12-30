import axios from 'axios'

export const FIREBASE_URL =
  'https://clothing-store-ecae0-default-rtdb.firebaseio.com/'

export const appApiInstance = axios.create({ baseURL: 'http://localhost:3000/api' })
