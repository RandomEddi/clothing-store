import { db } from './app'
import { ref, set } from 'firebase/database'

interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
}

export const createUserInDataBase = async (user: IUser) => {
  const query = ref(db, 'users')
  const profile = {
    [user.id]: {
      userData: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      },
      userAddresses: [],
      userOrders: []
    }
  }
  await set(query, profile)
}
