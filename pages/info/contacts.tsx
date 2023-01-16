import React, { FC } from 'react'
import { ContactsPageStyles as styles } from 'styles/pages'

const contacts: FC = () => {
  return (
    <div className={`${styles.contacts} container`}>
      <div className={styles.header}>контакты</div>
      <span>ИНТЕРНЕТ-МАГАЗИН</span>
      <p>
        Если у вас возникли трудности с оформлением, или вы хотите уточнить
        статус вашего закзаза, вы можете позвонить по номеру +7 964 705 94 64
        или написать нам на почту info@loylen.com
      </p>
      <span>шоурум</span>
      <p>Скоро открытие в Москве</p>
    </div>
  )
}

export default contacts
