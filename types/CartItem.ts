import { IItem } from "./Item"

export interface ICartItem extends IItem {
  size: number
  color: string
  quantity?: number
}