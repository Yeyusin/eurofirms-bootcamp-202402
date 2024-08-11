import { Outlet } from 'react-router-dom'

function MainRoute() {
    return <>
        <main className='flex flex-col justify-center my-14 gap-4'>
            <Outlet />
        </main>
    </>
}

export default MainRoute