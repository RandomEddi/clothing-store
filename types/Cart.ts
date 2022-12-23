import { ICartItem } from './CartItem'

export interface ICart {
  cartIsOpen: boolean
  items: Required<ICartItem>[]
  quantity: number
  totalAmount: number
}
