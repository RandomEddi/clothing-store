import React, { FC } from 'react'
import styles from 'styles/Header.module.scss'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from 'hooks'
import { cartActions } from 'store//slices/cartSlice'

export const Header: FC = () => {
  const dispatch = useAppDispatch()
  const toggleCartHandler = () => {
    dispatch(cartActions.toggleCart())
  }
  const cartQuantity = useAppSelector((state) => state.cartReducer.quantity)
  
  return (
    <header className={`${styles.header} container`}>
      <nav>
        <ul>
          <li>
            <Link href={'/catalog'}>Каталог</Link>
          </li>
          <li>
            <Link href={'/lookbook'}>lookbook</Link>
          </li>
          <li>
            <Link href={'/brand'}>О бренде</Link>
          </li>
          <li>
            <Link href={'/info'}>информация</Link>
          </li>
        </ul>
      </nav>
      <Link href={'/'} className='logo'>
        <img src='/logo.svg' alt='logotip' />
      </Link>
      <div className={styles.secondNav}>
        <button>
          <img src={'/search.svg'} alt='search' />
        </button>
        <Link href={'/profile'}>
          <img src={'/profile.svg'} alt='profile' />
        </Link>
        <Link href={'/favourites'}>
          <img src={'/favourites.svg'} alt='favourites' />
        </Link>
        <button onClick={toggleCartHandler}>
          <img src={'/cart.svg'} alt='cart' />
          <span className={styles.cartQuantity}>{cartQuantity}</span>
        </button>
      </div>
    </header>
  )
}
