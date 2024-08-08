import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import logic from './logic'
import Login from './pages/Login'
import RegisterCustomer from './pages/RegisterCustomer'
import RegisterManager from './pages/RegisterManager'
import Home from './pages/Home'
import HeaderFooter from './pages/HeaderFooter'
import Issues from './pages/Issues'
import IssueWithComments from './pages/IssueWithComments'

const login = "/login"
const register = "/register"
const registerManager = "/register/manager"
const home = "/"
const issue = "/issue"

function App() {
  const navigate = useNavigate()

  const handleUserRegistered = () => navigate(login)

  const handleUserLoggedIn = () => navigate(home)

  const handleLoginButton = () => navigate(login)

  const handleRegisterButton = () => navigate(register)

  const handleLogoutButton = () => navigate(login)

  const handleHomeButton = () => navigate(home)

  const handleIssueButton = () => navigate(issue)

  const handleCommentButton = issueId => navigate(`${issue}/${issueId}`)

  const handleLeftArrowClick = () => navigate(issue)

  return <Routes>
    <Route path={login} element={logic.isUserLoggedIn() ? <Navigate to={home} /> : <Login onUserLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterButton} />} />
    <Route path={register} element={logic.isUserLoggedIn() ? <Navigate to={home} /> : <RegisterCustomer onUserRegistered={handleUserRegistered} onLoginClick={handleLoginButton} />} />
    <Route path={registerManager} element={logic.isUserLoggedIn() ? <Navigate to={home} /> : <RegisterManager onUserRegistered={handleUserRegistered} onLoginClick={handleLoginButton} />} />
    <Route element={<HeaderFooter onHomeClick={handleHomeButton} onIssueClick={handleIssueButton} onLogoutClick={handleLogoutButton} />}>
      <Route path={home} element={logic.isUserLoggedIn() ? <Home /> : <Navigate to={login} />} />
      <Route path={issue} element={logic.isUserLoggedIn() ? <Issues handleCommentButton={handleCommentButton} /> : <Navigate to={login} />} > </Route>
      <Route path={`${issue}/:issueId`} element={logic.isUserLoggedIn() ? <IssueWithComments onLeftArrowClick={handleLeftArrowClick} /> : <Navigate to={login} />} />
    </Route>
  </Routes>

}

export default App
