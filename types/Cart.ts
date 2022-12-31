import { ICartItem } from 'types'

export interface ICart {
  cartIsOpen: boolean
  items: Required<ICartItem>[]
  quantity: number
  totalAmount: number
}
