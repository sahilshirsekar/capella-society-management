'use client'
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

const UserAccountHeader = () => {
  return (
 
      <Button onClick={() => signOut({
        redirect: true,
        callbackUrl : `${window.location.origin}/signin`
      })} 
      variant={'destructive'}>Log Out</Button>
    
  )
}

export default UserAccountHeader
