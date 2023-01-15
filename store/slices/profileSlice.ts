import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfile } from 'types'

const initialState: IProfile = {
  isLogged: false,
  userData: {},
  userAddresses: [],
  userOrders: []
}

export const profileSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {
    setUser(state, action: PayloadAction<IProfile>) {
      state.userData = action.payload.userData
      state.isLogged = true
    },
    userLogOut(state) {
      state.isLogged = false
      state.userData = {}
      state.userAddresses = []
      state.userOrders = []
    }
  }
})

export const profileActions = profileSlice.actions
