export enum sortItems {
  popularity = 'popularity',
  alphabet = 'alphabet',
  bottomPrice = 'bottomPrice',
  topPrice = 'topPrice'
}

export const isSortItem = (item: string): item is sortItems => {
  return !!(
    item === sortItems.alphabet ||
    item === sortItems.bottomPrice ||
    item === sortItems.popularity ||
    item === sortItems.topPrice
  )
}

export interface ICheckBox {
  title: string
  isChecked: boolean
}
