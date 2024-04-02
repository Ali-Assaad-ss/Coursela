import NavBar from '@/components/component/navbar/Navbar'
import React from 'react'

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar/>
      {children}
    </>
  )
}

