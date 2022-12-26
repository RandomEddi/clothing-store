import React, { FC } from 'react'
import { ButtonStyles as styles } from 'styles/ui'

interface Props {
  children: React.ReactNode
  clickHandler?: () => unknown
}

export const Button: FC<Props> = ({ children, clickHandler }: Props) => {
  return (
    <button onClick={clickHandler} className={styles.button}>
      {children}
    </button>
  )
}
