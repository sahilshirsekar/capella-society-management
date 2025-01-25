'use client'

import { QuickLinkButton } from "./ui/quick-link-button";

export const QuickLinks = () => {
    
  const quickLinks = [
    { label: 'Create Notice', icon: '📢', action: () => alert('Redirecting to Create Notice...') },
    { label: 'Add Member', icon: '➕', action: () => alert('Redirecting to Add Member...') },
    { label: 'View Reports', icon: '📊', action: () => alert('Redirecting to Reports...') },
  ];
  return (
    <div className="flex flex-wrap gap-4">
            {quickLinks.map((link, index) => (
              <QuickLinkButton key={index} label={link.label} icon={link.icon} onClick={link.action}/>
            ))}
          </div>
  )
}