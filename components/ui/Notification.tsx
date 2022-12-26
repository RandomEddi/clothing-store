import React, { FC } from 'react'
import { notificationActions } from 'store//slices'
import { useAppDispatch, useAppSelector, useWindowSize } from 'hooks'
import { NotificationStyles as styles } from 'styles/ui'

interface Props {
  text: string
}

export const Notification: FC<Props> = React.memo((props) => {
  const { text } = props
  const dispatch = useAppDispatch()
  const { width } = useWindowSize()
  const notificationIsOpen = useAppSelector(
    (state) => state.notificationReducer.isOpen
  )

  const onCloseNotification = () => {
    dispatch(notificationActions.closeNotification())
  }

  return (
    <>
      {width && width > 768 && notificationIsOpen && (
        <div className={styles.notification}>
          <p>{text}</p>
          <span onClick={onCloseNotification}>
            <img src='/close.svg' />
          </span>
        </div>
      )}
    </>
  )
})
