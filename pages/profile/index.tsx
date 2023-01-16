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

  return <div>
    <Button clickHandler={logOut}>Выйти</Button>
    {profile.userData.email}</div>
}

export default index
