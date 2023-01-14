import type { NextApiRequest, NextApiResponse } from 'next'
import { FIREBASE_URL } from 'api'
import { ErrorResponse, IItem } from 'types'
import axios from 'axios'
import { onValue, ref } from 'firebase/database'
import { db } from '.firebase/app'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IItem | ErrorResponse>
) {
  const { query } = req
  const { id } = query
  try {
    //Получение вещи из базы данных firebase по айди
    const query = ref(db, `items/${id}`)
    let data: IItem | undefined

    onValue(query, (snapshot) => {
      const dataFromDatabase = snapshot.val()

      if (snapshot.exists()) {
        data = dataFromDatabase
      }
    })
    
    if (!data) return

    res.status(200).json(data)
  } catch (e) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message })
    }
  }
  res.status(500).json({ message: 'Ошибка' })
}
