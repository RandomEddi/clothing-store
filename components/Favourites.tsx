import React, { FC } from 'react'
import { cartActions, favouritesActions } from 'store//slices'
import { useAppDispatch, useAppSelector } from 'hooks'
import { FavouritesStyles as styles } from 'styles'
import Link from 'next/link'
import { FavouritesItem } from './ui/FavouritesItem'

export const Favourites: FC = () => {
  const favouritesCtx = useAppSelector((state) => state.favouritesReducer)
  const dispatch = useAppDispatch()

  const toggleFavouritesHandler = () => {
    dispatch(favouritesActions.toggleFavourites())
  }

  return (
    <div
      className={`${styles.favourites} ${
        favouritesCtx.favouritesIsOpen ? ` ${styles.active}` : ''
      }`}
    >
      <div className={styles.favouritesTop}>
        <span>Избранные товары</span>
        <button onClick={toggleFavouritesHandler}>
          <span className={styles.close}>закрыть</span>
        </button>
      </div>
      {favouritesCtx.items.length > 0 ? (
        <div className={styles.favouritesList}>
          {favouritesCtx.items.map((fav) => (
            <FavouritesItem {...fav} height={285} width={189} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyFavourites}>Нету избранных</div>
      )}
      <Link
        onClick={() => {
          dispatch(favouritesActions.closeFavourites())
        }}
        className={styles.favouritesLink}
        href={'/favourites'}
      >
        перейти в избранное
      </Link>
    </div>
  )
}
