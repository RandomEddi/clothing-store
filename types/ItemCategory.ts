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
  '38': '38 (XXS)',
  '40': '40 (XS)',
  '42': '42 (S)',
  '44': '44 (M)',
  '46': '46 (L)',
  '48': '48 (XL)',
  '50': '50 (XXL)'
}

export type ItemCategoryType = keyof typeof ItemCategoryObject

export type ItemColorType = keyof typeof ItemColorObject

export type ItemSizeType = keyof typeof ItemSizeObject
