import { IItem } from './Item'

export interface ICatalogItem extends IItem {
  sizes: number[]
  priceWithDiscount?: number
}
