import React, { FC } from 'react'
import { Footer, Header, Cart } from 'components'
import { Notification } from './ui'

interface Props {
  children: React.ReactNode
}
export const Layout: FC<Props> = React.memo(({ children }: Props) => {

  return (
    <>
      <Notification text='Бесплатная доставка при заказе от 10 000 руб по Москве и Московской области' />
      <Header />
      <main>
        {children}
        <Cart />
      </main>
      <Footer />
    </>
  )
})
