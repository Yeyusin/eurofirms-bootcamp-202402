import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

const login = "/login"
const register = "/register"
const home = "/"

function App() {
  const navigate = useNavigate()

  const handleUserRegisted = () => navigate(login)

  const handleUserLoggedIn = () => navigate(home)

  const handleLoginButton = () => navigate(login)

  const handleRegisterButton = () => navigate(register)

  const handleLogoutButton = () => navigate(login)

  return <Routes>

  </Routes>

}

export default App
