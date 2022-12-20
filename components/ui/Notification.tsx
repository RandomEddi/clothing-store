import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { notificationActions } from 'store//slices/notificationSlice'
import styles from 'styles/Notification.module.scss'

interface Props {
  text: string
}

export const Notification: FC<Props> = React.memo((props) => {
  const { text } = props
  const dispatch = useAppDispatch()

  const notificationIsOpen = useAppSelector(
    (state) => state.notificationReducer.isOpen
  )

  const onCloseNotification = () => {
    dispatch(notificationActions.closeNotification())
  }

  return (
    <>
      {notificationIsOpen && (
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
