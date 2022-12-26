import React, { FC, useState } from 'react'
import Image from 'next/image'
import { cartActions, favouritesActions } from 'store//slices'
import { useAppDispatch, useAppSelector } from 'hooks'
import { CatalogItemStyles as styles } from 'styles/ui'
import { IItem } from 'types'

export const CatalogItem: FC<IItem> = React.memo((props) => {
  const { img, price, color, sizes, title, articul, id, priceWithDiscount } =
    props
  const dispatch = useAppDispatch()
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [itemIsFocused, setItemIsFocused] = useState<boolean>(false)
  const favouritesItems = useAppSelector((state) => state.favourites.items)
  const isFavouriteActive = !!favouritesItems.find((i) => i.id === id)

  const chooseSizeHandler = (size: number) => {
    if (size === selectedSize) {
      setSelectedSize(null)
    } else {
      setSelectedSize(size)
    }
  }

  const onItemFocusHandler = () => {
    setItemIsFocused(true)
  }

  const onItemBlurHandler = () => {
    setItemIsFocused(false)
  }

  const onAddToCartHandler = () => {
    if (selectedSize) {
      dispatch(
        cartActions.addToCart({
          articul,
          color,
          id,
          img,
          price,
          size: selectedSize,
          title
        })
      )
    }
  }

  const addToFavouriteHandler = () => {
    if (!isFavouriteActive) {
      dispatch(
        favouritesActions.addToFavourites({
          title,
          articul,
          color,
          id,
          img,
          price,
          sizes
        })
      )
    } else {
      dispatch(favouritesActions.deleteFromFavourites({ id }))
    }
  }

  return (
    <div
      className={styles.catalogItem}
      onMouseOver={onItemFocusHandler}
      onMouseLeave={onItemBlurHandler}
    >
      <div className={styles.itemImage}>
        <Image
          className={styles.itemPhoto}
          height={600}
          width={400}
          src={img}
          alt={title}
        ></Image>
        <div
          className={`${styles.itemManagement}${
            itemIsFocused ? ` ${styles.itemIsHovered}` : ''
          }`}
        >
          <div className={styles.itemToFavourite}>
            <button onClick={addToFavouriteHandler}>
              {isFavouriteActive ? (
                <Image height={20} width={18} src='/favourite-active.svg' alt='favourite svg' />
              ) : (
                <Image height={20} width={18} src='/favourite.svg' alt='favourite svg' />
              )}
            </button>
          </div>
          <div className={styles.itemToCart}>
            <div className={styles.itemSizes}>
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => chooseSizeHandler(size)}
                  className={`${styles.itemSize}${
                    selectedSize === size ? ` ${styles.activeSize}` : ''
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button onClick={onAddToCartHandler}>Добавить в корзину</button>
          </div>
        </div>
      </div>
      <div className={styles.itemTitle}>
        <p>{title}</p>
      </div>
      <div className={styles.itemPrice}>
        {priceWithDiscount ? (
          <p>
            {priceWithDiscount}
            <span> &#8381;</span>
          </p>
        ) : (
          ''
        )}
        <p
          style={{
            textDecoration: `${priceWithDiscount ? 'line-through' : 'none'}`
          }}
        >
          {price}
          <span> &#8381;</span>
        </p>
      </div>
    </div>
  )
})
