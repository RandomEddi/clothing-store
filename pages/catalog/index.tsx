import React, { useState, ChangeEvent, useEffect, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
  Button,
  buttonType,
  CatalogItem,
  PagePath,
  SortCheckFilter
} from 'components/ui'
import { CatalogPageStyles as styles } from 'styles/pages'
import {
  sortItems,
  isSortItem,
  ICheckBox,
  IItem,
  ItemCategoryObject,
  ItemCategoryType,
  ItemColorObject,
  ItemColorType,
  ItemSizeType,
  ItemSizeObject,
  ICatalogQueryParams
} from 'types'
import { getItems } from 'api/items'
import { shuffleArray } from 'utils/shuffleArray'

const DUMMY_CATEGORY_CHECKBOXES: ICheckBox[] = Object.keys(
  ItemCategoryObject
).map((i) => {
  return {
    title: ItemCategoryObject[i as ItemCategoryType],
    isChecked: false,
    param: i as ItemCategoryType
  }
})

const DUMMY_COLOR_CHECKBOXES: ICheckBox[] = Object.keys(ItemColorObject).map(
  (i) => {
    return {
      title: ItemColorObject[i as ItemColorType],
      isChecked: false,
      param: i as ItemColorType
    }
  }
)

const DUMMY_SIZES_CHECKBOXES: ICheckBox[] = Object.keys(ItemSizeObject).map(
  (i) => {
    return {
      title: ItemSizeObject[i as ItemSizeType],
      isChecked: false,
      param: i as ItemSizeType
    }
  }
)

export default function catalog() {
  const [catalogItems, setCatalogItems] = useState<IItem[]>([])
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
  const [filterPriceFrom, setFilterPriceFrom] = useState<number | ''>('')
  const [filterPriceTo, setFilterPriceTo] = useState<number | ''>('')

  const arrayOfCheckedCategoryes = useMemo(
    () =>
      categoryCheckBoxes
        .map((i) => (i.isChecked ? i.param : ''))
        .filter((i) => (i ? i : '')),
    [categoryCheckBoxes]
  )

  const arrayOfCheckedColors = useMemo(
    () =>
      colorCheckBoxes
        .map((i) => (i.isChecked ? i.param : ''))
        .filter((i) => (i ? i : '')),
    [colorCheckBoxes]
  )

  const arrayOfCheckedSizes = useMemo(
    () =>
      sizesCheckBoxes
        .map((i) => (i.isChecked ? i.param : ''))
        .filter((i) => (i ? i : '')),
    [sizesCheckBoxes]
  )

  const onChangeSortOption = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (isSortItem(value)) {
      if (value === sortItems.popularity) {
        setCatalogItems((prev) => prev.sort((i, j) => i.articul - j.articul))
      }
      if (value === sortItems.alphabet) {
        setCatalogItems((prev) =>
          prev.sort((i, j) => i.title.localeCompare(j.title))
        )
      }
      if (value === sortItems.topPrice || value === sortItems.bottomPrice) {
        setCatalogItems((prev) => {
          const sortedArray = prev.sort((i, j) => {
            if (i.priceWithDiscount && j.priceWithDiscount) {
              return i.priceWithDiscount - j.priceWithDiscount
            } else if (i.priceWithDiscount && !j.priceWithDiscount) {
              return i.priceWithDiscount - j.price
            } else if (!i.priceWithDiscount && j.priceWithDiscount) {
              return i.price - j.priceWithDiscount
            } else {
              return i.price - j.price
            }
          })

          return value === sortItems.topPrice
            ? sortedArray
            : sortedArray.reverse()
        })
      }

      if (value === sortItems.bottomPrice) {
        setCatalogItems((prev) =>
          prev.sort((i, j) => {
            if (j.priceWithDiscount && i.priceWithDiscount) {
              return j.priceWithDiscount - i.priceWithDiscount
            } else if (j.priceWithDiscount && !i.priceWithDiscount) {
              return j.priceWithDiscount - i.price
            } else if (!j.priceWithDiscount && i.priceWithDiscount) {
              return j.price - i.priceWithDiscount
            } else {
              return j.price - i.price
            }
          })
        )
      }

      setSortOption(value)
    }
  }

  const onClearFilter = () => {
    setCategoryCheckBoxes((prev) =>
      prev.map((i) => ({ ...i, isChecked: false }))
    )
    setColorCheckBoxes((prev) => prev.map((i) => ({ ...i, isChecked: false })))
    setSizesCheckBoxes((prev) => prev.map((i) => ({ ...i, isChecked: false })))
    setFilterPriceFrom('')
    setFilterPriceTo('')
  }

  const onChangePriceFrom = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      setFilterPriceFrom(+value)
    } else {
      setFilterPriceFrom('')
    }
  }

  const onChangePriceTo = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value) {
      setFilterPriceTo(+value)
    } else {
      setFilterPriceTo('')
    }
  }

  useEffect(() => {
    const queryParam: ICatalogQueryParams = {}
    filterPriceFrom ? (queryParam.priceFrom = filterPriceFrom.toString()) : ''

    filterPriceTo ? (queryParam.priceTo = filterPriceTo.toString()) : ''

    arrayOfCheckedCategoryes.length
      ? (queryParam.category = arrayOfCheckedCategoryes.join(','))
      : ''
    arrayOfCheckedColors.length
      ? (queryParam.color = arrayOfCheckedColors.join(','))
      : ''
    arrayOfCheckedSizes.length
      ? (queryParam.size = arrayOfCheckedSizes.join(','))
      : ''

    getItems(queryParam).then((data) => {
      setCatalogItems(data.sort((i, j) => i.articul - j.articul))

      setSortOption(sortItems.popularity)
    })
  }, [
    filterPriceFrom,
    filterPriceTo,
    arrayOfCheckedCategoryes,
    arrayOfCheckedColors,
    arrayOfCheckedSizes
  ])

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
                  onChange={onChangePriceFrom}
                  type='number'
                  data-type='from'
                  placeholder='999'
                  value={filterPriceFrom}
                />
                <span>ДО</span>
                <input
                  onChange={onChangePriceTo}
                  type='number'
                  data-type='to'
                  placeholder='20000'
                  value={filterPriceTo}
                />
              </div>
            </div>
            <Button clickHandler={onClearFilter} type={buttonType.gray}>
              Очистить фильтр
            </Button>
          </div>
          {catalogItems.length > 0 ? (
            <div className={styles.catalogItems}>
              {catalogItems.map((item) => (
                <CatalogItem key={item.id} height={420} width={297} {...item} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyCatalog}>
              <p>Не нашли одежду по запросу</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
