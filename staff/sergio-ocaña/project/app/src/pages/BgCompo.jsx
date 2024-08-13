import { Outlet } from "react-router-dom"
function BgCompo() {
    return <div className='w-full h-full bg-happy-bg bg-cover min-h-screen'>
        <Outlet />
    </div>
}
export default BgCompo