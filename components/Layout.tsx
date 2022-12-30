import React, { FC, useEffect } from 'react'
import { Footer, Header, Cart, Favourites } from 'components'
import { Notification } from './ui'
import { useAppDispatch } from 'hooks'
import { getItems } from 'api'

interface Props {
  children: React.ReactNode
}

export const Layout: FC<Props> = React.memo(({ children }: Props) => {
  const dispatch = useAppDispatch()
  let initRender: boolean = false
  useEffect(() => {
    //TODO: 2 рендера какого хуя
    if (!initRender) {
      getItems(dispatch)()
    }
    initRender = true
  }, [])
  return (
    <>
      <Notification text='Бесплатная доставка при заказе от 10 000 руб по Москве и Московской области' />
      <Header />
      <main>
        {children}
        <Cart />
        <Favourites />
      </main>
      <Footer />
    </>
  )
})
