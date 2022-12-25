import React, { FC, useState } from 'react'
import Image from 'next/image'
import { IItem } from 'types'
import { CatalogItemStyles as styles } from 'styles/ui'
import { useAppDispatch } from 'hooks'
import { cartActions } from 'store//slices/cartSlice'

export const CatalogItem: FC<IItem> = React.memo((props) => {
  const { img, price, color, sizes, title, articul, id, priceWithDiscount } = props
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [itemIsFocused, setItemIsFocused] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  
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
          color: color,
          id,
          img,
          price,
          size: selectedSize,
          title
        })
      )
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
            <button>
              <img src='/heart.svg' alt='heart svg' />
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
