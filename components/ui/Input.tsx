import React, {
  Dispatch,
  FC,
  HTMLInputTypeAttribute,
  SetStateAction,
  ChangeEvent
} from 'react'
import { InputStyles as styles } from 'styles/ui'

interface Props {
  placeholder: string
  type: HTMLInputTypeAttribute
  id?: string
  children?: React.ReactNode
  required?: boolean
  value: string
  setValue: (string: string) => void
  pattern?: string
  title?: string
}

export const Input: FC<Props> = (props) => {
  const { placeholder, required, children, type, id, setValue, value,pattern, title } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={styles.input}>
      <input
        required={!!required}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChangeHandler}
        id={id}
        pattern={pattern}
        title={title}
      />
      {children}
    </div>
  )
}
