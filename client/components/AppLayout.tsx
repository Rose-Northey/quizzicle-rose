import { Link, Outlet } from 'react-router-dom'

import Header from './Header.tsx'

export default function AppLayout() {
  return (
    <>
      <Header />
      <nav>
        <Link to="create">Create a quiz</Link>
      </nav>
      <hr></hr>
      <main>
        <Outlet />
      </main>
    </>
  )
}
