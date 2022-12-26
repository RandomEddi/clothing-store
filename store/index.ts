import { configureStore } from '@reduxjs/toolkit'
import { notificationSlice, cartSlice, itemsSlice, favouritesSlice } from './slices'

export const store = configureStore({
  reducer: {
    notificationReducer: notificationSlice.reducer,
    cartReducer: cartSlice.reducer,
    items: itemsSlice.reducer,
    favourites: favouritesSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
