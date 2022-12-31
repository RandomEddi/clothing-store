import { ItemCategoryType } from 'types'

export interface IItem {
  id: string
  title: string
  price: number
  img: string[]
  articul: number
  sizes?: number[]
  color: string
  priceWithDiscount?: number
  category: ItemCategoryType
  structure: string
}
