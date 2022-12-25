import { createSlice } from '@reduxjs/toolkit'
import { IItem } from 'types'

interface IItems {
  items: IItem[]
}

const initialState: IItems = {
  items: [
    {
      id: 1,
      img: '/catalog-item-1.png',
      price: 5000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Бомбер',
      articul: 134,
      color: 'Черный'
    },
    {
      id: 2,
      img: '/catalog-item-2.png',
      price: 4000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Кожаная куртка',
      articul: 134,
      color: 'Черный'
    },
    {
      id: 3,
      img: '/catalog-item-3.png',
      price: 12000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Тренч',
      articul: 134,
      color: 'Черный'
    },
    {
      id: 4,
      img: '/catalog-item-4.png',
      price: 5000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Рубашка',
      priceWithDiscount: 4500,
      articul: 134,
      color: 'Красный'
    },
    {
      id: 5,
      img: '/catalog-item-5.png',
      price: 8000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Платье',
      articul: 134,
      color: 'Черный'
    },
    {
      id: 6,
      img: '/catalog-item-6.png',
      price: 5000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Домашний комплект',
      priceWithDiscount: 4500,
      articul: 134,
      color: 'Черный'
    },
    {
      id: 7,
      img: '/catalog-item-7.png',
      price: 3000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Базовая водолазка',
      articul: 134,
      color: 'Белый'
    },
    {
      id: 8,
      img: '/catalog-item-8.png',
      price: 12000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Базовая футболка',
      articul: 134,
      color: 'Бежевый'
    },
    {
      id: 9,
      img: '/catalog-item-9.png',
      price: 5000,
      sizes: [40, 42, 44, 46, 48],
      title: 'Классические брюки',
      articul: 134,
      color: 'Черный'
    }
  ]
}

export const itemsSlice = createSlice({
  initialState,
  name: 'items',
  reducers: {}
})

export const itemsActions = itemsSlice.actions
