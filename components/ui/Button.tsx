import React, { FC } from 'react'
import { ButtonStyles as styles } from 'styles/ui'

export enum buttonType {
  default = 'default',
  gray = 'gray'
}

interface Props {
  children: React.ReactNode
  clickHandler?: () => unknown
  type?: buttonType
}

export const Button: FC<Props> = ({
  children,
  clickHandler,
  type = buttonType.default
}: Props) => {
  return (
    <button onClick={clickHandler} className={`${styles.button}${type === buttonType.gray ? ` ${styles.gray}` : ''}`}>
      {children}
    </button>
  )
}
