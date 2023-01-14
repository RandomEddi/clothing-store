import React, { ChangeEvent, FC } from 'react'
import { CheckBoxStyles as styles } from 'styles/ui'

interface Props {
  title: string
  isChecked: boolean
  onChangeCheckBox: (e: ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

export const CheckBox: FC<Props> = (props) => {
  const { isChecked, onChangeCheckBox, title, children } = props
  return (
    <div className={styles.checkbox}>
      <input
        id={title}
        type='checkbox'
        value={title}
        checked={isChecked}
        onChange={onChangeCheckBox}
      />
      {children}
    </div>
  )
}
