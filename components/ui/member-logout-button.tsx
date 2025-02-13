'use client'
import React from 'react'
import { Button } from './button'
import { signOut } from 'next-auth/react'

const LogOutButton = () => {
  return (
 
      <button onClick={() => signOut({
        redirect: true,
        callbackUrl : `${window.location.origin}/member/login`
      })} 
      >Log Out</button>
    
  )
}

export default LogOutButton
