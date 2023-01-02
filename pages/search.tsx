import React, { FC } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useAppSelector } from 'hooks/useAppSelector'
import { CatalogItem } from 'components'
import { Button } from 'components/ui'
import { SearchPageStyles as styles } from 'styles/pages'

const search: FC = () => {
  const router = useRouter()
  const searchQuery = router.query.query
  const items = useAppSelector((state) => state.items.items)
  const itemsBySearch = items.filter((i) => {
    if (
      !Array.isArray(searchQuery) &&
      (i.title.toLowerCase().includes(`${searchQuery}`.toLowerCase()) ||
        String(i.articul) === `${searchQuery}`)
    ) {
      return i
    }
  })
  return (
    <>
      <Head>
        <title>LOYLEN Search</title>
        <meta name='description' content='Search page LOYLEN' />
      </Head>
      <div className={`${styles.seachResult} container`}>
        {itemsBySearch.length === 0 ? (
          <div className={styles.itemsEmpty}>
            <p>ПО ЗАПРОСУ «{searchQuery}» НИЧЕГО НЕ НАЙДЕНО</p>
            <Link href={'/catalog'}>
              <Button>в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.resultItems}>
            <p>ТОВАРЫ ПО ЗАПРОСУ «{searchQuery}» </p>
            <div>
              {itemsBySearch.map((item) => (
                <CatalogItem {...item} height={420} width={290} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default search
