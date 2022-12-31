import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCertainItem } from 'api'
import { useAppDispatch, useAppSelector } from 'hooks'
import { Button, buttonType, CarouselApp, CatalogItem } from 'components/ui'
import { IItem, EnumItemCategoryObject } from 'types'
import styles from 'styles/pages/CatalogItemPage.module.scss'
import { cartActions } from 'store//slices'
import { shuffleArray } from 'utils/shuffleArray'

const CatalogItemPage: FC = () => {
  const [currentItem, setCurrentItem] = useState<IItem>()
  const router = useRouter()
  const { id } = router.query
  const itemCategory = currentItem?.category
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const dispatch = useAppDispatch()
  const mayLikeItems = shuffleArray(
    useAppSelector((state) => state.items.items).filter(
      (i) => i.category === currentItem?.category && i.id !== currentItem.id
    )
  )
  const isItemInCart = !!useAppSelector(
    (state) => state.cartReducer.items
  ).find((i) => i.id === currentItem?.id && i.size === selectedSize)

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

  const chooseSizeHandler = (size: number) => {
    if (size === selectedSize) {
      setSelectedSize(null)
    } else {
      setSelectedSize(size)
    }
  }

  const onAddToCart = () => {
    if (!currentItem || isItemInCart) return
    if (
      (selectedSize && !!currentItem.sizes?.length) ||
      !!!currentItem.sizes?.length
    ) {
      const sizeToCart = !!!currentItem.sizes?.length ? null : selectedSize

      dispatch(
        cartActions.addToCart({
          articul: currentItem.articul,
          color: currentItem.color,
          id: currentItem.id,
          img: currentItem.img,
          price: currentItem.price,
          size: sizeToCart,
          title: currentItem.title
        })
      )
    }
  }

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
          <div className={styles.catalogItem}>
            <div className={styles.imageSlider}>
              <CarouselApp
                photos={currentItem.img}
                settings={{ height: 610, width: 400 }}
              />
            </div>
            <div className={styles.catalogItemInfo}>
              <p className={styles.catalogItemArticul}>
                Артикул - {currentItem.articul}
              </p>
              <h3 className={styles.catalogItemTitle}>{currentItem.title}</h3>
              <div className={styles.catalogItemSizes}>
                {currentItem?.sizes?.map((size) => (
                  <button
                    key={size}
                    className={`${size === selectedSize ? styles.active : ''}`}
                    onClick={() => {
                      chooseSizeHandler(size)
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {currentItem.sizes && (
                <Link href={'/info/sizes'} className={styles.linkToSize}>
                  Таблица размеров
                </Link>
              )}
              <div className={styles.catalogItemColor}>
                Цвет: {currentItem.color}
              </div>
              <div className={styles.catalogItemPrice}>
                {currentItem.price} &#8381;
              </div>
              <div className={styles.catalogItemManagement}>
                <Button
                  type={isItemInCart ? buttonType.cartActive : buttonType.blue}
                  clickHandler={onAddToCart}
                >
                  {isItemInCart ? 'в корзине' : 'добавить в корзину'}
                </Button>
              </div>
              <div className={styles.catalogItemStructure}>
                <p className={styles.structureTitle}>Состав ткани</p>
                <p className={styles.structureDesc}>{currentItem.structure}</p>
              </div>
            </div>
          </div>
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
