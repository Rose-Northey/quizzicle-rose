import { Outlet } from 'react-router-dom'

import Header from './Header.tsx'

export default function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <h2>Let&apos;s get Quizzicle!</h2>
        <Outlet />
      </main>
    </>
  )
}
