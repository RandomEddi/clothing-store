import React, { FC, useState, ChangeEvent, MouseEvent, useEffect } from 'react'
import { HeaderStyles as styles } from 'styles'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from 'hooks'
import { cartActions, favouritesActions } from 'store//slices'
import { HeaderList } from 'components/ui'
import { ILink } from 'types'
import { useRouter } from 'next/router'

const catalogLinks: ILink[] = [
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
const infoLinks: ILink[] = [
  { name: 'Контакты', url: '/info/contacts' },
  { name: 'Таблица размеров', url: '/info/sizes' },
  { name: 'Доставка и оплата', url: '/info/delivery' },
  { name: 'Возврат', url: '/info/refund' }
]

export const Header: FC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [searchIsActive, setSearchIsActive] = useState<boolean>(false)
  const cartQuantity = useAppSelector((state) => state.cartReducer.quantity)
  const [searchValue, setSearchValue] = useState<string>('')

  const toggleCartHandler = () => {
    dispatch(favouritesActions.closeFavourites())
    dispatch(cartActions.toggleCart())
  }

  const toggleFavouritesHandler = () => {
    dispatch(cartActions.closeCart())
    dispatch(favouritesActions.toggleFavourites())
  }

  const onOpenSearchHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSearchIsActive((prev) => !prev)
  }

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        router.push(`/search?query=${searchValue}`)
      }
    }

    if (searchIsActive) {
      document.addEventListener('keydown', keyDownHandler)
    }

    return () => document.removeEventListener('keydown', keyDownHandler)
  }, [searchIsActive, searchValue])

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
        <div className={styles.headerSearch}>
          <input
            placeholder='Поиск'
            value={searchValue}
            className={`${styles.searchInput}${
              searchIsActive ? ` ${styles.active}` : ''
            }`}
            onChange={onChangeSearchInput}
            type='text'
          />
          <button onClick={onOpenSearchHandler}>
            {searchIsActive ? (
              <img src={'/close.svg'} alt='search' />
            ) : (
              <img src={'/search.svg'} alt='search' />
            )}
          </button>
        </div>
        <Link href={'/profile'}>
          <img src={'/profile.svg'} alt='profile' />
        </Link>
        <button onClick={toggleFavouritesHandler}>
          <img src={'/favourites.svg'} alt='favourites' />
        </button>
        <button onClick={toggleCartHandler}>
          <img src={'/cart.svg'} alt='cart' />
          <span className={styles.cartQuantity}>{cartQuantity}</span>
        </button>
      </div>
    </header>
  )
}
