import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getCertainItem } from 'api'
import { useAppDispatch, useAppSelector } from 'hooks'
import { CatalogPageItem } from 'components'
import { CatalogItem } from 'components/ui'
import { IItem, EnumItemCategoryObject } from 'types'
import styles from 'styles/pages/CatalogItemPage.module.scss'
import { cartActions } from 'store//slices'
import { shuffleArray } from 'utils/shuffleArray'

const CatalogItemPage: FC = () => {
  const [currentItem, setCurrentItem] = useState<IItem>()
  const router = useRouter()
  const { id } = router.query
  const itemCategory = currentItem?.category
  const dispatch = useAppDispatch()
  const mayLikeItems = shuffleArray(
    useAppSelector((state) => state.items.items).filter(
      (i) => i.category === currentItem?.category && i.id !== currentItem.id
    )
  )
  

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
      {itemCategory && currentItem && (
        <div className={`${styles.catalogItemPage} container`}>
          <p className={styles.path}>
            Главная<span className={styles.delimiter}>/</span>
            Каталог
            <span className={styles.delimiter}>/</span>
            {EnumItemCategoryObject[itemCategory]}
            <span className={styles.delimiter}>/</span>
            <span className={styles.big}>{currentItem.title}</span>
          </p>
          <CatalogPageItem {...currentItem} />
          {mayLikeItems.length > 0 && (
            <div className={styles.mayLikeIt}>
              <p>ВАМ МОЖЕТ ПОНРАВИТЬСЯ</p>
              <div className={styles.mayLikeItItems}>
                {mayLikeItems.slice(0, 4).map((item) => (
                  <CatalogItem
                    height={420}
                    width={298}
                    key={item.id}
                    {...item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default CatalogItemPage
