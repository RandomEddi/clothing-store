import React, { FC, useState } from 'react'
import { IItem, ItemColorObject, ItemColorType } from 'types'
import { CatalogPageItemStyles as styles } from 'styles/pages'
import { Button, buttonType, CarouselApp } from 'components/ui'
import Link from 'next/link'
import Image from 'next/image'
import { useAppSelector, useAppDispatch } from 'hooks'
import { cartActions, favouritesActions } from 'store//slices'

export const CatalogPageItem: FC<IItem> = (props) => {
  const {
    articul,
    category,
    color,
    id,
    img,
    price,
    structure,
    title,
    priceWithDiscount,
    sizes
  } = props
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const favouritesItems = useAppSelector(
    (state) => state.favouritesReducer.items
  )

  const isFavouriteActive = !!favouritesItems.find((i) => i.id === id)

  const isItemInCart = !!useAppSelector(
    (state) => state.cartReducer.items
  ).find((i) => i.id === id && i.size === selectedSize)

  const chooseSizeHandler = (size: number) => {
    if (size === selectedSize) {
      setSelectedSize(null)
    } else {
      setSelectedSize(size)
    }
  }

  const onAddToFavourite = () => {
    if (!isFavouriteActive) {
      dispatch(favouritesActions.addToFavourites(props))
    } else {
      dispatch(favouritesActions.deleteFromFavourites({ id }))
    }
  }

  const onAddToCart = () => {
    if (isItemInCart) return
    if ((selectedSize && !!sizes?.length) || !!!sizes?.length) {
      const sizeToCart = !!!sizes?.length ? null : selectedSize

      dispatch(
        cartActions.addToCart({
          articul: articul,
          color: color,
          id: id,
          img: img,
          price: priceWithDiscount ? priceWithDiscount : price,
          size: sizeToCart,
          title: title
        })
      )
    }
  }

  return (
    <div className={styles.catalogItem}>
      <div className={styles.imageSlider}>
        <CarouselApp photos={img} settings={{ height: 610, width: 400 }} />
      </div>
      <div className={styles.catalogItemInfo}>
        <p className={styles.catalogItemArticul}>Артикул - {articul}</p>
        <h3 className={styles.catalogItemTitle}>{title}</h3>
        <div className={styles.catalogItemSizes}>
          {sizes?.map((size) => (
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
        {sizes && (
          <Link href={'/info/sizes'} className={styles.linkToSize}>
            Таблица размеров
          </Link>
        )}
        <div className={styles.catalogItemColor}>
          Цвет: {ItemColorObject[color as ItemColorType]}
        </div>
        <div className={styles.catalogItemPrice}>
          {priceWithDiscount && <p>{priceWithDiscount}</p>}
          <p
            style={{ textDecoration: priceWithDiscount ? 'line-through' : '' }}
          >
            {price} &#8381;
          </p>
        </div>
        <div className={styles.catalogItemManagement}>
          <Button
            type={isItemInCart ? buttonType.cartActive : buttonType.blue}
            clickHandler={onAddToCart}
            style={!selectedSize ? { cursor: 'no-drop' } : {}}
          >
            {isItemInCart ? 'в корзине' : 'добавить в корзину'}
          </Button>
          <button onClick={onAddToFavourite} className={styles.toFavourite}>
            {isFavouriteActive ? (
              <Image
                height={20}
                width={18}
                src='/favourite-active.svg'
                alt='favourite svg'
              />
            ) : (
              <Image
                height={20}
                width={18}
                src='/favourite-itemPage.svg'
                alt='favourite svg'
              />
            )}
          </button>
        </div>
        <div className={styles.catalogItemStructure}>
          <p className={styles.structureTitle}>Состав ткани</p>
          <p className={styles.structureDesc}>{structure}</p>
        </div>
      </div>
    </div>
  )
}
