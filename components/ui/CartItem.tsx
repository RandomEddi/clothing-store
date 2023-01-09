import React, { FC } from 'react'
import Image from 'next/image'
import { cartActions } from 'store//slices'
import { useAppDispatch } from 'hooks'
import { CartItemStyles as styles } from 'styles/ui'
import { ICartItem, ItemColorObject, ItemColorType } from 'types'

export const CartItem: FC<ICartItem> = React.memo((props) => {
  const { color, id, img, price, quantity, size, title } = props
  const dispatch = useAppDispatch()
  const toChange = { id, size }
  const onDeleteItemHandler = () => {
    dispatch(cartActions.deleteItemFromCart({ id, size }))
  }

  const onIncreaseItemHandler = () => {
    dispatch(cartActions.increaseQuantityItem(toChange))
  }

  const onDecreaseItemHandler = () => {
    if (quantity === 1) {
      dispatch(cartActions.deleteItemFromCart(toChange))
    } else {
      dispatch(cartActions.decreaseQuantityItem(toChange))
    }
  }

  return (
    <>
      <div className={styles.cartItem}>
        <div className={styles.itemImg}>
          <Image height={200} width={130} src={img[0]} alt='cart item' />
        </div>
        <div className={styles.itemDetails}>
          <div>
            <div className={styles.itemTitle}>
              <p>{title}</p>
              <button onClick={onDeleteItemHandler}>
                <Image height={12} width={12} src='/close.svg' alt='close' />
              </button>
            </div>
            {size && <p className={styles.itemDetail}>
              Размер:&nbsp;<span>{size}</span>
            </p>}
            <p className={styles.itemDetail}>
              Цвет:&nbsp;<span>{ItemColorObject[color as ItemColorType]}</span>
            </p>
            <div className={styles.itemQuantity}>
              Количество:&nbsp;
              <button onClick={onDecreaseItemHandler}>&#8722;</button>
              {quantity}
              <button onClick={onIncreaseItemHandler}>&#43;</button>
            </div>
          </div>
          <div className={styles.itemPrice}>
            {price}
            <span> &#8381;</span>
          </div>
        </div>
      </div>
      <div className={styles.delimiter}></div>
    </>
  )
})
