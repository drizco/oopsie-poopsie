import React from 'react'
import type { ReactNode } from 'react'
import Header from './Header'
// import InviteModal from "./InviteModal";

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      {/* <InviteModal /> */}
    </>
  )
}

export default Layout
