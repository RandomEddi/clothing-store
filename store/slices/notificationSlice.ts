import { createSlice } from '@reduxjs/toolkit'

const initialState: { isOpen: boolean } = {
  isOpen: true
}

export const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {
    closeNotification(state) {
      state.isOpen = false
    }
  }
})

export const notificationActions = notificationSlice.actions
