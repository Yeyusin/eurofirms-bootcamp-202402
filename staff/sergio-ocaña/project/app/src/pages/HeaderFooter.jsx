import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Header, Button, MainThin } from '../components'
import logic from '../logic'
import logo from '../img/logocut.png'

function HeaderFooter({ onHomeClick, onIssueClick, onTicketClick, onLogoutClick }) {
    const handleLogoutButton = () => {
        logic.logoutUser()

        onLogoutClick()
    }

    return <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
        <Header >
            <div className='flex flex-row w-1/8'>
                <img className='flex-grow' src={logo} alt=' Logo' />
            </div>
            <Button onClick={handleLogoutButton}>🚪</Button>
        </Header>
        <MainThin>
            <Outlet />
        </MainThin>
        <Footer onHomeClick={onHomeClick} onIssueClick={onIssueClick} onTicketClick={onTicketClick} />
    </div>
}

export default HeaderFooter