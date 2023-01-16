import { auth } from './app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
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

export const logOut = async () => {
  try {
    signOut(auth)
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}

export const passwordRecovery = async (email: string) => {
  try {
    sendPasswordResetEmail(auth, email)
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
