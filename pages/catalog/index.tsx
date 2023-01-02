import React, { useState, ChangeEvent, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button, buttonType, PagePath, SortCheckFilter } from 'components/ui'
import { CatalogPageStyles as styles } from 'styles/pages'
import { sortItems, isSortItem, ICheckBox } from 'types'

type PriceType = '' | number
interface IPriceFilter {
  to: PriceType
  from: PriceType
}

const DUMMY_CATEGORY_CHECKBOXES: ICheckBox[] = [
  { title: 'Платья', isChecked: false },
  { title: 'Юбки', isChecked: false },
  { title: 'Блузки', isChecked: false },
  { title: 'Футболки, топы', isChecked: false },
  { title: 'Худи, свитшоты', isChecked: false },
  { title: 'Жакеты, жилеты', isChecked: false },
  { title: 'Брюки, шорты', isChecked: false },
  { title: 'Джинсы', isChecked: false },
  { title: 'Комбинезоны', isChecked: false },
  { title: 'Спортивные костюмы', isChecked: false },
  { title: 'Пальто, плащи, куртки', isChecked: false }
]

const DUMMY_COLOR_CHECKBOXES: ICheckBox[] = [
  { title: 'Белый', isChecked: false },
  { title: 'Черный', isChecked: false },
  { title: 'Красный', isChecked: false },
  { title: 'Бежевый', isChecked: false },
  { title: 'Синий', isChecked: false },
  { title: 'Зеленый', isChecked: false },
  { title: 'Принты', isChecked: false }
]

const DUMMY_SIZES_CHECKBOXES: ICheckBox[] = [
  { title: '38 (XXS)', isChecked: false },
  { title: '40 (XS)', isChecked: false },
  { title: '42 (S)', isChecked: false },
  { title: '44 (M)', isChecked: false },
  { title: '46 (L)', isChecked: false },
  { title: '48 (XL)', isChecked: false },
  { title: '50 (XXL)', isChecked: false }
]

export default function catalog() {
  const [sortOption, setSortOption] = useState<sortItems>(sortItems.popularity)
  const [categoryCheckBoxes, setCategoryCheckBoxes] = useState<ICheckBox[]>(
    DUMMY_CATEGORY_CHECKBOXES
  )
  const [colorCheckBoxes, setColorCheckBoxes] = useState<ICheckBox[]>(
    DUMMY_COLOR_CHECKBOXES
  )
  const [sizesCheckBoxes, setSizesCheckBoxes] = useState<ICheckBox[]>(
    DUMMY_SIZES_CHECKBOXES
  )
  const filterPriceFrom = useRef<HTMLInputElement>(null)
  const filterPriceTo = useRef<HTMLInputElement>(null)

  const onChangeSortOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (isSortItem(value)) {
      setSortOption(value)
    }
  }

  const onClearFilter = () => {
    setCategoryCheckBoxes((prev) =>
      prev.map((i) => ({ ...i, isChecked: false }))
    )
    setColorCheckBoxes((prev) => prev.map((i) => ({ ...i, isChecked: false })))
    setSizesCheckBoxes((prev) => prev.map((i) => ({ ...i, isChecked: false })))
    if (filterPriceFrom.current) {
      filterPriceFrom.current.value = ''
    }
    if (filterPriceTo.current) {
      filterPriceTo.current.value = ''
    }
  }

  return (
    <>
      <Head>
        <title>LOYLEN Catalog</title>
        <meta name='description' content='clothes catalog LOYLEN' />
      </Head>
      <div className={`${styles.catalogPage} container`}>
        <h3 className={styles.pageHeader}>Каталог</h3>
        <div className={styles.catalogSort}>
          <div>
            <PagePath section='Каталог' />
          </div>
          <div className={styles.sort}>
            <span>Сортировка</span>
            <select onChange={onChangeSortOption} value={sortOption}>
              <option value={sortItems.popularity}>По популярности</option>
              <option value={sortItems.alphabet}>По алфавиту</option>
              <option value={sortItems.bottomPrice}>По цене (Убывание)</option>
              <option value={sortItems.topPrice}>По цене (Возрастание)</option>
            </select>
          </div>
        </div>
        <div className={styles.catalog}>
          <div className={styles.catalogFilters}>
            <div className={styles.links}>
              <Link href={'/catalog'}>Все категории</Link>
              <Link href={'/catalog/news'}>Новинки</Link>
              <Link href={'/catalog/sale'}>Распродажа</Link>
            </div>
            <div className={styles.categoryFilter}>
              <SortCheckFilter
                checkboxes={categoryCheckBoxes}
                onChangeCheckBoxes={setCategoryCheckBoxes}
              />
            </div>
            <div className={styles.filter}>
              <span>Цвет</span>
              <SortCheckFilter
                checkboxes={colorCheckBoxes}
                onChangeCheckBoxes={setColorCheckBoxes}
              />
            </div>
            <div className={styles.filter}>
              <span>Размер</span>
              <SortCheckFilter
                checkboxes={sizesCheckBoxes}
                onChangeCheckBoxes={setSizesCheckBoxes}
              />
            </div>
            <div className={styles.filter}>
              <span>Цена</span>
              <div className={styles.priceFilter}>
                <span>ОТ</span>
                <input
                  type='number'
                  data-type='from'
                  placeholder='999'
                  ref={filterPriceFrom}
                />
                <span>ДО</span>
                <input
                  type='number'
                  data-type='to'
                  placeholder='20000'
                  ref={filterPriceTo}
                />
              </div>
            </div>
            <Button clickHandler={onClearFilter} type={buttonType.gray}>
              Очистить фильтр
            </Button>
          </div>
          <div className={styles.catalogItems}></div>
        </div>
      </div>
    </>
  )
}
