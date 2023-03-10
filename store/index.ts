import { configureStore } from '@reduxjs/toolkit'
import {
  notificationSlice,
  cartSlice,
  itemsSlice,
  favouritesSlice,
  profileSlice
} from './slices'

export const store = configureStore({
  reducer: {
    notificationReducer: notificationSlice.reducer,
    cartReducer: cartSlice.reducer,
    itemsReducer: itemsSlice.reducer,
    favouritesReducer: favouritesSlice.reducer,
    profileReducer: profileSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
