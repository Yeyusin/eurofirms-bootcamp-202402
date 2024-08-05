import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function RouteFooter({ onHomeClick }) {
    return <>
        <Outlet />
        <Footer onHomeClick={onHomeClick} />
    </>
}

export default RouteFooter 