import React, { FC } from 'react'
import { ButtonStyles as styles } from 'styles/ui'

export enum buttonType {
  default = 'default',
  blue = 'blue',
  gray = 'gray',
  cartActive = 'cartActive'
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
  const secondClass = styles[type]
  return (
    <button
      onClick={clickHandler}
      className={`${styles.button} ${secondClass}`}
    >
      {children}
    </button>
  )
}
