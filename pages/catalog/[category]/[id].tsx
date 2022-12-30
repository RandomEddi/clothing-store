import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCertainItem } from 'api/items'
import { IItem } from 'types/Item'
import Image from 'next/image'
import { CarouselApp } from 'components/ui'
import styles from 'styles/pages/CatalogItemPage.module.scss'

const CatalogItemPage: FC = () => {
  const [currentItem, setCurrentItem] = useState<IItem>()
  const router = useRouter()
  const { category, id } = router.query

  useEffect(() => {
    if (!id) return
    if (Array.isArray(id)) {
      console.log(id)

      router.push('/404')
    } else {
      getCertainItem(id).then((item) => {
        if (item) {
          setCurrentItem(item)
        } else {
          router.push('/404')
        }
      })
    }
  }, [id])

  return (
    <>
      {currentItem && (
        <div className={styles.catalogItemPage}>
          <div className={styles.imageSlider}>
            <CarouselApp
              photos={currentItem.img}
              settings={{ height: 610, width: 400 }}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default CatalogItemPage
