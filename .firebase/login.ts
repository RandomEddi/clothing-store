import { auth } from './app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { UserCredential } from 'firebase/auth'

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredential | string> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    return res
  } catch (e) {
    if (e instanceof Error) {
      return e.message
    }
    return 'Error'
  }
}

export const logIn = async (
  email: string,
  password: string
): Promise<UserCredential | string> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res
  } catch (e) {
    let error = 'Erorr'
    if (e instanceof Error) {
      error = e.message
    }
    return error
  }
}
