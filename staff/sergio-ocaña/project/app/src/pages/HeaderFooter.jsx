import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Header, Button } from '../components'
import logic from '../logic'

function HeaderFooter({ onHomeClick, onIssueClick, onTicketClick, onLogoutClick }) {
    const handleLogoutButton = () => {
        logic.logoutUser()

        onLogoutClick()
    }

    return <>
        <Header >
            <Button onClick={handleLogoutButton}>🚪</Button>
        </Header>
        <Outlet />
        <Footer onHomeClick={onHomeClick} onIssueClick={onIssueClick} onTicketClick={onTicketClick} />
    </>
}

export default HeaderFooter