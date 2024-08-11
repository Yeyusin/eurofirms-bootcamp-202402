import { useEffect, useState } from 'react'
import { HTag, Button, Header } from '../components'
import logic from '../logic'
import { errors } from 'com'
import Cinema from '../components/Cinema'
import FormCinema from '../components/FormCinema'

const { TypeError, MatchError, ContentError } = errors

function Home({ onHomeTicketClick, onHomeIssueClick }) {
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

    const handleAsignedCinema = () => {
        setFormCinema(0)
        setTimeStamp(Date.now())
    }

    return <>
        <main className='flex flex-col my-20 gap-10'>
            <HTag > {user ? `Welcome to Happy People, ${user.name}` : 'Loading...'}</HTag>
            {user && logic.isManagerUserLoggedIn() && user.cinema && <Cinema cinemaId={user.cinema} />}
            {showFormCinema === 1 && !user?.cinema && <FormCinema onAsignedCinema={handleAsignedCinema} />}
            {user && !logic.isManagerUserLoggedIn() &&
                <div className='flex flex-col gap-10 rounded'>
                    <button onClick={onHomeTicketClick} className='rounded-full text-9xl bg-gray-100 w-full h-80'>🎟️</button>
                    <button onClick={onHomeIssueClick} className='rounded-full text-9xl bg-gray-100 w-full h-80'>☹️</button>
                </div>}
        </main>
    </>
}
export default Home