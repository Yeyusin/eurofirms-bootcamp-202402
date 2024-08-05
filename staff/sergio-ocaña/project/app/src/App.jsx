import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import logic from './logic'
import Login from './pages/Login'
import RegisterCustomer from './pages/RegisterCustomer'
import RegisterManager from './pages/RegisterManager'
import Home from './pages/Home'
import RouteFooter from './pages/RouteFooter'
import Issue from './pages/Issue'

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

  return <Routes>
    <Route path={login} element={logic.isUserLoggedIn() ? <Navigate to={home} /> : <Login onUserLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterButton} />} />
    <Route path={register} element={logic.isUserLoggedIn() ? <Navigate to={home} /> : <RegisterCustomer onUserRegistered={handleUserRegistered} onLoginClick={handleLoginButton} />} />
    <Route path={registerManager} element={logic.isUserLoggedIn() ? <Navigate to={home} /> : <RegisterManager onUserRegistered={handleUserRegistered} onLoginClick={handleLoginButton} />} />
    <Route element={<RouteFooter onHomeClick={handleHomeButton} />}>
      <Route path={home} element={logic.isUserLoggedIn() ? <Home onLogoutClick={handleLogoutButton} /> : <Navigate to={login} />} />
      <Route path={issue} element={logic.isUserLoggedIn() ? <Issues onLogoutClick={handleLogoutButton} /> : <Navigate to={login} />} />
    </Route>
  </Routes>

}

export default App
