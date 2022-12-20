import { createSlice } from '@reduxjs/toolkit'
import { ICart } from 'types'

const initialState: ICart = {
  cartIsOpen: false,
  items: [],
  quantity: 0,
  total: 0
}

export const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    toggleCart(state) {
      state.cartIsOpen = !state.cartIsOpen
    }
  }
})

export const cartActions = cartSlice.actions
