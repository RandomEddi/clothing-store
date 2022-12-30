import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFavourite, IItem } from 'types'

const initialState: IFavourite = {
  favouritesIsOpen: false,
  items: []
}

export const favouritesSlice = createSlice({
  initialState,
  name: 'favourites',
  reducers: {
    toggleFavourites(state) {
      state.favouritesIsOpen = !state.favouritesIsOpen
    },
    closeFavourites(state) {
      state.favouritesIsOpen = false
    },
    addToFavourites(state, action: PayloadAction<IItem>) {
      state.items = [action.payload, ...state.items]
    },
    deleteFromFavourites(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload
      state.items = state.items.filter((item) => {
        if (id !== item.id) {
          return item
        }
      })
    }
  }
})

export const favouritesActions = favouritesSlice.actions
