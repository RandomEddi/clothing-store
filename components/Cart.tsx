import Link from 'next/link'
import React, { FC } from 'react'
import styles from 'styles/Cart.module.scss'
import { useAppDispatch, useAppSelector } from 'hooks'
import { cartActions } from 'store//slices/cartSlice'

export const Cart: FC = () => {
  const dispatch = useAppDispatch()
  const cartCtx = useAppSelector((state) => state.cartReducer)
  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart())
  }
  return (
    <div
      className={`${styles.cart} ${
        cartCtx.cartIsOpen ? ` ${styles.active}` : ''
      }`}
    >
      <div className={styles.cartTop}>
        <span>Корзина ({cartCtx.quantity})</span>
        <button onClick={toggleCartHandler}>
          <span className={styles.close}>закрыть</span>
        </button>
      </div>
      <div className={styles.cartItems}></div>
      <p className={styles.cartTotal}>
        <span>Всего за товары:</span>
        <span>{cartCtx.total} &#8381;</span>
      </p>
      <Link className={styles.cartLink} href={'/cart'}>
        перейти в корзину
      </Link>
    </div>
  )
}
