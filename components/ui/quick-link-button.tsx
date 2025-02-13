'use client'

import { Button } from "./button"

export const QuickLinkButton = ({label, icon, onClick} : any) => 
  {
  
  return (
    <Button onClick={onClick} className="bg-customBg hover:bg-hoverBg">
      <span>{icon}</span>
      <span>{label}</span>
    </Button>
  
  )
}