import { createSlice } from '@reduxjs/toolkit'
import { IItem } from 'types'
import { PayloadAction } from '@reduxjs/toolkit'

interface IItems {
  items: IItem[]
}

const initialState: IItems = {
  items: []
}

export const itemsSlice = createSlice({
  initialState,
  name: 'items',
  reducers: {
    updateItems(state, action: PayloadAction<IItem[]>) {
      state.items = action.payload
    }
  }
})

export const itemsActions = itemsSlice.actions
