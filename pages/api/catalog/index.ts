import type { NextApiRequest, NextApiResponse } from 'next'
import { FIREBASE_URL } from 'api'
import { ErrorResponse, IItem } from 'types'
import axios from 'axios'

type ResponseType = Record<string, IItem>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IItem[] | ErrorResponse>
) {
  try {
    const { data } = await axios.get<ResponseType>(`${FIREBASE_URL}/items.json`)
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

    // if (querySize && !Array.isArray(querySize)) {
    //   responseArray = responseArray.filter((i) =>
    //     querySize.split(',').includes(i.sizes)
    //   )
    // }

    if (queryColor && !Array.isArray(queryColor)) {
      responseArray = responseArray.filter((i) =>
        queryColor.split(',').includes(i.color)
      )
    }

    if (queryPriceFrom && !Array.isArray(queryPriceFrom)) {
      responseArray = responseArray.filter((i) => +queryPriceFrom <= i.price)
    }

    if (queryPriceTo && !Array.isArray(queryPriceTo)) {
      responseArray = responseArray.filter((i) => +queryPriceTo >= i.price)
    }

    res.status(200).json(responseArray)
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message })
    }
  }
  res.status(500).json({ message: 'Ошибка' })
}
