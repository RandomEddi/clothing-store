import React, { FC } from 'react'
import { Button, FooterList } from 'components/ui'
import { FooterStyles as styles } from 'styles'
import { ILink } from 'types'

interface IFooterList {
  mainLink: string
  links: ILink[]
}
//TODO: Сделать линки

const catalogLinks: IFooterList = {
  mainLink: 'Каталог',
  links: [
    { name: 'Новинки', url: '/catalog/news' },
    { name: 'Распродажа', url: '/catalog/sale' },
    { name: 'Готовые образы', url: '/catalog/ready-made' },
    { name: 'Все товары', url: '/catalog' }
  ]
}
const buyersLinks: IFooterList = {
  mainLink: 'Покупателям',
  links: [
    { name: 'Личный кабинет', url: '/profile' },
    { name: 'Таблица размеров', url: '/info/sizes' },
    { name: 'Доставка и оплата', url: '/info/delivery' },
    { name: 'Возврат', url: '/info/refund' }
  ]
}
const aboutLinks: IFooterList = {
  mainLink: 'О нас',
  links: [
    { name: 'О бренде', url: '/about' },
    { name: 'Контакты', url: '/about/contacts' },
    { name: 'Оферта', url: '/about/offer' },
    { name: 'Политика конфиденциальности', url: '/about/policy' }
  ]
}

export const Footer: FC = () => {
  return (
    <footer className={`${styles.footer} container`}>
      <div className={styles.leftSide}>
        <img src='/footerlogo.svg' alt='footer logo' />
        <div className={styles.footerFeedback}>
          <p>Нужна помощь с заказом?</p>
          <a href='tel:+79647059464'>+ 7 964 705 94 64</a>
          <a href='mailto:info@loylen.com'>info@loylen.com</a>
        </div>
        <div className={styles.footerAbout}>
          <p>2021 Интернет-магазин LOYLEN</p>
          <p>Все права защищены</p>
          <p>Разработка дизайна</p>
        </div>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.mailing}>
          <p>
            Подпишитесь на рассылку и первыми получайте информацию о новинках,
            скидках и специальных предложениях
          </p>
          <form className={styles.mailingForm}>
            <input placeholder='Введите ваш E-mail' type='email' required />
            <Button type='gray'>подписаться</Button>
            <div className={styles.underLine}></div>
          </form>
        </div>
        <div className={styles.footerNav}>
          <FooterList
            links={catalogLinks.links}
            mainLink={catalogLinks.mainLink}
          />
          <FooterList
            links={buyersLinks.links}
            mainLink={buyersLinks.mainLink}
          />
          <FooterList links={aboutLinks.links} mainLink={aboutLinks.mainLink} />
        </div>
      </div>
    </footer>
  )
}
