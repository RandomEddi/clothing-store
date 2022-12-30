import { getCertainItem } from 'api/items'
import { useAppSelector } from 'hooks/useAppSelector'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'

const item: FC = () => {
  const [item, setItem] = useState()
  const router = useRouter()
  // const { id } = router.query
  const id = '-NKJZKoJSDD8dwLq_QVY'
  const items = useAppSelector((state) => state.items.items)

  let currentItem

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      currentItem = getCertainItem(id)
      if (!currentItem) {
        router.push('../404')
      }
    }
  }, [])

  return <div className='container'>{id}</div>
}

export default item
