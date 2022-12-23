import Link from 'next/link'
import React, { FC, useState } from 'react'
import styles from 'styles/HeaderList.module.scss'
import { IHeaderLink } from 'types'

interface Props {
  links: IHeaderLink[]
  children: React.ReactNode
}

export const HeaderList: FC<Props> = (props) => {
  const { children, links } = props
  const [isHovered, setIsHovered] = useState<boolean>(false)
  return (
    <>
      <div
        className={styles.headerWrapper}
        onMouseLeave={() => setIsHovered(false)}
        onMouseOver={() => setIsHovered(true)}
      >
        {children}
        {isHovered && (
          <div className={styles.headerList}>
            <ul>
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.url}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
