import React from 'react'
import { UserTable } from './users'

export default function page() {
  return (
    <div className='p-10'>
      <h1 className="text-2xl font-bold">Users</h1>
      <UserTable/>
      </div>
    
  )
}
