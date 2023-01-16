import React, { FC, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAppSelector } from 'hooks/useAppSelector'
import { Button } from 'components/ui'
import { logOut } from '.firebase/login'

const index: FC = () => {
  const profile = useAppSelector((state) => state.profileReducer)
  const router = useRouter()

  useEffect(() => {
    if (!router) return

    if (!profile.isLogged) {
      router.push('/login')
    }
  }, [router, profile])
  
  const onLogOut = () => {
    logOut()
  }

  return (
    <div>
      <Button clickHandler={onLogOut}>Выйти</Button>
      {profile.userData.email}
    </div>
  )
}

export default index
