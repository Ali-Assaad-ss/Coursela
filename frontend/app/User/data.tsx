import { Button } from '@/components/ui/button'
import React from 'react'

export default function Data({value,setvalue}) {
    console.log(value)
  return (
    <div>
        <Button onClick={()=>setvalue([...value,4])}>click</Button>
    </div>
  )
}
