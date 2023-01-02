import React, { Dispatch, FC, SetStateAction, ChangeEvent } from 'react'
import { SortCheckFilterStyles as styles } from 'styles/ui'
import { ICheckBox } from 'types'

interface Props {
  checkboxes: ICheckBox[]
  onChangeCheckBoxes: Dispatch<SetStateAction<ICheckBox[]>>
}

export const SortCheckFilter: FC<Props> = React.memo((props) => {
  const { checkboxes, onChangeCheckBoxes } = props
  const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChangeCheckBoxes((prev) =>
      prev.map((box) => {
        if (box.title === value) {
          box.isChecked = !box.isChecked
        }
        return box
      })
    )
  }
  return (
    <form className={styles.filter}>
      {checkboxes.map((checkbox) => (
        <div key={checkbox.title} className={styles.box}>
          <input
            id={checkbox.title}
            type='checkbox'
            value={checkbox.title}
            checked={checkbox.isChecked}
            onChange={onChangeCheckBox}
          />
          <label htmlFor={checkbox.title}>{checkbox.title}</label>
        </div>
      ))}
    </form>
  )
})
