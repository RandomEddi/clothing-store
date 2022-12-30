import type { NextApiRequest, NextApiResponse } from 'next'
import { FIREBASE_URL } from 'api'
import { ErrorResponse, IItem } from 'types'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IItem | ErrorResponse>
) {
  const { query } = req
  const { id } = query
  try {
    const { data } = await axios.get<IItem>(`${FIREBASE_URL}/items/${id}.json`)

    res.status(200).json(data)
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message })
    }
  }
  res.status(500).json({ message: 'Ошибка' })
}
