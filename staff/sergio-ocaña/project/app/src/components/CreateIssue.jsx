import { HTag, Form, LabelInput, Button } from './index'
import { useEffect, useState } from 'react'
import logic from '../logic'
import { errors } from 'com'

const { MatchError, ContentError } = errors


function CreateIssue({ handleCancelButtonIssue, handleCreatedIssue }) {
    const [step, setStep] = useState(0)
    const [cinemas, setCinemas] = useState(null)
    const [cinemaId, setCinemaId] = useState(null)
    const [rooms, setRooms] = useState(null)
    const [isLocationRoom, setIsLocationRoom] = useState(false)
    const [location, setLocation] = useState(null)
    const [roomId, setRoomId] = useState(null)
    const [type, setType] = useState(null)

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
            logic.retrieveCinemas()
                .then(cinemas => setCinemas(cinemas))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }, [])

    const searchCinemaRooms = () => {
        try {
            logic.retrieveRoomsFromCinemaCustomer(cinemaId)
                .then(rooms => setRooms(rooms))
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    const handleSelectedCinema = (cinemaId) => {
        setCinemaId(cinemaId)
        setStep(1)
    }

    const handleYesButton = () => {
        searchCinemaRooms()

        setStep(2)

        setIsLocationRoom(true)
    }

    const handleNoButton = () => setStep(2)

    const handleSelectedRoom = (roomId, roomName) => {
        setStep(3)

        setLocation(roomName)

        setRoomId(roomId)
    }

    const onSubmitLocation = (event) => {
        event.preventDefault()

        const form = event.target

        const locationForm = form.location.value

        if (locationForm.length === 0) return

        setLocation(locationForm)

        setStep(3)
    }

    const handleTemperatureButton = () => {
        setStep(4)

        setType('temperature')
    }

    const handleSoundButton = () => {
        setStep(4)

        setType('sound')
    }

    const handleFilmButton = () => {
        setStep(4)

        setType('film')
    }

    const handleCleaningButton = () => {
        setStep(4)

        setType('cleaning')
    }

    const onSubmitDescription = (event) => {
        event.preventDefault()

        const form = event.target

        const description = form.description.value

        if (description.length === 0) return

        try {
            logic.createIssue(cinemaId, location, type, description, roomId)
                .then(() => handleCreatedIssue())
                .catch(error => errorHandler(error))
        } catch (error) {
            errorHandler(error)
        }
    }

    return <>
        {cinemas && step === 0 && <>
            <HTag level={3}> Select Cinema</HTag>

            <ul className='flex flex-col'>
                {cinemas.map(cinema => {
                    return <li
                        className={'flex cursor-pointer text-blue-300'} onClick={() => handleSelectedCinema(cinema.id)} key={cinema.id}> {cinema.name}
                    </li>
                })}
            </ul >
        </>}

        {step === 1 && <>
            <HTag level={3}> Is the issue related to a room?</HTag>

            <div className='flex flex-row'>
                <Button onClick={handleYesButton}>Yes</Button>

                <Button onClick={handleNoButton}>No</Button>
            </div>
        </>}

        {step === 2 && rooms && isLocationRoom && <>
            <HTag level={3}> Select Room</HTag>

            <ul className='flex flex-col'>
                {rooms?.map(room => {
                    return <li
                        className={'flex cursor-pointer text-blue-300'} onClick={() => handleSelectedRoom(room.id, room.name)} key={room.id}> {room.name}
                    </li>
                })}
            </ul >
        </>}

        {step === 2 && !isLocationRoom && <>
            <HTag level={3}> Tell us where the issue happened</HTag>

            <Form onSubmit={onSubmitLocation}>
                <LabelInput text='Location' id='location' />

                <Button type='submit'>Next</Button>
            </Form>

        </>}

        {step === 3 && <>
            <HTag level={3}> Is the issue related to a room?</HTag>

            <div className='flex flex-row'>
                <Button onClick={handleTemperatureButton}>🌡</Button>

                <Button onClick={handleSoundButton}>🔉</Button>

                <Button onClick={handleFilmButton}>Film</Button>

                <Button onClick={handleCleaningButton}>Cleaning</Button>
            </div>
        </>}


        {step === 4 && <>
            <HTag level={3}> Tell us what happened</HTag>

            <Form onSubmit={onSubmitDescription}>
                <LabelInput text='Description' id='description' />

                <Button type='submit'>Next</Button>
            </Form>

        </>}
        <Button onClick={handleCancelButtonIssue}>Cancel</Button>
    </>
} export default CreateIssue