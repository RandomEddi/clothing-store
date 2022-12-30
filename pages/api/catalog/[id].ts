import type { NextApiRequest, NextApiResponse } from 'next'
import { FIREBASE_URL } from 'api'
import { ErrorResponse, IItem } from 'types'
import axios from 'axios'

type ResponseType = Record<string, IItem>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IItem[] | ErrorResponse>
) {
  const { query } = req
  const { id } = query
  try {
    const { data } = await axios.get<ResponseType>(
      `${FIREBASE_URL}/items/${id}.json`
    )

    const responseArray: IItem[] = []

    for (const item of Object.keys(data)) {
      responseArray.push({
        articul: data[item].articul,
        category: data[item].category,
        color: data[item].color,
        img: data[item].img,
        price: data[item].price,
        sizes: data[item].sizes,
        structure: data[item].structure,
        title: data[item].title,
        priceWithDiscount: data[item].priceWithDiscount,
        id: item
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
