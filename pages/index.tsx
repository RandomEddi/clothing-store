import Head from 'next/head'
import { Button } from 'components/ui'
import styles from 'styles/Main.module.scss'
import { ICatalogItem } from 'types'
import { CatalogItem } from 'components/CatalogItem/CatalogItem'
import { useWindowSize } from 'hooks'

const DUMMY_CATALOGITEMS: ICatalogItem[] = [
  {
    id: 1,
    img: '/catalog-item-1.png',
    price: 5000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Бомбер',
    articul: 134
  },
  {
    id: 2,
    img: '/catalog-item-2.png',
    price: 4000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Кожаная куртка',
    articul: 134
  },
  {
    id: 3,
    img: '/catalog-item-3.png',
    price: 12000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Тренч',
    articul: 134
  },
  {
    id: 4,
    img: '/catalog-item-4.png',
    price: 5000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Рубашка',
    priceWithDiscount: 4500,
    articul: 134
  },
  {
    id: 5,
    img: '/catalog-item-5.png',
    price: 8000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Платье',
    articul: 134
  },
  {
    id: 6,
    img: '/catalog-item-6.png',
    price: 5000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Домашний комплект',
    priceWithDiscount: 4500,
    articul: 134
  },
  {
    id: 7,
    img: '/catalog-item-7.png',
    price: 3000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Базовая водолазка',
    articul: 134
  },
  {
    id: 8,
    img: '/catalog-item-8.png',
    price: 12000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Базовая футболка',
    articul: 134
  },
  {
    id: 9,
    img: '/catalog-item-9.png',
    price: 5000,
    sizes: [40, 42, 44, 46, 48],
    title: 'Классические брюки',
    articul: 134
  }
]

export default function Home() {
  const { width } = useWindowSize()
  const styleToItems = width
    ? {
        justifyContent: width <= 991 ? 'center' : ''
      }
    : {}
  console.log('asd')
  return (
    <>
      <Head>
        <title>LOYLEN</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.mainHeader}>
        <div className={styles.bigHeader}>
          <img src='/main-header-1.png' alt='woman' />
          <div>
            <p>ОСЕНЬ 2021</p>
            <Button>ОСЕНЬ 2021</Button>
          </div>
        </div>
        <div className={styles.mdHeaders}>
          <div className={styles.mdHeader}>
            <div>
              <p>НОВИНКИ</p>
              <Button>СМОТРЕТЬ</Button>
            </div>
          </div>
          <div className={styles.mdHeader}>
            <div>
              <p>РАСПРОДАЖА</p>
              <Button>СМОТРЕТЬ</Button>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className={styles.sectionTitle}>
          <h5>КАТАЛОГ</h5>
        </div>
        <div
          className={`container ${styles.catalogItems}`}
          style={styleToItems}
        >
          {DUMMY_CATALOGITEMS.map((catalItem) => (
            <CatalogItem
              key={catalItem.id}
              id={catalItem.id}
              img={catalItem.img}
              articul={catalItem.articul}
              price={catalItem.price}
              sizes={catalItem.sizes}
              title={catalItem.title}
            />
          ))}
        </div>
      </section>
    </>
  )
}
