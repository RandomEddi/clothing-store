import { createSlice } from '@reduxjs/toolkit'
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
  reducers: {}
})

export const profileActions = profileSlice.actions
