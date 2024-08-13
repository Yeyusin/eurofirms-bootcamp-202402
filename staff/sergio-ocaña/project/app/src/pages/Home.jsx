import { useEffect, useState } from 'react'
import { HTag, Main, Article, MainThin } from '../components'
import logic from '../logic'
import { errors } from 'com'
import Cinema from '../components/Cinema'
import FormCinema from '../components/FormCinema'

const { TypeError, MatchError, ContentError } = errors

function Home({ onHomeTicketClick, onHomeIssueClick, handleQrClick, handleQrCinemaClick }) {
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

        if (error.message.includes('expired')) logic.deleteToken()

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

    const handleDeleteCinema = cinemaId => {
        const deleteOrNot = confirm('Are you sure about to delete this cinema?')

        if (!deleteOrNot) return
        try {
            logic.deleteCinema(cinemaId)
                .then(() => setTimeStamp(Date.now()))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleAsignedCinema = () => {
        setFormCinema(0)
        setTimeStamp(Date.now())
    }
    const handleUnasignCinema = () => {
        setTimeStamp(Date.now())
    }

    return <>
        <Article className='top-10 gap-2'>

            <HTag > {user ? `Welcome, ${user.name}` : 'Loading...'}</HTag>
            {user && logic.isManagerUserLoggedIn() && user.cinema && <Cinema onUnasignCinema={handleUnasignCinema} handleDeleteCinema={handleDeleteCinema} handleQrClick={handleQrClick} handleQrCinemaClick={handleQrCinemaClick} cinemaId={user.cinema} />}
            {showFormCinema === 1 && !user?.cinema && <FormCinema onAsignedCinema={handleAsignedCinema} />}
            {user && !logic.isManagerUserLoggedIn() &&
                <div className='flex flex-col gap-4 rounded w-full mb-2'>
                    <button onClick={onHomeTicketClick} className='rounded-full text-9xl bg-gray- w-full h-80 inline-block bg-[#b98724]'>🎟️</button>
                    <button onClick={onHomeIssueClick} className='rounded-full text-9xl w-full h-80 inline-block bg-[#b98724]'>☹️</button>
                </div>}
        </Article>

    </>
}
export default Home