import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function RouteFooter({ onHomeClick, onIssueClick }) {
    return <>
        <Outlet />
        <Footer onHomeClick={onHomeClick} onIssueClick={onIssueClick} />
    </>
}

export default RouteFooter 