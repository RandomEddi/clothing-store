import { Input, CheckBox, Button } from 'components/ui'
import Link from 'next/link'
import React, { FC, FormEvent, useReducer, useState } from 'react'
import { LoginPageStyles as styles } from 'styles/pages'
import { signIn } from '.firebase/login'
import { createUserInDatabase } from '.firebase/user'
import Cookies from 'js-cookie'

interface IRegistrationState {
  firstName: string
  lastName: string
  phone: string
  email: string
  pass: string
  repeatPass: string
  policy: boolean
}

enum RegistrationActions {
  changeFirstName = 'changeFirstName',
  changeLastName = 'changeLastName',
  changePhone = 'changePhone',
  changeEmail = 'changeEmail',
  changePass = 'changePass',
  changeRepatPass = 'changeRepatPass',
  changePolicy = 'changePolicy'
}

const registrationInit: IRegistrationState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  pass: '',
  repeatPass: '',
  policy: false
}

interface Action {
  type: RegistrationActions
  payload: string
}

function registrationReducer(state: IRegistrationState, action: Action) {
  switch (action.type) {
    case RegistrationActions.changeFirstName:
      return { ...state, firstName: action.payload }
    case RegistrationActions.changeLastName:
      return { ...state, lastName: action.payload }
    case RegistrationActions.changePhone:
      return { ...state, phone: action.payload }
    case RegistrationActions.changeEmail:
      return { ...state, email: action.payload }
    case RegistrationActions.changePass:
      return { ...state, pass: action.payload }
    case RegistrationActions.changeRepatPass:
      return { ...state, repeatPass: action.payload }
    case RegistrationActions.changePolicy:
      return { ...state, policy: !state.policy }
    default:
      return state
  }
}

export const Registration: FC = () => {
  const [registrationState, registrationDispatch] = useReducer(
    registrationReducer,
    registrationInit
  )
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  )

  const onRegistrationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      registrationState.email &&
      registrationState.firstName &&
      registrationState.lastName &&
      registrationState.phone &&
      registrationState.pass &&
      registrationState.repeatPass &&
      registrationState.policy
    ) {
      setRegistrationError(null)
      const res = await signIn(registrationState.email, registrationState.pass)

      if (typeof res === 'string') {
        if (res.includes('auth/email-already-in-use')) {
          setRegistrationError('?????????? ?????? ????????????????????????????????.')
        } else {
          setRegistrationError('????????????.')
        }
        return
      }

      setRegistrationError(null)

      createUserInDatabase({
        id: res.user.uid,
        email: registrationState.email,
        firstName: registrationState.firstName,
        lastName: registrationState.lastName,
        phone: registrationState.phone
      })

      Cookies.set('refreshToken', res.user.refreshToken, {
        //@ts-ignore
        expires: new Date(Date.now() + res._tokenResponse.expiresIn)
      })

      //@ts-ignore
      Cookies.set('accessToken', res.user.accessToken, {
        //@ts-ignore
        expires: new Date(Date.now() + res._tokenResponse.expiresIn)
      })
    } else {
      setRegistrationError('?????????????????? ????????')
      console.log('?????????????????? ????????')
    }
  }

  return (
    <div className={styles.registration}>
      <p className={styles.header}>????????????????????????????????????</p>
      <form onSubmit={onRegistrationSubmit}>
        <Input
          setValue={(str) =>
            registrationDispatch({
              payload: str,
              type: RegistrationActions.changeFirstName
            })
          }
          value={registrationState.firstName}
          placeholder='??????'
          required
          type='text'
          id='firstName'
        ></Input>
        <Input
          setValue={(str) =>
            registrationDispatch({
              payload: str,
              type: RegistrationActions.changeLastName
            })
          }
          value={registrationState.lastName}
          required
          placeholder='??????????????'
          type='text'
          id='lastName'
        ></Input>
        <Input
          setValue={(str) =>
            registrationDispatch({
              payload: str,
              type: RegistrationActions.changePhone
            })
          }
          value={registrationState.phone}
          required
          placeholder='??????????????'
          type='tel'
          id='phone'
          pattern='^[0-9]{10,12}$'
          title='????????????: 8987654321'
        ></Input>
        <Input
          setValue={(str) =>
            registrationDispatch({
              payload: str,
              type: RegistrationActions.changeEmail
            })
          }
          value={registrationState.email}
          required
          placeholder='?????????????????????? ??????????'
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          title='????????????: test@gmail.com'
          type='email'
          id='email'
        ></Input>
        <Input
          setValue={(str) =>
            registrationDispatch({
              payload: str,
              type: RegistrationActions.changePass
            })
          }
          value={registrationState.pass}
          required
          placeholder='????????????'
          pattern='.{4,}'
          title='???????????? ???????????? ???????? ???? 4 ????????, ????????, ????????????????'
          type='password'
          id='pass'
        ></Input>
        <Input
          setValue={(str) =>
            registrationDispatch({
              payload: str,
              type: RegistrationActions.changeRepatPass
            })
          }
          value={registrationState.repeatPass}
          required
          pattern={registrationState.pass}
          title='???????????? ???????????? ??????????????????'
          placeholder='?????????????????? ????????????'
          type='password'
          id='secondPass'
        ></Input>
        <div className={styles.checkbox}>
          <CheckBox
            isChecked={registrationState.policy}
            title='policy'
            onChangeCheckBox={(e) =>
              registrationDispatch({
                payload: e.target.value,
                type: RegistrationActions.changePolicy
              })
            }
          >
            <label htmlFor='policy'>
              ???????????????????? ??&nbsp;
              <Link href={'/about/policy'}>?????????????????? ????????????????????????????????????</Link>
            </label>
          </CheckBox>
        </div>
        {registrationError && (
          <p className={styles.error}>{registrationError}</p>
        )}
        <Button type='gray'>????????????????????????????????????</Button>
      </form>
    </div>
  )
}
