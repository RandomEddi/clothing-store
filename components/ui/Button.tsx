import React, { FC } from 'react'
import { ButtonStyles as styles } from 'styles/ui'

export type buttonType = 'default' | 'blue' | 'gray' | 'cartActive'

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
    type = 'default',
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
