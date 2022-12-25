import Link from 'next/link'
import React, { FC } from 'react'
import { FooterListStyles as styles } from 'styles/ui'
import { ILink } from 'types'

interface Props {
  mainLink: string
  links: ILink[]
}

export const FooterList: FC<Props> = (props) => {
  const { links, mainLink } = props
  return (
    <div className={styles.footerList}>
      <div className={styles.mainLink}>{mainLink}</div>
      <ul>
        {links.map((link) => (
          <li key={link.name} className={styles.secondaryLink}>
            <Link href={link.url}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
