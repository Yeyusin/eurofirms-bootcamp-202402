import { Outlet } from "react-router-dom";
import { Main } from '../components'
function MainPage() {
    return <Main>
        <Outlet />
    </Main>
}
export default MainPage