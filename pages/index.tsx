import { useState } from 'react'
import Link from 'next/link'
import { CatalogItem } from 'components'
import { Button, buttonType } from 'components/ui'
import { useAppSelector, useWindowSize } from 'hooks'
import { MainPageStyles as styles } from 'styles/pages'
import Image from 'next/image'

export default function Home() {
  const [isCatalogFull, setIsCatalogFull] = useState<boolean>(false)
  const catalogItems = useAppSelector((state) => state.items.items)
  const { width } = useWindowSize()
  const styleToItems = width
    ? { justifyContent: width <= 991 ? 'center' : '' }
    : {}
  const endOfArray = isCatalogFull ? 9 : 4

  return (
    <>
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
      <section className={styles.catalog}>
        <div className={styles.sectionTitle}>
          <h5>КАТАЛОГ</h5>
        </div>
        <div
          className={`container ${styles.catalogItems}`}
          style={styleToItems}
        >
          {catalogItems.slice(0, endOfArray).map((catalItem) => (
            <CatalogItem
              key={catalItem.id}
              id={catalItem.id}
              img={catalItem.img}
              articul={catalItem.articul}
              price={catalItem.price}
              sizes={catalItem.sizes}
              title={catalItem.title}
              color={catalItem.color}
              priceWithDiscount={catalItem.priceWithDiscount}
              category={catalItem.category}
              structure={catalItem.structure}
            />
          ))}
        </div>
        {!isCatalogFull && (
          <div className={styles.catalogBtn}>
            <Button
              type={buttonType.gray}
              clickHandler={() => {
                setIsCatalogFull(true)
              }}
            >
              посмотреть все
            </Button>
          </div>
        )}
      </section>
      <div className='container'>
        <div className={styles.lookbook}>
          <img src='/lookbook-mainPage.png' alt='woman' />
          <div className={styles.lbInfo}>
            <div>
              <h6>LOOKBOOK</h6>
              <p>
                При создании коллекций мы учитываем, чтобы все изделия
                сочетались. Это позволяет подобрать полный образ на все случаи
                жизни
              </p>
              <p>Скидка 10% при покупке полного образа</p>
              <Link href={'/lookbook'}>
                <Button>Смотреть</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className={styles.ourInst}>
          <p>НАШ ИНСТАГРАМ</p>
          <Image
            src={'/items/catalog-items-1_1.jpg'}
            height={200}
            width={300}
            alt='asd'
          ></Image>
          <h4>@loylen_brand</h4>
          <div className={styles.instPhotos}>
            <div className={styles.instPhoto}>
              <img src='/mainPage-inst1.png' alt='photo' />
              <a
                href='https://www.instagram.com/LOYLEN_BRAND'
                className={styles.toInst}
              >
                ПЕРЕЙТИ В ИНСТАГРАМ
              </a>
            </div>
            <div className={styles.instPhoto}>
              <img src='/mainPage-inst2.png' alt='photo' />
              <a
                href='https://www.instagram.com/LOYLEN_BRAND'
                className={styles.toInst}
              >
                ПЕРЕЙТИ В ИНСТАГРАМ
              </a>
            </div>
            <div className={styles.instPhoto}>
              <img src='/mainPage-inst3.png' alt='photo' />
              <a
                href='https://www.instagram.com/LOYLEN_BRAND'
                className={styles.toInst}
              >
                ПЕРЕЙТИ В ИНСТАГРАМ
              </a>
            </div>
            <div className={styles.instPhoto}>
              <img src='/mainPage-inst4.png' alt='photo' />
              <a
                href='https://www.instagram.com/LOYLEN_BRAND'
                className={styles.toInst}
              >
                ПЕРЕЙТИ В ИНСТАГРАМ
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
