import logic from './logic'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { loginRoute, registerRoute, registerManagerRoute, homeRoute, issueRoute, ticketRoute, generateTicketRoute, qrRoute, generateQrRoute } from './routes'
import { Login, RegisterCustomer, RegisterManager, Home, HeaderFooter, Issues, IssueWithComments, VoidComponent, Tickets, GenerateTicket, SaveTicket, CreateIssue, SaveQR, MainPage, MainRoute, QrCreate } from './pages'
import { BgCompo } from './pages'

function App() {
  const navigate = useNavigate()

  const handleUserRegistered = () => navigate(loginRoute)

  const handleUserLoggedIn = () => {
    if (logic.isTicketAvaliableToAsign()) navigate(ticketRoute)
    else if (logic.isQRAvaliable()) navigate(`${issueRoute}${qrRoute}`)
    else navigate(homeRoute)
  }

  const handleLoginButton = () => navigate(loginRoute)

  const handleRegisterButton = () => navigate(registerRoute)

  const handleLogoutButton = () => navigate(loginRoute)

  const handleHomeButton = () => navigate(homeRoute)

  const handleIssueButton = () => navigate(issueRoute)

  const handleCommentButton = issueId => navigate(`${issueRoute}/${issueId}`)

  const handleLeftArrowClick = () => navigate(issueRoute)

  const handleRedirectClick = ticketId => navigate(`${generateTicketRoute}/${ticketId}`)

  const handleSavedTicket = () => navigate(ticketRoute)

  const handleTicketClick = () => navigate(ticketRoute)

  const handleCancelButtonIssue = () => navigate(ticketRoute)

  const handleCreatedIssue = () => navigate(issueRoute)

  const handleCancelButtonToIssues = () => navigate(issueRoute)

  const handleOnCreateIssueClick = ticketId => navigate(`${issueRoute}${ticketRoute}/${ticketId}`)

  const handleHomeTicketClick = () => navigate(ticketRoute)

  const handleHomeIssueClick = () => navigate(issueRoute)

  const handleSavedQR = () => navigate(`${issueRoute}${qrRoute}`)

  const handleQrClick = (cinemaId, roomId) => navigate(`${generateQrRoute}/${cinemaId}/${roomId}`)

  const handleQrCinemaClick = cinemaId => navigate(`${generateQrRoute}/${cinemaId}/0`)

  const handleArrowClick = () => navigate(homeRoute)

  return <Routes>
    {/* <Route element={<BgCompo />}> */}
    <Route path="*" element={<Navigate to={homeRoute} />} />
    <Route element={logic.isUserLoggedIn() ? <Navigate to={homeRoute} /> : <MainPage />}>
      <Route path={loginRoute} element={<Login onUserLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterButton} />} />
      <Route path={registerRoute} element={<RegisterCustomer onUserRegistered={handleUserRegistered} onLoginClick={handleLoginButton} />} />
      <Route path={registerManagerRoute} element={<RegisterManager onUserRegistered={handleUserRegistered} onLoginClick={handleLoginButton} />} />
    </Route>
    <Route element={logic.isUserLoggedIn() ? <HeaderFooter onHomeClick={handleHomeButton} onIssueClick={handleIssueButton} onLogoutClick={handleLogoutButton} onTicketClick={handleTicketClick} /> : <Navigate to={loginRoute} />}>
      <Route path={homeRoute} element={logic.isUserLoggedIn() ? <Home onHomeTicketClick={handleHomeTicketClick} onHomeIssueClick={handleHomeIssueClick} handleQrClick={handleQrClick} handleQrCinemaClick={handleQrCinemaClick} /> : <Navigate to={loginRoute} />} />
      <Route element={logic.isUserLoggedIn() && (!logic.isManagerUserLoggedIn() || (logic.isManagerUserLoggedIn() && logic.isUserAssignedCinema())) ? <VoidComponent /> : <Navigate to={homeRoute} />}>
        <Route path={issueRoute} element={<Issues handleCommentButton={handleCommentButton} />} > </Route>
        <Route path={`${issueRoute}/:issueId`} element={<IssueWithComments onLeftArrowClick={handleLeftArrowClick} />} />
        <Route path={ticketRoute} element={<Tickets onCreateIssueClick={handleOnCreateIssueClick} />} />
        {/*manager route only */}
        <Route path={`${generateQrRoute}/:cinemaId/:location`} element={logic.isUserLoggedIn() && logic.isManagerUserLoggedIn() ? <QrCreate onArrowClick={handleArrowClick} /> : <Navigate to={homeRoute} />} />
        {/*customer only routes */}
        <Route element={logic.isUserLoggedIn() && !logic.isManagerUserLoggedIn() ? <MainRoute /> : <Navigate to={issueRoute} />}>
          <Route path={`${issueRoute}${ticketRoute}/:ticketId`} element={<CreateIssue handleCancelButtonIssue={handleCancelButtonIssue} handleCreatedIssue={handleCreatedIssue} />} />
          <Route path={`${issueRoute}${qrRoute}`} element={<CreateIssue handleCancelButtonIssue={handleCancelButtonToIssues} handleCreatedIssue={handleCreatedIssue} />} />
        </Route>
      </Route>
    </Route>
    <Route path={`${qrRoute}/:cinemaId/:location?`} element={<SaveQR onSavedQR={handleSavedQR} />} />
    <Route path={generateTicketRoute} element={<GenerateTicket redirectClick={handleRedirectClick} />} />
    <Route path={`${generateTicketRoute}/:ticketId`} element={<SaveTicket onSavedTicket={handleSavedTicket} />} />
    {/* </Route> */}
  </Routes >
}
export default App
