import React, { FC } from 'react'
import { LoginPageStyles as styles } from 'styles/pages'
import { Registration } from 'components/LoginPage'

const login: FC = () => {
  return (
    <div className={`${styles.loginPage} container`}>
      <Registration />
      <div className={styles.login}>
        <p className={styles.header}>войти</p>
      </div>
    </div>
  )
}

export default login
