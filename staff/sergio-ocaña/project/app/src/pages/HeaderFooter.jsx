import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Header, Button } from '../components'
import logic from '../logic'

function HeaderFooter({ onHomeClick, onIssueClick, onLogoutClick }) {
    const handleLogoutButton = () => {
        logic.logoutUser()

        onLogoutClick()
    }

    return <>
        <Outlet />
        <Header >
            <Button onClick={handleLogoutButton}>🚪</Button>
        </Header>
        <Footer onHomeClick={onHomeClick} onIssueClick={onIssueClick} />
    </>
}

export default HeaderFooter