"use client";
import React, { useState } from 'react'
import Data from './data'

export default function page() {
  const [value,setvalue] = useState([1,2,3])

  return (
  <Data value={value} setvalue={setvalue}></Data>
  )
}
