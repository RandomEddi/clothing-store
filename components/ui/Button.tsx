import React, { FC } from 'react'
import styles from 'styles/Button.module.scss'

interface Props {
  children: string
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
