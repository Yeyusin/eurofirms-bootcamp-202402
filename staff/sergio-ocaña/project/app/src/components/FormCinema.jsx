import { useEffect, useState } from 'react'
import { Button } from './index.js'
import logic from '../logic'

function FormCinema() {
    const [cinemas, setCinemas] = useState(null)
    const [selectedCinema, setSelectedCinema] = useState(null)
    const [timeStamp, setTimeStamp] = useState(Date.now())

    const errorHandler = error => {
        console.error(error)

        let feedback = error.message

        if (error instanceof TypeError || error instanceof RangeError || error instanceof ContentError)
            feedback = `${feedback}, please correct it`
        else if (error instanceof MatchError)
            feedback = `${feedback}, please verify your info`
        else feedback = 'sorry, there was an error, please try again later'

        alert(feedback)
    }

    useEffect(() => {
        try {
            logic.retrieveCinemas()
                .then(cinemas => setCinemas(cinemas))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }, [timeStamp])

    const selectCinema = (CinemaId) => setSelectedCinema(CinemaId)

    const unselectCinema = () => setSelectedCinema(null)

    const handleAsignCinema = (cinemaId) => {
        try {
            logic.addCinemaToManager(cinemaId)
                .then(() => setTimeStamp(Date.now()))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler()
        }
    }

    const handleCreateCinemaClick = () => { JSON }

    return <>
        <HTag>Select Cinema</HTag>
        <ul>
            {cinemas.forEach(cinema => {
                const isCinemaSelected = selectedCinema === cinema.id

                isCinemaSelected ? <li className='bg-sky-500' onClick={() => selectCinema(cinema.id)} key={cinema.id}>{cinema.name}</li> :
                    <li className='bg-white' onClick={unselectCinema} key={cinema.id}>{cinema.name}</li>

            })}
            <div className='flex'>
                <Button onClick={handleCreateCinemaClick}>New Cinema</Button>
                <Button onClick={() => handleAsignCinema(selectedCinema)}>Asign Cinema</Button>
            </div>
        </ul>
    </>
}
export default FormCinema