import { useEffect, useState } from 'react'
import { Button, ButtonText, HTag } from './index.js'
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
        {showFormCreateCinema === 0 && <HTag>Select Cinema</HTag>}
        <ul className='w-full flex flex-col'>
            {showFormCreateCinema === 0 && cinemas && cinemas.map(cinema => {
                const isCinemaSelected = selectedCinema === cinema.id

                return <li
                    className={`flex cursor-pointer w-full border-2 px-2 font-bold text-[#4ca4b8] ${isCinemaSelected ? ' bg-[#e4b641]' : ' bg-white'}`}
                    onClick={() => isCinemaSelected ? unselectCinema() : selectCinema(cinema.id)} key={cinema.id}>
                    {cinema.name}
                </li>

            })}
            {cinemas?.length === 0 && <p> Create your first cinema </p>}

            {showFormCreateCinema === 0 && <div className='flex flext-row justify-center '>
                <ButtonText onClick={handleCreateCinemaClick}>New Cinema</ButtonText>
                <ButtonText onClick={() => handleAsignCinema(selectedCinema)}>Asign Cinema</ButtonText>
            </div>}
        </ul>
        {showFormCreateCinema === 1 && <FormCreateCinema onCancelClick={handleCancelButton} onCreatedCinema={handleCreatedCinema} />}
    </>
}
export default FormCinema