import type { NextApiRequest, NextApiResponse } from 'next'
import { FIREBASE_URL } from 'api'
import { ErrorResponse, IItem } from 'types'
import axios from 'axios'
import { onValue, ref } from 'firebase/database'
import { db } from '.firebase/app'

type ResponseType = Record<string, IItem>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IItem[] | ErrorResponse>
) {
  try {
    //Получение данных из базы данных firebase
    const query = ref(db, 'items')
    let data: ResponseType | undefined

    onValue(query, (snapshot) => {
      const dataFromDatabase = snapshot.val()

      if (snapshot.exists()) {
        data = dataFromDatabase
      }
    })

    if (!data) return
    
    //Фильтрация данных
    let responseArray: IItem[] = []

    const {
      category: queryCategory,
      size: querySize,
      color: queryColor,
      priceFrom: queryPriceFrom,
      priceTo: queryPriceTo
    } = req.query

    for (const item of Object.keys(data)) {
      responseArray.push({
        ...data[item],
        id: item
      })
    }

    if (queryCategory && !Array.isArray(queryCategory)) {
      responseArray = responseArray.filter((i) =>
        queryCategory.split(',').includes(i.category)
      )
    }

    if (querySize && !Array.isArray(querySize)) {
      responseArray = responseArray.filter((i) => {
        const querySizes = querySize.split(',')
        return !!querySizes.filter((qSize) => i.sizes?.includes(+qSize)).length
      })
    }

    if (queryColor && !Array.isArray(queryColor)) {
      responseArray = responseArray.filter((i) =>
        queryColor.split(',').includes(i.color)
      )
    }

    if (queryPriceFrom && !Array.isArray(queryPriceFrom)) {
      responseArray = responseArray.filter((i) => {
        if (i.priceWithDiscount) {
          return +queryPriceFrom <= i.priceWithDiscount
        } else {
          return +queryPriceFrom <= i.price
        }
      })
    }

    if (queryPriceTo && !Array.isArray(queryPriceTo)) {
      responseArray = responseArray.filter((i) => {
        if (i.priceWithDiscount) {
          return +queryPriceTo >= i.priceWithDiscount
        } else {
          return +queryPriceTo >= i.price
        }
      })
    }

    res.status(200).json(responseArray)
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message })
    }
  }
  res.status(500).json({ message: 'Ошибка' })
}
