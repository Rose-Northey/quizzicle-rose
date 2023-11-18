import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { AuthGroup, NavButton, HeaderStyle } from './Styled.tsx'
import { Link } from 'react-router-dom'

function Header() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const user = {
    nickname: 'john.doe',
  }

  const handleSignOut = () => {
    console.log('sign out')
  }

  const handleSignIn = () => {
    console.log('sign in')
  }

  return (
    <HeaderStyle>
      <div>
        <h1>
          <Link to="/">Quizzicle</Link>
        </h1>
        <AuthGroup>
          <IfAuthenticated>
            {user && <p>Welcome, {user?.nickname}</p>}
            <NavButton $btnColor="olive" onClick={handleSignOut}>
              Sign out
            </NavButton>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <NavButton $btnColor="cream" onClick={handleSignIn}>
              Sign in
            </NavButton>
          </IfNotAuthenticated>
        </AuthGroup>
      </div>
    </HeaderStyle>
  )
}

export default Header
