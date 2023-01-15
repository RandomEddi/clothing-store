import React, { FC, useState, FormEvent, useEffect } from 'react'
import { Button, Input } from 'components/ui'
import { LoginPageStyles as styles } from 'styles/pages'
import Image from 'next/image'
import { logIn } from '.firebase/login'
import Cookies from 'js-cookie'
import { useAppSelector } from 'hooks/useAppSelector'
import { useRouter } from 'next/router'

export const Login: FC = () => {
  const [loginEmail, setLoginEmail] = useState<string>('')
  const [loginPassword, setLoginPassword] = useState<string>('')
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const isLogged = useAppSelector((state) => state.profileReducer.isLogged)
  const router = useRouter()

  useEffect(() => {
    if (isLogged) {
      router.push('/profile')
    }
  }, [isLogged])


  const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await logIn(loginEmail, loginPassword)

    if (typeof res === 'string') {
      if (res.includes('auth/wrong-password')) {
        setLoginError('Неверный пароль.')
      } else if (res.includes('auth/user-not-found')) {
        setLoginError('Не существующая почта.')
      } else {
        setLoginError('Ошибка.')
      }
      return
    }

    //@ts-ignore
    Cookies.set('accessToken', res.user.accessToken, {
      //@ts-ignore
      expires: new Date(Date.now() + res._tokenResponse.expiresIn)
    })

    Cookies.set('refreshToken', res.user.refreshToken, {
      //@ts-ignore
      expires: new Date(Date.now() + res._tokenResponse.expiresIn)
    })

    setLoginError(null)
    return
  }

  return (
    <div className={styles.login}>
      <p className={styles.header}>войти</p>
      <form onSubmit={onLoginSubmit}>
        <Input
          required
          setValue={(str) => setLoginEmail(str)}
          value={loginEmail}
          type='email'
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          title='ПРИМЕР: test@gmail.com'
          placeholder='Электронная почта'
        />
        <Input
          required
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
        {loginError && <p className={styles.error}>{loginError}</p>}
        <Button>Войти</Button>
      </form>
    </div>
  )
}
