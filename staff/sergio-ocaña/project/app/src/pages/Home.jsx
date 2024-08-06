import { useEffect, useState } from 'react'
import { HTag, Button, Header } from '../components'
import logic from '../logic'
import { errors } from 'com'
import Cinema from '../components/Cinema'
import FormCinema from '../components/FormCinema'

const { TypeError, MatchError, ContentError } = errors

function Home({ onLogoutClick }) {
    const [user, setUser] = useState(null)
    const [showFormCinema, setFormCinema] = useState(0)
    const [timeStamp, setTimeStamp] = useState(Date.now())

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
                .then(user => {
                    setUser(user)

                    if (user.role === 'manager' && !user.cinema) setFormCinema(1)
                })
                .catch(error => {
                    errorHandler(error)
                })

        } catch (error) {
            errorHandler(error)
        }
    }, [timeStamp])

    const handleLogoutButton = () => {
        logic.logoutUser()

        onLogoutClick()
    }

    const handleAsignedCinema = () => {
        setFormCinema(0)
        setTimeStamp(Date.now())
    }

    return <>
        <Header>
            {!user && <p> Loading... </p>}
            {user && <HTag className='flex flex-nowrap'>{`Welcome to Happy People, ${user.name}`}</HTag>}

            <Button onClick={handleLogoutButton}>🚪</Button>
        </Header>

        <main className='flex flex-col my-14'>
            {user && logic.IsManagerUserLoggedIn() && user.cinema && <Cinema cinemaId={user.cinema} />}
            {showFormCinema === 1 && !user?.cinema && <FormCinema onAsignedCinema={handleAsignedCinema} />}
            {user && !logic.IsManagerUserLoggedIn() && <p>Customer</p>}
        </main>
    </>
}
export default Home