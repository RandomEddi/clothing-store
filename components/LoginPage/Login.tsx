import React, { FC, useState, FormEvent } from 'react'
import { Button, Input } from 'components/ui'
import { LoginPageStyles as styles } from 'styles/pages'
import Image from 'next/image'
import { logIn } from '.firebase/login'

export const Login: FC = () => {
  const [loginEmail, setLoginEmail] = useState<string>('')
  const [loginPassword, setLoginPassword] = useState<string>('')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await logIn(loginEmail, loginPassword)
    console.log(res)

    if (typeof res === 'string') {
      setLoginError(res)
    } else {
      setLoginError(null)
    }
  }

  return (
    <div className={styles.login}>
      <p className={styles.header}>войти</p>
      <form onSubmit={onLoginSubmit}>
        <Input
          setValue={(str) => setLoginEmail(str)}
          value={loginEmail}
          type='email'
          placeholder='Электронная почта'
        />
        <Input
          setValue={(str) => setLoginPassword(str)}
          value={loginPassword}
          type={!isPasswordVisible ? 'password' : 'text'}
          placeholder='Пароль'
        >
          <button onClick={() => setIsPasswordVisible((prev) => !prev)}>
            <Image
              src={
                isPasswordVisible
                  ? '/visible-password.svg'
                  : '/unvisible-password.svg'
              }
              alt='change password visibility'
              width={19.23}
              height={15}
            />
          </button>
        </Input>
        {loginError && (
          <p className={styles.error}>
            Что-то пошло не так, повторите попытку
          </p>
        )}
        <Button>Войти</Button>
      </form>
    </div>
  )
}
