import React, { FC, FormEvent, useState } from 'react'
import { RecoveryPageStyles as styles } from 'styles/pages'
import { Button, Input } from 'components/ui'
import { passwordRecovery } from '.firebase/login'

const recovery: FC = () => {
  const [emailToRecovery, setEmailToRecovery] = useState<string>('')

  const onSubmitRecovery = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    passwordRecovery(emailToRecovery)
  }

  return (
    <div className={`${styles.recovery} container`}>
      <p>Введите почту</p>
      <form onSubmit={onSubmitRecovery}>
        <Input
          type='email'
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          title='ПРИМЕР: test@gmail.com'
          setValue={(str) => setEmailToRecovery(str)}
          value={emailToRecovery}
          placeholder='Электронная почта'
        />
        <Button>восстановить пароль</Button>
      </form>
    </div>
  )
}

export default recovery
