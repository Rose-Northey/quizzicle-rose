import { Outlet } from 'react-router-dom'

import Header from './Header.tsx'

export default function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <h2>Create a quiz</h2>
        <hr></hr>
        <br></br>
        <Outlet />
      </main>
    </>
  )
}
