import { useEffect, useState } from 'react'
import { Button, HTag } from './index.js'
import logic from '../logic'
import { errors } from 'com'
import FormCreateCinema from './FormCreateCinema.jsx'

const { ContentError, MatchError } = errors

function FormCinema({ onAsignedCinema }) {
    const [cinemas, setCinemas] = useState(null)
    const [selectedCinema, setSelectedCinema] = useState(null)
    const [timeStamp, setTimeStamp] = useState(Date.now())
    const [showFormCreateCinema, setFormCreateCinema] = useState(0)

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

    const selectCinema = (cinemaId) => setSelectedCinema(cinemaId)

    const unselectCinema = () => setSelectedCinema(null)

    const handleAsignCinema = (cinemaId) => {
        try {
            logic.addCinemaToManager(cinemaId)
                .then(() => onAsignedCinema())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler()
        }
    }
    const handleCancelButton = () => setFormCreateCinema(0)

    const handleCreateCinemaClick = () => {
        setFormCreateCinema(1)
    }

    const handleCreatedCinema = () => {
        setTimeStamp(Date.now())
        setFormCreateCinema(0)
    }

    return <>
        <HTag>Select Cinema</HTag>
        <ul>
            {cinemas ? cinemas.map(cinema => {
                const isCinemaSelected = selectedCinema === cinema.id

                return (
                    <li
                        className={`flex cursor-pointer ${isCinemaSelected ? 'text-gray-100' : 'text-blue-300'}`}
                        onClick={() => isCinemaSelected ? unselectCinema() : selectCinema(cinema.id)} key={cinema.id}>
                        {cinema.name}
                    </li>
                )
            }) : <p>Loading...</p>}
            {cinemas?.length === 0 && <p> Create your first cinema </p>}

            <div className='flex justify-around space between '>
                <Button onClick={handleCreateCinemaClick}>New Cinema</Button>
                <Button onClick={() => handleAsignCinema(selectedCinema)}>Asign Cinema</Button>
            </div>
        </ul>
        {showFormCreateCinema === 1 && <FormCreateCinema onCancelClick={handleCancelButton} onCreatedCinema={handleCreatedCinema} />}
    </>
}
export default FormCinema