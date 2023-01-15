import React, { FC } from 'react'
import { LoginPageStyles as styles } from 'styles/pages'
import { Registration, Login } from 'components/LoginPage'

const login: FC = () => {
  return (
    <div className={`${styles.loginPage} container`}>
      <Registration />
      <Login />
    </div>
  )
}

export default login
