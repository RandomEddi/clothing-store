import React, { FC } from 'react'
import Link from 'next/link'
import { cartActions } from 'store//slices'
import { useAppDispatch, useAppSelector } from 'hooks'
import { CartItem } from './ui'
import { CartStyles as styles } from 'styles'

export const Cart: FC = () => {
  const dispatch = useAppDispatch()
  const cartCtx = useAppSelector((state) => state.cartReducer)
  const { items: cartItems } = cartCtx
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
      {cartItems.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <CartItem
                articul={item.articul}
                color={item.color}
                id={item.id}
                img={item.img}
                price={item.price}
                quantity={item.quantity}
                size={item.size}
                title={item.title}
                key={`${item.id} + ${item.size}`}
              />
            ))}
          </div>
          <p className={styles.cartTotal}>
            <span>Всего за товары:</span>
            <span>{cartCtx.totalAmount} &#8381;</span>
          </p>
        </>
      ) : (
        <div className={styles.emptyCart}>Корзина пуста</div>
      )}
      <Link
        onClick={() => dispatch(cartActions.closeCart())}
        className={styles.cartLink}
        href={'/cart'}
      >
        перейти в корзину
      </Link>
    </div>
  )
}
