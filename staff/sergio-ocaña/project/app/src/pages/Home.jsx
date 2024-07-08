import { useEffect, useState } from 'react'
import { HTag, Button } from '../components'
import logic from '../logic'
import { errors } from 'com'

const { TypeError, MatchError, ContentError } = errors


function Home({ onLogoutClick }) {
    const [user, setUser] = useState(null)

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please try to relog again`
        else feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
    }

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(user => setUser(user))
                .catch(error => {
                    errorHandler(error)
                })

        } catch (error) {
            errorHandler(error)
        }
    }, [])

    const handleLogoutButton = () => {
        logic.logoutUser()

        onLogoutClick()
    }

    const handleHomeButton = () => { }

    return <>
        <header className='flex justify-center border-b-2 border-black fixed top 0 w-full bg-yellow-200 h-12 px-3 py-3 box-border'>
            {!user && <p> Loading... </p>}
            {user && <HTag>{`Welcome to Happy People, ${user.name}`}</HTag>}

            <Button onClick={handleLogoutButton}>🚪</Button>
        </header>

        {user && logic.IsManagerUserLoggedIn && <ManagerHome />}
        {user && !logic.IsManagerUserLoggedIn && <CustomerHome />}

        <footer className="flex justify-center border-t-2 border-black fixed bottom-0 w-full bg-white h-8 px-2 box-border">
            <Button onClick={handleHomeButton}>🏚️</Button>
            <Button>🎟️</Button>
            <Button>☹️</Button>
        </footer>
    </>
}
export default Home