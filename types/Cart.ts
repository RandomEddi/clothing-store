import { ICartItem } from "./ICartItem"

export interface ICart {
  cartIsOpen: boolean
  items: ICartItem[]
  quantity: number
  total: number
}