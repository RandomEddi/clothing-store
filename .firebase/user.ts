import { db } from './app'
import { onValue, ref, set } from 'firebase/database'
import { IProfile } from 'types/Profile'
import { AppDispatch } from 'store'
import { profileActions } from 'store//slices'

interface IUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
}

export const createUserInDatabase = async (user: IUser) => {
  const query = ref(db, `users/${user.id}`)
  const profile = {
    userData: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    },
    userAddresses: [],
    userOrders: []
  }
  await set(query, profile)
}

export const getUserFromDatabase = (uid: string) => (dispatch: AppDispatch) => {
  try {
    const query = ref(db, `users/${uid}`)
    
    onValue(query, (snapshot) => {
      setTimeout(async () => {
        const dataFromDatabase = await snapshot.val()
        if (snapshot.exists()) {
          dispatch(profileActions.setUser(dataFromDatabase))
        }
      })
    })
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
  }
}
