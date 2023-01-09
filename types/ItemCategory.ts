export const ItemCategoryObject = {
  dress: 'Платья',
  skirts: 'Юбки',
  blouses: 'Блузки',
  tShirts: 'Футболки, Топы',
  hoodie: 'Худи, Свитшоты',
  trousers: 'Брюки, Шорты',
  jeans: 'Джинсы',
  overalls: 'Комбинезоны',
  costumes: 'Спортивные костюмы',
  jackets: 'Пальто, Жакеты, Куртки',
  hat: 'Головные уборы',
  body: 'Боди'
}

export const ItemColorObject = {
  white: 'Белый',
  black: 'Черный',
  red: 'Красный',
  beige: 'Бежевый',
  blue: 'Синий',
  pink: 'Розовый',
  green: 'Зеленый',
  print: 'Принты'
}

export const ItemSizeObject = {
  xxs: '38 (XXS)',
  xs: '40 (XS)',
  s: '42 (S)',
  m: '44 (M)',
  l: '46 (L)',
  xl: '48 (XL)',
  xxl: '50 (XXL)'
}

export type ItemCategoryType = keyof typeof ItemCategoryObject

export type ItemColorType = keyof typeof ItemColorObject

export type ItemSizeType = keyof typeof ItemSizeObject
