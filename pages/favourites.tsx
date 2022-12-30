import React, { FC } from 'react'
import Head from 'next/head'
import { FavouritesPageStyles as styles } from 'styles/pages'
import { useAppSelector } from 'hooks/useAppSelector'
import { FavouritesItem } from 'components/ui/FavouritesItem'
import Link from 'next/link'
import { Button } from 'components/ui'

const favourites: FC = () => {
  const favouritesItems = useAppSelector((state) => state.favourites.items)
  return (
    <>
      <div className={`${styles.favouritesPage} container`}>
        <p className={styles.path}>
          Главная<span className={styles.delimiter}>/</span>
          <span className={styles.big}>Избранные товары</span>
        </p>
        <h4 className={styles.favouriteTitle}>ЛЮБИМЫЕ ТОВАРЫ</h4>
        {favouritesItems.length > 0 ? (
          <div className={styles.favouritesItems}>
            {favouritesItems.map((fav) => (
              <FavouritesItem
                articul={fav.articul}
                color={fav.color}
                id={fav.id}
                img={fav.img}
                price={fav.price}
                sizes={fav.sizes}
                title={fav.title}
                priceWithDiscount={fav.priceWithDiscount}
                key={fav.id}
                height={419}
                width={298}
                category={fav.category}
                structure={fav.structure}
              />
            ))}
          </div>
        ) : (
          <div className={styles.favoruitesEmpty}>
            <p>Вы еще не добавили ни один товар в избранное</p>
            <Link href={'/catalog'}>
              <Button>В каталог</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default favourites
