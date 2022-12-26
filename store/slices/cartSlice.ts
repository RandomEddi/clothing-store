import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICart, ICartItem } from 'types'

interface TypeToChange {
  id: number
  size: number
}

const initialState: ICart = {
  cartIsOpen: false,
  items: [],
  quantity: 0,
  totalAmount: 0
}

export const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    toggleCart(state) {
      state.cartIsOpen = !state.cartIsOpen
    },
    closeCart(state) {
      state.cartIsOpen = false      
    },
    addToCart(state, action: PayloadAction<ICartItem>) {
      const payloadItem = action.payload
      const itemInCart = state.items.find(
        (i) => i.id === payloadItem.id && i.size === payloadItem.size
      )
      if (itemInCart) {
        state.items = state.items.map((i) => {
          if (i.id === itemInCart.id && i.size === payloadItem.size) {
            return {
              ...i,
              quantity: i.quantity + 1
            }
          }
          return i
        })
      } else {
        const itemWithQuantity = { ...payloadItem, quantity: 1 }
        state.items = [itemWithQuantity, ...state.items]
      }
      state.quantity += 1
      state.totalAmount += payloadItem.price
    },
    deleteItemFromCart(state, action: PayloadAction<TypeToChange>) {
      const payload = action.payload
      state.items = state.items.filter((i) => {
        if (i.size === payload.size && i.id === payload.id) {
          const quantityItem = i.quantity
          state.quantity -= quantityItem
          state.totalAmount -= quantityItem * i.price
          return
        }
        return i
      })
    },
    increaseQuantityItem(state, action: PayloadAction<TypeToChange>) {
      const payload = action.payload
      state.items.map((i) => {
        if (i.id === payload.id && i.size === payload.size) {
          i.quantity = i.quantity + 1
          state.quantity += 1
          state.totalAmount += i.price
          return i
        }
        return i
      })
    },
    decreaseQuantityItem(state, action: PayloadAction<TypeToChange>) {
      const payload = action.payload
      state.items.map((i) => {
        if (i.id === payload.id && i.size === payload.size) {
          i.quantity = i.quantity - 1
          state.quantity -= 1
          state.totalAmount -= i.price
          return i
        }
        return i
      })
    }
  }
})

export const cartActions = cartSlice.actions
