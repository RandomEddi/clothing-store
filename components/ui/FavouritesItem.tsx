import { useAppDispatch } from 'hooks'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { cartActions, favouritesActions } from 'store//slices'
import { FavouritesItemStyles as styles } from 'styles/ui'
import { IItem } from 'types'

interface photosSettings {
  height: number
  width: number
}

export const FavouritesItem: FC<IItem & photosSettings> = React.memo(
  (props) => {
    const {
      articul,
      color,
      id,
      img,
      price,
      sizes,
      title,
      priceWithDiscount,
      height,
      width
    } = props
    const [selectedSize, setSelectedSize] = useState<number | null>(null)
    const dispatch = useAppDispatch()
    const [itemIsFocused, setItemIsFocused] = useState<boolean>(false)
    const chooseSizeHandler = (size: number) => {
      if (size === selectedSize) {
        setSelectedSize(null)
      } else {
        setSelectedSize(size)
      }
    }
    
    const deleteFavouriteHandler = () => {
      dispatch(favouritesActions.deleteFromFavourites({ id }))
    }

    const onItemFocusHandler = () => {
      setItemIsFocused(true)
    }

    const onItemBlurHandler = () => {
      setItemIsFocused(false)
    }

    const onAddToCartHandler = () => {
      if (!sizes || selectedSize) {
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
    //TODO: Доделать фаворит
    return (
      <div
        onMouseOver={onItemFocusHandler}
        onMouseLeave={onItemBlurHandler}
        className={styles.favouriteItem}
      >
        <div className={styles.favouriteImage}>
          <Image
            height={height}
            width={width}
            src={img[0]}
            alt='favoutire photo'
          ></Image>
          <div
            className={`${styles.favouriteManagement}${
              itemIsFocused ? ` ${styles.favouriteActive}` : ''
            }`}
          >
            <div className={styles.deleteFavourite}>
              <button onClick={deleteFavouriteHandler}>
                <Image
                  height={12}
                  width={12}
                  src={'/delete-favourite.svg'}
                  alt='delete favourite'
                ></Image>
              </button>
            </div>
            <div className={styles.favouriteToCart}>
              <div className={styles.sizes}>
                {sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => chooseSizeHandler(size)}
                    className={`${
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
        <div className={styles.favouriteInfo}>
          <p>{title}</p>
          <p>
            {priceWithDiscount ? priceWithDiscount : price}
            <span> &#8381;</span>
          </p>
        </div>
      </div>
    )
  }
)
