import React, { FC } from 'react'
import { PagePathStyles as styles } from 'styles/ui'

interface Props {
  section: string
  category?: string
  title?: string
}

export const PagePath: FC<Props> = (props) => {
  const { section, category, title } = props
  return (
    <p className={styles.path}>
      Главная
      <span className={styles.delimiter}>/</span>
      {category ? section : <span className={styles.big}>{section}</span>}
      {category && (
        <>
          <span className={styles.delimiter}>/</span>
          {title ? category : <span className={styles.big}>{category}</span>}
        </>
      )}
      {title && (
        <>
          <span className={styles.delimiter}>/</span>
          <span className={styles.big}>{title}</span>
        </>
      )}
    </p>
  )
}
