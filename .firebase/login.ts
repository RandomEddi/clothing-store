import { auth } from './app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
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
