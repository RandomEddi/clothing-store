export const EnumItemCategoryObject = {
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

export type ItemCategoryType = keyof typeof EnumItemCategoryObject
