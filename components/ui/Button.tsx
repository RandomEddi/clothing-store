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
  style?: React.CSSProperties
}

export const Button: FC<Props> = (props: Props) => {
  const {
    children,
    clickHandler,
    type = buttonType.default,
    style = {}
  } = props
  const secondClass = styles[type]
  return (
    <button
      onClick={clickHandler}
      className={`${styles.button} ${secondClass}`}
      style={style}
    >
      {children}
    </button>
  )
}
