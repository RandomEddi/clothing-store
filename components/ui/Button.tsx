import React, { FC } from 'react'
import { ButtonStyles as styles } from 'styles/ui'

interface Props {
  children: React.ReactNode
  clickHandler?: () => unknown
  classes?: string
}

export const Button: FC<Props> = ({
  children,
  clickHandler,
  classes
}: Props) => {
  let btnClasses = styles.button
  if (classes) {
    btnClasses += ` ${classes}`
  }
  return (
    <button onClick={clickHandler} className={btnClasses}>
      {children}
    </button>
  )
}
