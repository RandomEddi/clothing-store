import React, { FC } from 'react'
import styles from 'styles/Header.module.scss'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from 'hooks'
import { cartActions } from 'store//slices/cartSlice'
import { HeaderList } from 'components/ui'
import { IHeaderLink } from 'types'
const catalogLinks: IHeaderLink[] = [
  { name: 'Платья', url: '/catalog/dresses' },
  { name: 'Юбки', url: '/catalog/skirts' },
  { name: 'Блузки', url: '/catalog/blouses' },
  { name: 'Футболки, топы', url: '/catalog/tops' },
  { name: 'Худи, свитшоты', url: '/catalog/sweatshirts' },
  { name: 'Жакеты, жилеты', url: '/catalog/jackets' },
  { name: 'Брюки, шорты', url: '/catalog/trousers' },
  { name: 'Джинсы', url: '/catalog/jeans' },
  { name: 'Комбинезоны', url: '/catalog/overalls' },
  { name: 'Спортивные костюмы', url: '/catalog/tracksuits' },
  { name: 'Пальто, плащи, куртки', url: '/catalog/jackets' }
]
const infoLinks: IHeaderLink[] = [
  { name: 'Контакты', url: '/info/contacts' },
  { name: 'Таблица размеров', url: '/info/sizes' },
  { name: 'Доставка и оплата', url: '/info/delivery ' },
  { name: 'Возврат', url: '/info/refund' }
]

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
            <HeaderList links={catalogLinks}>
              <Link href={'/catalog'}>Каталог</Link>
            </HeaderList>
          </li>
          <li>
            <Link href={'/lookbook'}>lookbook</Link>
          </li>
          <li>
            <Link href={'/brand'}>О бренде</Link>
          </li>
          <li>
            <HeaderList links={infoLinks}>
              <Link href={'/info'}>информация</Link>
            </HeaderList>
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
