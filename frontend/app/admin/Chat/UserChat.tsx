import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

export default function UserChat(props:any) {
  return (
    <div className={`flex align-middle ${props.className}`}>
            <Avatar className="ml-2 mr-3 my-1">
              <AvatarImage src={props.image} />
            </Avatar>
            <div className="flex justify-between flex-1"><p className="flex items-center">{props.name}</p><p className="flex items-center mr-3">{props.unread}</p></div>
          </div>
  )
}
